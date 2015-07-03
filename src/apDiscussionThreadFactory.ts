/// <reference path="../typings/ap.d.ts" />
/// <reference path="../typings/tsd.d.ts" />

module ap.discussionThread {
    'use strict';

    /** Share within module */
    export var moment;
    export var toastr;
    export var user;

    /**
     * @ngdoc service
     * @name apDiscussionThreadFactory
     * @description
     */
    export class DiscussionThreadFactory {
        static $inject = ['moment', 'toastr', 'user'];
        constructor(_moment_, _toastr_, _user_) {
            moment = _moment_;
            toastr = _toastr_;
            user = _user_;
        }

        /**
         * @ngdoc function
         * @name createDiscussionObject
         * @param {object} listItem List item with discussion.
         * @param {string} discussionAttributeName Name of attribute on list item.
         * @returns {object} Newly instantiated discussion object.
         */
        createDiscussionObject<T>(listItem: ap.ListItem<T>, discussionAttributeName = 'discussionThread'): DiscussionThread {
            var discussionThread;

            // if (listItem[discussionAttributeName] && listItem[discussionAttributeName].constructor.name === 'DiscussionThread') {
            //     /** Discussion thread is already instantiated */
            //     discussionThread = listItem[discussionAttributeName];
            // } else {
                /** Instantiate and return new discussion thread */
                discussionThread = new DiscussionThread(listItem, discussionAttributeName);
            // }

            return discussionThread;
        }

    }

}
