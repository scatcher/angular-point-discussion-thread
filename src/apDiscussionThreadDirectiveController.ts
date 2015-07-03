/// <reference path="../typings/ap.d.ts" />
/// <reference path="../typings/tsd.d.ts" />

module ap.discussionThread {
    'use strict';

    interface IControllerScope extends ng.IScope {
        changeEvent?(action: string, content?: string): void;
        fieldName?: string;
        listItem: ap.ListItem<any>;
    }

    export class DiscussionThreadController {
        changeEvent: (action: string, content?: string) => void;
        discussionThread: DiscussionThread;
        fieldName: string;
        listItem: Object;
        negotiatingWithServer: boolean = false;
        respondingTo = '';
        tempPost = '';
        tempResponse = '';

        constructor($scope: IControllerScope, apDiscussionThreadFactory: DiscussionThreadFactory) {
            var vm = this;
            vm.changeEvent = $scope.changeEvent;
            vm.fieldName = $scope.fieldName || 'discussionThread';
            vm.listItem = $scope.listItem;

            $scope.$watch('listItem.' + vm.fieldName, (newVal, oldVal) => {
                if (newVal) {
                    vm.discussionThread = newVal;
                }

                console.assert(newVal.posts === vm.listItem[vm.fieldName].posts);
            });

        }

        clearTempVars() {
            this.respondingTo = '';
            this.tempPost = '';
            this.tempResponse = '';
        }

        cleanup(event: string, content?: string) {
            this.clearTempVars();
            this.negotiatingWithServer = false;
            toastr.success('Discussion thread successfully updated.');
            if (_.isFunction(this.changeEvent) && event) {
                this.changeEvent(event, content);
            }
        }

        createPost(content: string, post: Post) {
            if (content.length < 1) {
                toastr.warning('You need to add a comment before saving.');
            } else {
                this.negotiatingWithServer = true;
                if (post) {
                    post.reply(content, this.discussionThread)
                        .then(() => this.cleanup('reply', content));
                } else {
                    /** Creating new top level post */
                    this.discussionThread.createPost(null, content)
                        .savePost(this.discussionThread)
                        .then(() => this.cleanup('create', content));
                }
            }
        }

        deletePost(post: Post) {
            var hasChildren = false;
            _.each(this.discussionThread.posts, (p) => {
                if (p.parentId === post.id) {
                    hasChildren = true;
                    return;
                }
            });
            if (hasChildren) {
                toastr.warning('Unable to delete a comment with child responses.  Please ' +
                    'remove all children first.');
                return;
            }
            var confirmation = window.confirm('Are you sure you want to delete this comment?');
            if (confirmation) {
                this.negotiatingWithServer = true;
                post.deletePost(this.discussionThread)
                    .then(() => this.cleanup('delete'));
            }
        }

    }
}
