/// <reference path="../typings/ap.d.ts" />
/// <reference path="../typings/tsd.d.ts" />

module ap.discussionThread {
    'use strict';

    angular
        .module('angularPoint')
        .service('apDiscussionThreadFactory', DiscussionThreadFactory)
        .directive('apDiscussionThread', APDiscussionThreadDirective);
}