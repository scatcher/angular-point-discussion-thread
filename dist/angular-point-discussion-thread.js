angular.module("angularPoint").run(["$templateCache", function($templateCache) {$templateCache.put("ap-discussion-thread-new-post.html","<new-post class=\"row\" ng-form=\"newPost\">\n	<div class=\"col-xs-12\">\n		<div class=\"form-group\">\n			<textarea msd-elastic class=\"form-control\" placeholder=\"Enter a comment...\" ng-model=\"vm[tempState]\"></textarea>\n			<h5>\n				<small>\n					<label class=\"pull-right\">\n						<a class=\"btn btn-primary btn-sm\" href ng-disabled=\"vm.negotiatingWithServer\" ng-click=\"vm.createPost(vm[tempState], post)\">\n                            <i class=\"fa fa-save\"></i> Save\n                        </a>\n						<a class=\"btn btn-default btn-sm\" href ng-disabled=\"vm.negotiatingWithServer\" ng-click=\"vm.clearTempVars()\">\n                            <i class=\"fa fa-undo\"></i> Clear\n                        </a>\n					</label>\n				</small>\n			</h5>\n		</div>\n	</div>\n</new-post>");
$templateCache.put("ap-discussion-thread-post.html","<div class=\"ap-discussion-post\">\n	<blockquote>\n		<p>{{ post.content }}</p>\n		<small>\n			<span class=\"post-by\">{{ post.user.lookupValue }}</span>\n			<span class=\"post-date\">{{ post.created | date:\'short\' }}</span>\n			<button type=\"button\" class=\"btn btn-link btn-sm\" ng-disabled=\"vm.negotiatingWithServer\"\n			ng-click=\"vm.respondingTo = post\">\n				<i class=\"fa fa-mail-reply\"></i>Reply</button>\n			<button type=\"button\" class=\"btn btn-link btn-sm\" ng-disabled=\"vm.negotiatingWithServer\" ng-click=\"vm.deletePost(post)\">\n				<i class=\"fa fa-trash-o\"></i>Delete</button>\n		</small>\n	</blockquote>\n	<div ng-if=\"vm.respondingTo === post\">\n		<div ng-include=\"\'ap-discussion-thread-new-post.html\'\" ng-init=\"tempState = \'tempResponse\'\"></div>\n	</div>\n	<ul class=\"child-thread\">\n		<li ng-repeat=\"response in vm.discussionObject.posts | filter:{parentId: post.id} track by response.id\">\n			<div ng-include=\"\'ap-discussion-thread-post.html\'\" ng-init=\"post = response; level = level + 1\"></div>\n		</li>\n	</ul>\n</div>\n");
$templateCache.put("ap-discussion-thread.html","<style type=\"text/css\">\n	ul.ap-discussion-thread {\n	    list-style-type: none;\n	}\n	ul.ap-discussion-thread ul {\n	    list-style-type: none;\n	}\n</style>\n<fieldset>\n	<legend>\n		<small>New Post</small>\n	</legend>\n	<div ng-include=\"\'ap-discussion-thread-new-post.html\'\" ng-init=\"tempState = \'tempPost\'\"></div>\n</fieldset>\n<fieldset ng-if=\"vm.discussionObject.posts.length > 0\">\n	<legend>\n		<small>Discussion Thread</small>\n	</legend>\n	<ul class=\"ap-discussion-thread well well-sm\">\n		<li class=\"discussion-head\" ng-repeat=\"post in vm.discussionObject.posts | filter:{parentId: 0} track by post.id\" style=\"border-top-width: 1px;border-top-color: grey\">\n			<div ng-include=\"\'ap-discussion-thread-post.html\'\" ng-init=\"level = 0\"></div>\n		</li>\n	</ul>\n</fieldset>\n");}]);
/// <reference path="../typings/ap.d.ts" />
var ap;
(function (ap) {
    var discussionThread;
    (function (discussionThread_1) {
        'use strict';
        /** Share within module */
        discussionThread_1.moment;
        discussionThread_1.toastr;
        discussionThread_1.user;
        /**
         * @ngdoc service
         * @name apDiscussionThreadFactory
         * @description
         */
        var DiscussionThreadFactory = (function () {
            function DiscussionThreadFactory(_moment_, _toastr_, _user_) {
                discussionThread_1.moment = _moment_;
                discussionThread_1.toastr = _toastr_;
                discussionThread_1.user = _user_;
            }
            /**
             * @ngdoc function
             * @name createDiscussionObject
             * @param {object} listItem List item with discussion.
             * @param {string} discussionAttributeName Name of attribute on list item.
             * @returns {object} Newly instantiated discussion object.
             */
            DiscussionThreadFactory.prototype.createDiscussionObject = function (listItem, discussionAttributeName) {
                if (discussionAttributeName === void 0) { discussionAttributeName = 'discussionThread'; }
                var discussionThread;
                if (listItem[discussionAttributeName] && listItem[discussionAttributeName].constructor.name === 'DiscussionThread') {
                    /** Discussion thread is already instantiated */
                    discussionThread = listItem[discussionAttributeName];
                }
                else {
                    /** Instantiate and return new discussion thread */
                    discussionThread = new discussionThread_1.DiscussionThread(listItem, discussionAttributeName);
                }
                return discussionThread;
            };
            DiscussionThreadFactory.$inject = ['moment', 'toastr', 'user'];
            return DiscussionThreadFactory;
        })();
        discussionThread_1.DiscussionThreadFactory = DiscussionThreadFactory;
        angular
            .module('angularPoint')
            .service('apDiscussionThreadFactory', DiscussionThreadFactory);
    })(discussionThread = ap.discussionThread || (ap.discussionThread = {}));
})(ap || (ap = {}));

/// <reference path="apDiscussionThreadFactory.ts" />
/// <reference path="Discussion.ts" />
var ap;
(function (ap) {
    var discussionThread;
    (function (discussionThread) {
        'use strict';
        var Post = (function () {
            function Post(post, thread) {
                this.getThread = function () { return thread; };
                _.assign(this, post);
                if (_.isString(this.created)) {
                    /** Convert stringified date back into JS date */
                    this.created = discussionThread.moment(this.created).toDate();
                }
            }
            Post.prototype.deletePost = function () {
                this.removePost();
                return this.savePost();
            };
            Post.prototype.removePost = function () {
                var thread = this.getThread();
                var index = thread.posts.indexOf(this);
                thread.posts.splice(index, 1);
            };
            Post.prototype.reply = function (response) {
                var thread = this.getThread();
                thread.createPost(this.id, response);
                return this.savePost();
            };
            Post.prototype.savePost = function () {
                var thread = this.getThread();
                return thread.saveChanges();
            };
            return Post;
        })();
        discussionThread.Post = Post;
    })(discussionThread = ap.discussionThread || (ap.discussionThread = {}));
})(ap || (ap = {}));

/// <reference path="apDiscussionThreadFactory.ts" />
/// <reference path="Post.ts" />
var ap;
(function (ap) {
    var discussionThread;
    (function (discussionThread) {
        'use strict';
        /**
         * @ngdoc function
         * @name createDiscussionObject
         * @param {object} listItem List item with discussion.
         * @param {string} [discussionAttributeName='discussionThread'] Name of attribute on list item.
         * @returns {object} Newly instantiated discussion object.
         */
        var DiscussionThread = (function () {
            function DiscussionThread(listItem, discussionAttributeName) {
                var _this = this;
                if (discussionAttributeName === void 0) { discussionAttributeName = 'discussionThread'; }
                this.posts = [];
                /** Protect these two paramaters to prevent saving to SharePoint */
                this.getListItem = function () { return listItem; };
                this.getDiscussionAttributeName = function () { return discussionAttributeName; };
                _.assign(this, listItem[discussionAttributeName]);
                _.each(this.posts, function (post, index) {
                    _this.posts[index] = new discussionThread.Post(post, _this);
                });
            }
            DiscussionThread.prototype.createPost = function (parentId, content) {
                var newPost = new discussionThread.Post({
                    content: content,
                    id: this.getNextId(),
                    parentId: parentId || 0,
                    created: new Date(),
                    user: discussionThread.user
                }, this);
                this.posts.push(newPost);
                return newPost;
            };
            DiscussionThread.prototype.getNextId = function () {
                var highestId = 0;
                if (this.posts.length > 0) {
                    var lastPost = _.max(this.posts, function (post) { return post.id; });
                    highestId = lastPost.id;
                }
                return highestId + 1;
            };
            DiscussionThread.prototype.prune = function () {
                /** Remove any blank posts prior to saving */
                _.each(this.posts, function (post) {
                    if (_.isEmpty(post.content)) {
                        post.removePost();
                    }
                });
            };
            DiscussionThread.prototype.reset = function () {
                this.posts.length = 0;
            };
            DiscussionThread.prototype.saveChanges = function () {
                this.prune();
                var listItem = this.getListItem();
                return listItem.saveFields([this.getDiscussionAttributeName()]);
            };
            return DiscussionThread;
        })();
        discussionThread.DiscussionThread = DiscussionThread;
    })(discussionThread = ap.discussionThread || (ap.discussionThread = {}));
})(ap || (ap = {}));

/// <reference path="../typings/ap.d.ts" />
/// <reference path="apDiscussionThreadFactory.ts" />
/// <reference path="Discussion.ts" />
var ap;
(function (ap) {
    var discussionThread;
    (function (discussionThread) {
        'use strict';
        var DiscussionThreadController = (function () {
            function DiscussionThreadController($scope, apDiscussionThreadFactory) {
                var _this = this;
                this.negotiatingWithServer = false;
                this.respondingTo = '';
                this.tempPost = '';
                this.tempResponse = '';
                var vm = this;
                vm.changeEvent = $scope.changeEvent;
                vm.fieldName = $scope.fieldName || 'discussionThread';
                vm.listItem = $scope.listItem;
                $scope.$watch('listItem', function (newVal, oldVal) {
                    if (newVal) {
                        /** Use discussion thread factory to ensure we have a valid discussion object */
                        _this.discussionObject = apDiscussionThreadFactory
                            .createDiscussionObject(vm.listItem, vm.fieldName);
                        vm.posts = _this.discussionObject.posts;
                    }
                });
            }
            DiscussionThreadController.prototype.clearTempVars = function () {
                this.respondingTo = '';
                this.tempPost = '';
                this.tempResponse = '';
            };
            DiscussionThreadController.prototype.cleanup = function (event, content) {
                this.clearTempVars();
                this.negotiatingWithServer = false;
                discussionThread.toastr.success('Discussion thread successfully updated.');
                if (_.isFunction(this.changeEvent) && event) {
                    this.changeEvent(event, content);
                }
            };
            DiscussionThreadController.prototype.createPost = function (content, post) {
                var _this = this;
                if (content < 1) {
                    discussionThread.toastr.warning('You need to add a comment before saving.');
                }
                else {
                    this.negotiatingWithServer = true;
                    if (post) {
                        post.reply(content)
                            .then(function () { return _this.cleanup('reply', content); });
                    }
                    else {
                        /** Creating new top level post */
                        this.discussionObject.createPost(null, content).savePost()
                            .then(function () { return _this.cleanup('create', content); });
                    }
                }
            };
            DiscussionThreadController.prototype.deletePost = function (post) {
                var _this = this;
                var hasChildren = false;
                _.each(this.discussionObject.posts, function (p) {
                    if (p.parentId === post.id) {
                        hasChildren = true;
                        return;
                    }
                });
                if (hasChildren) {
                    discussionThread.toastr.warning('Unable to delete a comment with child responses.  Please ' +
                        'remove all children first.');
                    return;
                }
                var confirmation = window.confirm('Are you sure you want to delete this comment?');
                if (confirmation) {
                    this.negotiatingWithServer = true;
                    post.deletePost()
                        .then(function () { return _this.cleanup('delete'); });
                }
            };
            return DiscussionThreadController;
        })();
        discussionThread.DiscussionThreadController = DiscussionThreadController;
    })(discussionThread = ap.discussionThread || (ap.discussionThread = {}));
})(ap || (ap = {}));

/// <reference path="apDiscussionThreadFactory.ts" />
/// <reference path="apDiscussionThreadDirectiveController.ts" />
var ap;
(function (ap) {
    var discussionThread;
    (function (discussionThread) {
        'use strict';
        function APDiscussionThreadDirective() {
            var directive = {
                controller: discussionThread.DiscussionThreadController,
                controllerAs: 'vm',
                scope: {
                    changeEvent: '=?',
                    fieldName: '=?',
                    listItem: '='
                },
                templateUrl: 'ap-discussion-thread.html'
            };
            return directive;
        }
        angular
            .module('angularPoint')
            .directive('apDiscussionThread', APDiscussionThreadDirective);
    })(discussionThread = ap.discussionThread || (ap.discussionThread = {}));
})(ap || (ap = {}));

//# sourceMappingURL=angular-point-discussion-thread.js.map