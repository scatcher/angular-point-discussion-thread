module ap.discussionThread {
    'use strict';

    var user, moment;

    /**
     * @ngdoc service
     * @name apDiscussionThreadFactory
     * @description
     */
    export class DiscussionThreadFactory {
        constructor($injector) {
            user = $injector.get('user');
            moment = $injector.get('moment');
        }

        /**
         * @ngdoc function
         * @name createDiscussionObject
         * @param {object} listItem List item with discussion.
         * @param {string} discussionAttributeName Name of attribute on list item.
         * @returns {object} Newly instantiated discussion object.
         */
        createDiscussionObject(listItem, discussionAttributeName) {
            var thread,
                targetAttribute = discussionAttributeName || 'discussionThread';

            if (listItem[targetAttribute] && listItem[targetAttribute].constructor.name === 'Discussion') {
                /** Discussion thread is already instantiated */
                thread = listItem[targetAttribute];
            } else {
                /** Instantiate and return new discussion thread */
                thread = new Discussion(listItem, targetAttribute);
            }

            return thread;
        }

    }


    /**
     * @ngdoc function
     * @name createDiscussionObject
     * @param {object} listItem List item with discussion.
     * @param {string} [discussionAttributeName='discussionThread'] Name of attribute on list item.
     * @returns {object} Newly instantiated discussion object.
     */
    export class Discussion{
        posts:Post[] = [];
        getListItem();
        getDiscussionAttributeName();
        constructor(listItem, discussionAttributeName) {
            /** Protect these two paramaters to prevent saving to SharePoint */
            this.getListItem = () => listItem;
            this.getDiscussionAttributeName = () => discussionAttributeName;

            _.extend(this, listItem[discussionAttributeName]);

            _.each(this.posts, (post, index) => {
                this.posts[index] = new Post(post, this);
            });
        }
        createPost (parentId:number, content:string) {
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
        getNextId() {
            var highestId = 0;
            if(this.posts.length > 0) {
                var lastPost = _.max(this.posts, (post) => post.id);
                highestId = lastPost.id;
            }
            return highestId + 1;
        }
        prune() {
            /** Remove any blank posts prior to saving */
            _.each(this.posts, (post) => {
                if (_.isEmpty(post.content)) {
                    post.removePost();
                }
            });
        }
        saveChanges() {
            this.prune();
            var listItem = this.getListItem();
            return listItem.saveFields([this.getDiscussionAttributeName()]);
        }
    }

    export class Post{
        created:Date;
        content:string;
        id:number;
        parentId:number;
        user:{lookupId:number; lookupValue:string};
        getThread():Discussion;
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
        removePost() {
            var thread = this.getThread();
            var index = thread.posts.indexOf(this);
            thread.posts.splice(index, 1);
        }
        reply(response) {
            var thread = this.getThread();
            thread.createPost(this.id, response);
            return this.savePost();
        }
        savePost(){
            var thread = this.getThread();
            return thread.saveChanges();
        }
    }




    angular
        .module('angularPoint')
        .service('apDiscussionThreadFactory', DiscussionThreadFactory);


}
