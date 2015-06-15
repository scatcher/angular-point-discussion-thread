/// <reference path="apDiscussionThreadFactory.ts" />
/// <reference path="apDiscussionThreadDirectiveController.ts" />

module ap.discussionThread {
    'use strict';

    function APDiscussionThreadDirective() {
        var directive = {
            controller: DiscussionThreadController,
            controllerAs: 'vm',
            scope: {
                changeEvent: '=?', //Callback executed if available that passes back action[create, reply, or delete] and body of post
                fieldName: '=?', //Defaults to 'discussionThread'
                listItem: '='
            },
            templateUrl: 'ap-discussion-thread.html'
        };
        return directive;
    }



    angular
        .module('angularPoint')
        .directive('apDiscussionThread', APDiscussionThreadDirective);

}
