(function () {
    'use strict';

    angular
        .module('angularPoint')
        .factory('apDiscussionThreadFactory', apDiscussionThreadFactory);

    /**
     * @ngdoc service
     * @name apDiscussionThreadFactory
     * @description
     */
    function apDiscussionThreadFactory(_, user) {

        var service = {
            createDiscussionObject: createDiscussionObject
        };

        return service;

        /**==================PRIVATE==================*/

        /**
         * @ngdoc function
         * @name createDiscussionObject
         * @param {string} discussionAttributeName Name of attribute on list item.
         * @param {object} listItem List item with discussion.
         * @returns {object} Newly instantiated discussion object.
         */
        function createDiscussionObject(listItem, discussionAttributeName) {
            var thread,
                targetAttribute = discussionAttributeName || 'discussionThread';

            if(listItem[targetAttribute] && listItem[targetAttribute].constructor.name === 'Discussion') {
                /** Discussion thread is already instantiated */
                thread = listItem[targetAttribute];
            } else {
                /** Instantiate and return new discussion thread */
                thread = new Discussion(listItem, targetAttribute);
            }

            return thread;

        }


        /**
         * @ngdoc function
         * @name createDiscussionObject
         * @param {object} listItem List item with discussion.
         * @param {string} [discussionAttributeName='discussionThread'] Name of attribute on list item.
         * @returns {object} Newly instantiated discussion object.
         */
        function Discussion(listItem, discussionAttributeName) {
            var self = this;
            var defaults = {
                posts: [],
                nextId: 0
            };

            _.extend(self, defaults, listItem[discussionAttributeName]);

            _.each(self.posts, function(post, index) {
                self.posts[index] = new Post(post, self);
            });

            self.getNextId = function() {
                var self = this;
                self.nextId++;
                return self.nextId;
            };

            self.createPost = function(parentId, content) {
                var newPost = new Post({
                    content: content,
                    id: self.getNextId(),
                    parentId: parentId || 0,
                    created: new Date(),
                    user: user
                }, self);

                self.posts.push(newPost);
                return newPost;
            };

            self.getListItem = function () {
                return listItem;
            };

            self.prune = function() {
                /** Remove any blank posts prior to saving */
                _.each(self.posts, function(post) {
                    if(_.isEmpty(post.content)) {
                        post.removePost();
                    }
                });
            };

            self.saveChanges = function() {
                self.prune();
                return listItem.saveFields([discussionAttributeName]);
            };
        }

        function Post(post, thread) {
            var self = this;
            _.extend(self, post);

            if(_.isString(self.created)) {
                self.created = new Date(self.created);
            }

            self.removePost = function() {
                var index = thread.posts.indexOf(self);
                thread.posts.splice(index, 1);
            };

            self.deletePost = function () {
                self.removePost();
                return self.savePost();
            };

            self.savePost = function () {
                return thread.saveChanges();
            };

            self.reply = function(response) {
                thread.createPost(self.id, response);
                return self.savePost();
            };
        }


    }
})();
