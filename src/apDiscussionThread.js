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
})();
