import { AngularPointModule } from 'angular-point';

import {DiscussionThreadFactory} from './apDiscussionThreadFactory';
import {APDiscussionThreadComponent} from './apDiscussionThreadComponent';
import {DiscussionThread} from './DiscussionThread';
import {Post} from './Post';

AngularPointModule
    .service('apDiscussionThreadFactory', DiscussionThreadFactory)
    .component('apDiscussionThread', APDiscussionThreadComponent);


export {DiscussionThread, Post, DiscussionThreadFactory};