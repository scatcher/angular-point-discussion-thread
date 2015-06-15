/// <reference path="../typings/ap.d.ts" />
/// <reference path="../typings/tsd.d.ts" />

module ap.discussionThread {
    'use strict';
    
    

    export var APDiscussionThreadDirective = () => {
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

}
