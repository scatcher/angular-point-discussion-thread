import * as _ from 'lodash';
import { ListItem } from 'angular-point';

import {Post} from './Post';
import {user} from './apDiscussionThreadFactory';


export interface IDiscussionThread {
    posts: Post[];
    createPost(parentId: number, content: string): Post;
    getDiscussionAttributeName(): string;
    getListItem(): ListItem<any>;
    getNextId(): number;
    prune(): void;
    reset(): void;
    saveChanges(): ng.IPromise<ListItem<any>>;
}

/**
 * @ngdoc function
 * @name createDiscussionObject
 * @param {object} listItem List item with discussion.
 * @param {string} [discussionAttributeName='discussionThread'] Name of attribute on list item.
 * @returns {object} Newly instantiated discussion object.
 */
export class DiscussionThread implements IDiscussionThread {
    getDiscussionAttributeName: () => string;
    getListItem: () => ListItem<any>;
    posts: Post[] = [];

    constructor(listItem: ListItem<any>, discussionAttributeName = 'discussionThread') {

        /** Protect these two paramaters to prevent saving to SharePoint */
        this.getListItem = () => listItem;
        this.getDiscussionAttributeName = () => discussionAttributeName;

        _.assign(this, listItem[discussionAttributeName]);

        _.each(this.posts, (post, index) => {
            this.posts[index] = new Post(post);
        });
    }

    createPost(parentId: number, content: string): Post {
        const newPost = new Post({
            content: content,
            id: this.getNextId(),
            parentId: parentId || 0,
            created: new Date(),
            user: user
        });

        this.posts.push(newPost);
        return newPost;
    }

    getNextId(): number {
        let highestId = 0;
        if (this.posts.length > 0) {
            highestId = _.max(this.posts.map(post => post.id));
        }
        return highestId + 1;
    }

    prune(): void {
        /** Remove any blank posts prior to saving */
        _.each(this.posts, (post) => {
            if (_.isEmpty(post.content)) {
                post.removePost(this);
            }
        });
    }

    reset(): void {
        this.posts.length = 0;
    }

    saveChanges(): ng.IPromise<ListItem<any>> {
        this.prune();
        const listItem = this.getListItem();
        return listItem.saveFields([this.getDiscussionAttributeName()]);
    }
}


