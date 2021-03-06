import * as moment from 'moment';
import * as _ from 'lodash';

import {User, ListItem} from 'angular-point';
import {DiscussionThread} from './DiscussionThread';


export class Post {
    created: Date;
    content: string;
    id: number;
    parentId: number;
    user: User;

    constructor(post) {
        _.assign(this, post);
        if (_.isString(this.created)) {
            /** Convert stringified date back into JS date */
            this.created = moment(this.created).toDate();
        }
    }

    deletePost(discussionThread: DiscussionThread) {
        this.removePost(discussionThread);
        return this.savePost(discussionThread);
    }

    removePost(discussionThread: DiscussionThread): void {
        const index = discussionThread.posts.indexOf(this);
        discussionThread.posts.splice(index, 1);
    }

    reply(response: string, discussionThread: DiscussionThread) {
        discussionThread.createPost(this.id, response);
        return this.savePost(discussionThread);
    }

    savePost(discussionThread: DiscussionThread) {
        return discussionThread.saveChanges();
    }
}