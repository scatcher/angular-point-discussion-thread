import { ListItem } from 'angular-point';
import * as _ from 'lodash';
import * as toastr from 'toastr';
import { DiscussionThreadFactory } from './apDiscussionThreadFactory';
import { DiscussionThread } from './DiscussionThread';
import { Post } from './Post';

interface IControllerScope extends ng.IScope {
  fieldName?: string;
  listItem: ListItem<any>;
  changeEvent?(action: string, content?: string): void;
}

export class DiscussionThreadController {
  static $inject = ['apDiscussionThreadFactory', '$templateCache'];
  changeEvent: (action: string, content?: string) => void;
  discussionThread: DiscussionThread;
  fieldName = 'discussionThread';
  listItem: Object;
  negotiatingWithServer: boolean = false;
  respondingTo = '';
  tempPost = '';
  tempResponse = '';

  constructor(private apDiscussionThreadFactory: DiscussionThreadFactory, private $templateCache) {
    this.$templateCache.put(
      'angular-point-discussion-thread/ap-discussion-thread-new-post.html',
      require('./ap-discussion-thread-new-post.html'),
    );
    this.$templateCache.put(
      'angular-point-discussion-thread/ap-discussion-thread-post.html',
      require('./ap-discussion-thread-post.html'),
    );
  }

  $onInit() {}

  $onChanges(changesObj: ng.IOnChangesObject | any) {
    if (changesObj.listItem) {
      this.discussionThread = changesObj.listItem.currentValue[this.fieldName];
    }
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
        post.reply(content, this.discussionThread).then(() => this.cleanup('reply', content));
      } else {
        /** Creating new top level post */
        this.discussionThread
          .createPost(null, content)
          .savePost(this.discussionThread)
          .then(() => this.cleanup('create', content));
      }
    }
  }

  deletePost(post: Post) {
    let hasChildren = false;
    _.each(this.discussionThread.posts, p => {
      if (p.parentId === post.id) {
        hasChildren = true;
        return;
      }
    });
    if (hasChildren) {
      toastr.warning('Unable to delete a comment with child responses.  Please ' + 'remove all children first.');
      return;
    }
    const confirmation = window.confirm('Are you sure you want to delete this comment?');
    if (confirmation) {
      this.negotiatingWithServer = true;
      post.deletePost(this.discussionThread).then(() => this.cleanup('delete'));
    }
  }
}

export const APDiscussionThreadComponent = {
  template: require('./ap-discussion-thread.html'),
  controller: DiscussionThreadController,
  bindings: {
    changeEvent: '<?', // Callback executed if available that passes back action[create, reply, or delete] and body of post
    fieldName: '<?', // Defaults to 'discussionThread'
    listItem: '<',
  },
};
