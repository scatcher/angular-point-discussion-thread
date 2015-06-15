/// <reference path="apDiscussionThreadFactory.ts" />
/// <reference path="Post.ts" />

module ap.discussionThread {
    'use strict';

    export interface IDiscussionThread {
        createPost(parentId: number, content: string): Post;
        getDiscussionAttributeName(): string;
        getListItem(): ap.IListItem<any>;
        getNextId(): number;
        posts: Post[];
        prune(): void;
        reset(): void;
        saveChanges();
    }
	
	/**
	 * @ngdoc function
	 * @name createDiscussionObject
	 * @param {object} listItem List item with discussion.
	 * @param {string} [discussionAttributeName='discussionThread'] Name of attribute on list item.
	 * @returns {object} Newly instantiated discussion object.
	 */
    export class DiscussionThread implements IDiscussionThread {
        posts: Post[] = [];
        getListItem;
        getDiscussionAttributeName;
        constructor(listItem: ap.IListItem<any>, discussionAttributeName = 'discussionThread') {
            
            /** Protect these two paramaters to prevent saving to SharePoint */
            this.getListItem = () => listItem;
            this.getDiscussionAttributeName = () => discussionAttributeName;

            _.assign(this, listItem[discussionAttributeName]);

            _.each(this.posts, (post, index) => {
                this.posts[index] = new Post(post, this);
            });
        }
        createPost(parentId: number, content: string): Post {
            var newPost = new Post({
                content: content,
                id: this.getNextId(),
                parentId: parentId || 0,
                created: new Date(),
                user: user
            }, this);

            this.posts.push(newPost);
            return newPost;
        }
        getNextId(): number {
            var highestId = 0;
            if (this.posts.length > 0) {
                var lastPost = _.max(this.posts, (post) => post.id);
                highestId = lastPost.id;
            }
            return highestId + 1;
        }
        prune(): void {
            /** Remove any blank posts prior to saving */
            _.each(this.posts, (post) => {
                if (_.isEmpty(post.content)) {
                    post.removePost();
                }
            });
        }
        reset(): void {
            this.posts.length = 0;
        }
        saveChanges() {
            this.prune();
            var listItem = this.getListItem();
            return listItem.saveFields([this.getDiscussionAttributeName()]);
        }
    }


}