# angular-point-discussion-thread
Simple discussion thread directive for angular point.

### Installation
    bower install angular-point-discussion-thread --save

### Example for Instantiation in Model Constructor
Optionally add to constructor on model

    function Project(obj) {
        var self = this;
        _.extend(self, obj);
        self.discussionThread = discussionThreadFactory.createDiscussionObject(self, 'myDiscussionProperty');
    }

### Using the Directive

    <div ap-discussion-thread 
        data-field-name="'myDiscussionProperty'" 
        data-list-item="project"></div>
