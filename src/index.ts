import {DiscussionThreadFactory} from './apDiscussionThreadFactory';
import {APDiscussionThreadComponent} from './apDiscussionThreadComponent';
import {AngularPointModule} from 'angular-point';
// import {AngularPointModule} from '../angular-point';

AngularPointModule
    .service('apDiscussionThreadFactory', DiscussionThreadFactory)
    .component('apDiscussionThread', APDiscussionThreadComponent);
