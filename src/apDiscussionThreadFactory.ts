import { ListItem } from 'angular-point';

import {DiscussionThread} from './DiscussionThread';

/** Share within module */
export let user;

/**
 * @ngdoc service
 * @name apDiscussionThreadFactory
 * @description
 */
export class DiscussionThreadFactory {
    static $inject = ['user'];

    constructor(_user_) {
        user = _user_;
    }

    /**
     * @ngdoc function
     * @name createDiscussionObject
     * @param {object} listItem List item with discussion.
     * @param {string} discussionAttributeName Name of attribute on list item.
     * @returns {object} Newly instantiated discussion object.
     */
    createDiscussionObject<T extends ListItem<T>>(listItem: ListItem<T>, discussionAttributeName = 'discussionThread'): DiscussionThread {
        let discussionThread;

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

