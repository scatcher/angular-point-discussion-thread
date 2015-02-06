(function () {
    'use strict';

    angular
        .module('angularPoint')
        .directive('apDiscussionThread', apDiscussionThread);

    /* @ngInject */
    function apDiscussionThread(_, toastr, apDiscussionThreadFactory) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                fieldName: '=?', //Defaults to 'discussionThread'
                listItem: '='
            },
            templateUrl: 'apDiscussionThread.html'
        };
        return directive;

        function link(scope, element, attrs) {

            var state = {
                discussionField: scope.fieldName || 'discussionThread',
                negotiatingWithServer: false,
                respondingTo: '',
                tempPost: '',
                tempResponse: ''
            };

            scope.clearTempVars = clearTempVars;
            scope.createPost = createPost;
            scope.deletePost = deletePost;
            scope.state = state;


            scope.$watch('listItem', function (newVal, oldVal) {
                if(newVal) {
                    /** Use discussion thread factory to ensure we have a valid discussion object */
                    scope.discussionObject = apDiscussionThreadFactory
                        .createDiscussionObject(scope.listItem, scope.state.discussionField);

                    scope.posts = scope.discussionObject.posts;
                }
            });

            function clearTempVars () {
                state.respondingTo = '';
                state.tempResponse = '';
                state.tempPost = '';
            }

            function createPost (content, post) {
                if(content < 1) {
                    toastr.warning('You need to add a comment before saving.');
                } else {
                    toastr.info('Negotiating with the server');
                    state.negotiatingWithServer = true;
                    if(post) {
                        post.reply(content)
                            .then(cleanup);
                    } else {
                        /** Creating new top level post */
                        scope.discussionObject.createPost('', content).savePost()
                            .then(cleanup);
                    }
                }
            }

            function cleanup(){
                clearTempVars();
                state.negotiatingWithServer = false;
                toastr.success('Discussion thread successfully updated.');
            }


            function deletePost (post) {
                var hasChildren = false;
                _.each(scope.discussionObject.posts, function(p) {
                    if(p.parentId === post.id) {
                        hasChildren = true;
                        return;
                    }
                });
                if(hasChildren) {
                    toastr.warning('Unable to delete a comment with child responses.  Please ' +
                    'remove all children first.');
                    return;
                }
                var confirmation = window.confirm('Are you sure you want to delete this comment?');
                if (confirmation) {
                    toastr.info('Negotiating with the server');
                    state.negotiatingWithServer = true;
                    post.deletePost()
                        .then(cleanup);
                }
            }


        }
    }
    apDiscussionThread.$inject = ['_', 'toastr', 'apDiscussionThreadFactory'];
})();

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
    apDiscussionThreadFactory.$inject = ['_', 'user'];
})();

angular.module("angularPoint").run(["$templateCache", function($templateCache) {$templateCache.put("apDiscussionNewPost.html","<div class=row ng-form=newPost><div class=col-xs-12><div class=form-group><textarea msd-elastic=\"\" class=form-control placeholder=\"Enter a comment...\" ng-model=state[tempState]></textarea><h5><small><label class=pull-right><a class=\"btn btn-primary btn-sm\" href ng-disabled=state.negotiatingWithServer ng-click=\"createPost(state[tempState], post)\"><i class=\"fa fa-save\"></i> Save</a> <a class=\"btn btn-default btn-sm\" href ng-disabled=state.negotiatingWithServer ng-click=clearTempVars()><i class=\"fa fa-undo\"></i> Clear</a></label></small></h5></div></div></div>");
$templateCache.put("apDiscussionThread.html","<fieldset><legend><small>New Post</small></legend><div ng-include=\"\'apDiscussionNewPost.html\'\" ng-init=\"tempState = \'tempPost\'\"></div></fieldset><fieldset ng-if=\"discussionObject.posts.length > 0\"><legend><small>Discussion Thread</small></legend><ul class=\"ap-discussion-thread well well-sm\"><li class=discussion-head ng-repeat=\"post in discussionObject.posts | filter:{parentId: 0}\" style=\"border-top-width: 1px;border-top-color: grey\"><div ng-include=\"\'apDisscussionPost.html\'\" ng-init=\"level = 0\"></div></li></ul></fieldset>");
$templateCache.put("apDisscussionPost.html","<div class=ap-discussion-post><blockquote><p>{{ post.content }}</p><small><span class=post-by>{{ post.user.lookupValue }}</span> <span class=post-date>{{ post.created | date:\'short\' }}</span> <button type=button class=\"btn btn-link btn-sm\" ng-disabled=state.negotiatingWithServer ng-click=\"state.respondingTo = post\"><i class=\"fa fa-mail-reply\"></i> Reply</button> <button type=button class=\"btn btn-link btn-sm\" ng-disabled=state.negotiatingWithServer ng-click=deletePost(post)><i class=\"fa fa-trash-o\"></i> Delete</button></small></blockquote><div ng-if=\"state.respondingTo === post\"><div ng-include=\"\'apDiscussionNewPost.html\'\" ng-init=\"tempState = \'tempResponse\'\"></div></div><ul class=child-thread><li ng-repeat=\"response in discussionObject.posts | filter:{parentId: post.id}\"><div ng-include=\"\'apDisscussionPost.html\'\" ng-init=\"post = response; level = level + 1\"></div></li></ul></div>");}]);