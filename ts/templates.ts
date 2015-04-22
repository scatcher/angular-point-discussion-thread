/// <reference path="apDiscussionThreadFactory.ts" />

module ap.discussionThread {

    var discussionThread = '' +
`<style type="text/css">
ul.ap-discussion-thread {
    list-style-type: none;
}
ul.ap-discussion-thread ul {
    list-style-type: none;
}
</style>

<fieldset>
    <legend><small>New Post</small></legend>
    <div ng-include="'apDiscussionNewPost.html'"
        ng-init="tempState = 'tempPost'"></div>
</fieldset>

<fieldset ng-if="vm.discussionObject.posts.length > 0">
    <legend><small>Discussion Thread</small></legend>
    <ul class="ap-discussion-thread well well-sm">
        <li class="discussion-head" ng-repeat="post in vm.discussionObject.posts | filter:{parentId: 0} track by post.id"
            style="border-top-width: 1px;border-top-color: grey">
            <div ng-include="'apDisscussionPost.html'"
                 ng-init="level = 0"></div>
        </li>
    </ul>
</fieldset>`;

    var post = ''+
`<div class="ap-discussion-post">
    <blockquote>
        <p>{{ post.content }}</p>
        <small>
            <span class="post-by">{{ post.user.lookupValue }}</span>
            <span class="post-date">{{ post.created  | date:'short' }}</span>
            <button type="button" class="btn btn-link btn-sm"
                    ng-disabled="vm.negotiatingWithServer"
                    ng-click="vm.respondingTo = post">
                <i class="fa fa-mail-reply"></i> Reply
            </button>
            <button type="button" class="btn btn-link btn-sm"
                    ng-disabled="vm.negotiatingWithServer"
                    ng-click="vm.deletePost(post)">
                <i class="fa fa-trash-o"></i> Delete
            </button>

        </small>
    </blockquote>

    <div ng-if="vm.respondingTo === post">
        <div ng-include="'apDiscussionNewPost.html'"
             ng-init="tempState = 'tempResponse'"></div>
    </div>

    <ul class="child-thread">
        <li ng-repeat="response in vm.discussionObject.posts | filter:{parentId: post.id} track by response.id">
            <div ng-include="'apDisscussionPost.html'"
                 ng-init="post = response; level = level + 1"></div>
        </li>
    </ul>

</div>`;


    var newPost = '' +
`<new-post class="row" ng-form="newPost">
    <div class="col-xs-12">
        <div class="form-group">
            <textarea msd-elastic
                      class="form-control"
                      placeholder="Enter a comment..."
                      ng-model="vm[tempState]"></textarea>
            <h5>
                <small>
                    <label class="pull-right">
                        <a class="btn btn-primary btn-sm" href
                                ng-disabled="vm.negotiatingWithServer"
                                ng-click="vm.createPost(vm[tempState], post)">
                            <i class="fa fa-save"></i> Save
                        </a>
                        <a class="btn btn-default btn-sm" href
                                ng-disabled="vm.negotiatingWithServer"
                                ng-click="vm.clearTempVars()">
                            <i class="fa fa-undo"></i> Clear
                        </a>
                    </label>
                </small>
            </h5>
        </div>
    </div>
</new-post>`;



    angular.module("angularPoint")
        .run(["$templateCache", function($templateCache) {
            $templateCache.put("apDiscussionThread.html", discussionThread);
            $templateCache.put("apDisscussionPost.html", post);
            $templateCache.put("apDiscussionNewPost.html", newPost);
        }]);

}
