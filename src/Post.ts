/// <reference path="apDiscussionThreadFactory.ts" />
/// <reference path="DiscussionThread.ts" />

module ap.discussionThread {
    'use strict';

    export interface IPost {
        created: Date;
        content: string;
        deletePost: Function;
        id: number;
        getThread(): DiscussionThread;
        parentId: number;
        removePost: Function;
        reply: Function;
        savePost: Function;
        user: ap.IUser;
    }

    export class Post implements IPost {
        created: Date;
        content: string;
        id: number;
        parentId: number;
        user: ap.IUser;
        getThread: Function;

        constructor(post, thread) {

            this.getThread = () => thread;
            _.assign(this, post);
            if (_.isString(this.created)) {
                /** Convert stringified date back into JS date */
                this.created = moment(this.created).toDate();
            }
        }

        deletePost() {
            this.removePost();
            return this.savePost();
        }

        removePost(): void {
            var thread = this.getThread();
            var index = thread.posts.indexOf(this);
            thread.posts.splice(index, 1);
        }

        reply(response: string) {
            var thread = this.getThread();
            thread.createPost(this.id, response);
            return this.savePost();
        }

        savePost() {
            var thread = this.getThread();
            return thread.saveChanges();
        }
    }
}
