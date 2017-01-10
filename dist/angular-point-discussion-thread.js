(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular-point"), require("lodash"), require("moment"), require("toastr"));
	else if(typeof define === 'function' && define.amd)
		define(["angular-point", "lodash", "moment", "toastr"], factory);
	else if(typeof exports === 'object')
		exports["angular-point-discussion-thread"] = factory(require("angular-point"), require("lodash"), require("moment"), require("toastr"));
	else
		root["angular-point-discussion-thread"] = factory(root["angular-point"], root["lodash"], root["moment"], root["toastr"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("lodash");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DiscussionThread__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return user; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return DiscussionThreadFactory; });

/** Share within module */
var user;
/**
 * @ngdoc service
 * @name apDiscussionThreadFactory
 * @description
 */
var DiscussionThreadFactory = (function () {
    function DiscussionThreadFactory(_user_) {
        user = _user_;
    }
    /**
     * @ngdoc function
     * @name createDiscussionObject
     * @param {object} listItem List item with discussion.
     * @param {string} discussionAttributeName Name of attribute on list item.
     * @returns {object} Newly instantiated discussion object.
     */
    DiscussionThreadFactory.prototype.createDiscussionObject = function (listItem, discussionAttributeName) {
        if (discussionAttributeName === void 0) { discussionAttributeName = 'discussionThread'; }
        var discussionThread;
        // if (listItem[discussionAttributeName] && listItem[discussionAttributeName].constructor.name === 'DiscussionThread') {
        //     /** Discussion thread is already instantiated */
        //     discussionThread = listItem[discussionAttributeName];
        // } else {
        /** Instantiate and return new discussion thread */
        discussionThread = new __WEBPACK_IMPORTED_MODULE_0__DiscussionThread__["a" /* DiscussionThread */](listItem, discussionAttributeName);
        // }
        return discussionThread;
    };
    return DiscussionThreadFactory;
}());

DiscussionThreadFactory.$inject = ['user'];


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_toastr__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_toastr__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return APDiscussionThreadComponent; });


var DiscussionThreadController = (function () {
    function DiscussionThreadController(apDiscussionThreadFactory, $templateCache) {
        this.apDiscussionThreadFactory = apDiscussionThreadFactory;
        this.$templateCache = $templateCache;
        this.fieldName = 'discussionThread';
        this.negotiatingWithServer = false;
        this.respondingTo = '';
        this.tempPost = '';
        this.tempResponse = '';
        this.$templateCache.put('angular-point-discussion-thread/ap-discussion-thread-new-post.html', __webpack_require__(6));
        this.$templateCache.put('angular-point-discussion-thread/ap-discussion-thread-post.html', __webpack_require__(7));
    }
    DiscussionThreadController.prototype.$onInit = function () {
    };
    DiscussionThreadController.prototype.$onChanges = function (changesObj) {
        if (changesObj.listItem) {
            this.discussionThread = changesObj.listItem.currentValue[this.fieldName];
        }
    };
    DiscussionThreadController.prototype.clearTempVars = function () {
        this.respondingTo = '';
        this.tempPost = '';
        this.tempResponse = '';
    };
    DiscussionThreadController.prototype.cleanup = function (event, content) {
        this.clearTempVars();
        this.negotiatingWithServer = false;
        __WEBPACK_IMPORTED_MODULE_1_toastr__["success"]('Discussion thread successfully updated.');
        if (__WEBPACK_IMPORTED_MODULE_0_lodash__["isFunction"](this.changeEvent) && event) {
            this.changeEvent(event, content);
        }
    };
    DiscussionThreadController.prototype.createPost = function (content, post) {
        var _this = this;
        if (content.length < 1) {
            __WEBPACK_IMPORTED_MODULE_1_toastr__["warning"]('You need to add a comment before saving.');
        }
        else {
            this.negotiatingWithServer = true;
            if (post) {
                post.reply(content, this.discussionThread)
                    .then(function () { return _this.cleanup('reply', content); });
            }
            else {
                /** Creating new top level post */
                this.discussionThread.createPost(null, content)
                    .savePost(this.discussionThread)
                    .then(function () { return _this.cleanup('create', content); });
            }
        }
    };
    DiscussionThreadController.prototype.deletePost = function (post) {
        var _this = this;
        var hasChildren = false;
        __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](this.discussionThread.posts, function (p) {
            if (p.parentId === post.id) {
                hasChildren = true;
                return;
            }
        });
        if (hasChildren) {
            __WEBPACK_IMPORTED_MODULE_1_toastr__["warning"]('Unable to delete a comment with child responses.  Please ' +
                'remove all children first.');
            return;
        }
        var confirmation = window.confirm('Are you sure you want to delete this comment?');
        if (confirmation) {
            this.negotiatingWithServer = true;
            post.deletePost(this.discussionThread)
                .then(function () { return _this.cleanup('delete'); });
        }
    };
    return DiscussionThreadController;
}());
DiscussionThreadController.$inject = ['apDiscussionThreadFactory', '$templateCache'];
var APDiscussionThreadComponent = {
    template: __webpack_require__(8),
    controller: DiscussionThreadController,
    bindings: {
        changeEvent: '<?',
        fieldName: '<?',
        listItem: '<'
    }
};


/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("angular-point");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Post__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__apDiscussionThreadFactory__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DiscussionThread; });



/**
 * @ngdoc function
 * @name createDiscussionObject
 * @param {object} listItem List item with discussion.
 * @param {string} [discussionAttributeName='discussionThread'] Name of attribute on list item.
 * @returns {object} Newly instantiated discussion object.
 */
var DiscussionThread = (function () {
    function DiscussionThread(listItem, discussionAttributeName) {
        if (discussionAttributeName === void 0) { discussionAttributeName = 'discussionThread'; }
        var _this = this;
        this.posts = [];
        /** Protect these two paramaters to prevent saving to SharePoint */
        this.getListItem = function () { return listItem; };
        this.getDiscussionAttributeName = function () { return discussionAttributeName; };
        __WEBPACK_IMPORTED_MODULE_0_lodash__["assign"](this, listItem[discussionAttributeName]);
        __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](this.posts, function (post, index) {
            _this.posts[index] = new __WEBPACK_IMPORTED_MODULE_1__Post__["a" /* Post */](post);
        });
    }
    DiscussionThread.prototype.createPost = function (parentId, content) {
        var newPost = new __WEBPACK_IMPORTED_MODULE_1__Post__["a" /* Post */]({
            content: content,
            id: this.getNextId(),
            parentId: parentId || 0,
            created: new Date(),
            user: __WEBPACK_IMPORTED_MODULE_2__apDiscussionThreadFactory__["a" /* user */]
        });
        this.posts.push(newPost);
        return newPost;
    };
    DiscussionThread.prototype.getNextId = function () {
        var highestId = 0;
        if (this.posts.length > 0) {
            highestId = __WEBPACK_IMPORTED_MODULE_0_lodash__["max"](this.posts.map(function (post) { return post.id; }));
        }
        return highestId + 1;
    };
    DiscussionThread.prototype.prune = function () {
        var _this = this;
        /** Remove any blank posts prior to saving */
        __WEBPACK_IMPORTED_MODULE_0_lodash__["each"](this.posts, function (post) {
            if (__WEBPACK_IMPORTED_MODULE_0_lodash__["isEmpty"](post.content)) {
                post.removePost(_this);
            }
        });
    };
    DiscussionThread.prototype.reset = function () {
        this.posts.length = 0;
    };
    DiscussionThread.prototype.saveChanges = function () {
        this.prune();
        var listItem = this.getListItem();
        return listItem.saveFields([this.getDiscussionAttributeName()]);
    };
    return DiscussionThread;
}());



/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Post; });


var Post = (function () {
    function Post(post) {
        __WEBPACK_IMPORTED_MODULE_1_lodash__["assign"](this, post);
        if (__WEBPACK_IMPORTED_MODULE_1_lodash__["isString"](this.created)) {
            /** Convert stringified date back into JS date */
            this.created = __WEBPACK_IMPORTED_MODULE_0_moment__(this.created).toDate();
        }
    }
    Post.prototype.deletePost = function (discussionThread) {
        this.removePost(discussionThread);
        return this.savePost(discussionThread);
    };
    Post.prototype.removePost = function (discussionThread) {
        var index = discussionThread.posts.indexOf(this);
        discussionThread.posts.splice(index, 1);
    };
    Post.prototype.reply = function (response, discussionThread) {
        discussionThread.createPost(this.id, response);
        return this.savePost(discussionThread);
    };
    Post.prototype.savePost = function (discussionThread) {
        return discussionThread.saveChanges();
    };
    return Post;
}());



/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = "<new-post class=\"row\" ng-form=\"newPost\">\n\t<div class=\"col-xs-12\">\n\t\t<div class=\"form-group\">\n\t\t\t<textarea msd-elastic class=\"form-control\" placeholder=\"Enter a comment...\" ng-model=\"$ctrl[tempState]\"></textarea>\n\t\t\t<h5>\n\t\t\t\t<small>\n\t\t\t\t\t<label class=\"pull-right\">\n\t\t\t\t\t\t<a class=\"btn btn-primary btn-sm\" href ng-disabled=\"$ctrl.negotiatingWithServer\" ng-click=\"$ctrl.createPost($ctrl[tempState], post)\">\n                            <i class=\"fa fa-save\"></i> Save\n                        </a>\n\t\t\t\t\t\t<a class=\"btn btn-default btn-sm\" href ng-disabled=\"$ctrl.negotiatingWithServer\" ng-click=\"$ctrl.clearTempVars()\">\n                            <i class=\"fa fa-undo\"></i> Clear\n                        </a>\n\t\t\t\t\t</label>\n\t\t\t\t</small>\n\t\t\t</h5>\n\t\t</div>\n\t</div>\n</new-post>"

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = "<div class=\"ap-discussion-post\">\n\t<blockquote>\n\t\t<p>{{ post.content }}</p>\n\t\t<small>\n\t\t\t<span class=\"post-by\">{{ post.user.lookupValue }}</span>\n\t\t\t<span class=\"post-date\">{{ post.created | date:'short' }}</span>\n\t\t\t<button type=\"button\" class=\"btn btn-link btn-sm\" ng-disabled=\"$ctrl.negotiatingWithServer\"\n\t\t\tng-click=\"$ctrl.respondingTo = post\">\n\t\t\t\t<i class=\"fa fa-mail-reply\"></i>Reply</button>\n\t\t\t<button type=\"button\" class=\"btn btn-link btn-sm\" ng-disabled=\"$ctrl.negotiatingWithServer\" ng-click=\"$ctrl.deletePost(post)\">\n\t\t\t\t<i class=\"fa fa-trash-o\"></i>Delete</button>\n\t\t</small>\n\t</blockquote>\n\t<div ng-if=\"$ctrl.respondingTo === post\">\n\t\t<div ng-include=\"'angular-point-discussion-thread/ap-discussion-thread-new-post.html'\" ng-init=\"tempState = 'tempResponse'\"></div>\n\t</div>\n\t<ul class=\"child-thread\">\n\t\t<li ng-repeat=\"response in $ctrl.discussionThread.posts | filter:{parentId: post.id} track by response.id\">\n\t\t\t<div ng-include=\"'angular-point-discussion-thread/ap-discussion-thread-post.html'\" ng-init=\"post = response; level = level + 1\"></div>\n\t\t</li>\n\t</ul>\n</div>\n"

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = "<style type=\"text/css\">\n\tul.ap-discussion-thread {\n\t    list-style-type: none;\n\t}\n\tul.ap-discussion-thread ul {\n\t    list-style-type: none;\n\t}\n</style>\n<fieldset>\n\t<legend>\n\t\t<small>New Post</small>\n\t</legend>\n\t<div ng-include=\"'angular-point-discussion-thread/ap-discussion-thread-new-post.html'\" ng-init=\"tempState = 'tempPost'\"></div>\n</fieldset>\n<fieldset ng-if=\"$ctrl.discussionThread.posts.length > 0\">\n\t<legend>\n\t\t<small>Discussion Thread</small>\n\t</legend>\n\t<ul class=\"ap-discussion-thread well well-sm\">\n\t\t<li class=\"discussion-head\" ng-repeat=\"post in $ctrl.discussionThread.posts | filter:{parentId: 0} track by post.id\"\n\t\t\tstyle=\"border-top-width: 1px;border-top-color: grey\">\n\t\t\t<div ng-include=\"'angular-point-discussion-thread/ap-discussion-thread-post.html'\" ng-init=\"level = 0\"></div>\n\t\t</li>\n\t</ul>\n</fieldset>\n"

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("moment");

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = require("toastr");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apDiscussionThreadFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apDiscussionThreadComponent__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_point__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_point___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular_point__);



// import {AngularPointModule} from '../angular-point';
__WEBPACK_IMPORTED_MODULE_2_angular_point__["AngularPointModule"]
    .service('apDiscussionThreadFactory', __WEBPACK_IMPORTED_MODULE_0__apDiscussionThreadFactory__["b" /* DiscussionThreadFactory */])
    .component('apDiscussionThread', __WEBPACK_IMPORTED_MODULE_1__apDiscussionThreadComponent__["a" /* APDiscussionThreadComponent */]);


/***/ }
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3Y2JiMDlhZDIyMTNkZDk0NGU2NSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2hcIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBEaXNjdXNzaW9uVGhyZWFkRmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBEaXNjdXNzaW9uVGhyZWFkQ29tcG9uZW50LnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXItcG9pbnRcIiIsIndlYnBhY2s6Ly8vLi9zcmMvRGlzY3Vzc2lvblRocmVhZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUG9zdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXAtZGlzY3Vzc2lvbi10aHJlYWQtbmV3LXBvc3QuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvYXAtZGlzY3Vzc2lvbi10aHJlYWQtcG9zdC5odG1sIiwid2VicGFjazovLy8uL3NyYy9hcC1kaXNjdXNzaW9uLXRocmVhZC5odG1sIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRvYXN0clwiIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtB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VSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsdUJBQVEsR0FBUixVQUFTLGdCQUFrQztRQUN2QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDOzs7Ozs7OztBQ3pDRCxrM0I7Ozs7OztBQ0FBLCtFQUErRSxnQkFBZ0IsbURBQW1ELHlCQUF5QiwyQ0FBMkMsK0JBQStCLDJ1QkFBMnVCLGtCQUFrQiwrSUFBK0ksMEQ7Ozs7OztBQ0Fqb0Msd0VBQXdFLDhCQUE4QixLQUFLLGdDQUFnQyw4QkFBOEIsS0FBSywrZUFBK2UsWUFBWSx5REFBeUQsc0w7Ozs7OztBQ0FsdUIsbUM7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FvRTtBQUNNO0FBQ3pCO0FBQ2pELHVEQUF1RDtBQUV2RCxpRUFBa0I7S0FDYixPQUFPLENBQUMsMkJBQTJCLEVBQUUsMkZBQXVCLENBQUM7S0FDN0QsU0FBUyxDQUFDLG9CQUFvQixFQUFFLGlHQUEyQixDQUFDLENBQUMiLCJmaWxlIjoiYW5ndWxhci1wb2ludC1kaXNjdXNzaW9uLXRocmVhZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFuZ3VsYXItcG9pbnRcIiksIHJlcXVpcmUoXCJsb2Rhc2hcIiksIHJlcXVpcmUoXCJtb21lbnRcIiksIHJlcXVpcmUoXCJ0b2FzdHJcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiYW5ndWxhci1wb2ludFwiLCBcImxvZGFzaFwiLCBcIm1vbWVudFwiLCBcInRvYXN0clwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJhbmd1bGFyLXBvaW50LWRpc2N1c3Npb24tdGhyZWFkXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhci1wb2ludFwiKSwgcmVxdWlyZShcImxvZGFzaFwiKSwgcmVxdWlyZShcIm1vbWVudFwiKSwgcmVxdWlyZShcInRvYXN0clwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiYW5ndWxhci1wb2ludC1kaXNjdXNzaW9uLXRocmVhZFwiXSA9IGZhY3Rvcnkocm9vdFtcImFuZ3VsYXItcG9pbnRcIl0sIHJvb3RbXCJsb2Rhc2hcIl0sIHJvb3RbXCJtb21lbnRcIl0sIHJvb3RbXCJ0b2FzdHJcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xMF9fKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb3J5IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vcnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDdjYmIwOWFkMjIxM2RkOTQ0ZTY1IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibG9kYXNoXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtMaXN0SXRlbX0gZnJvbSAnYW5ndWxhci1wb2ludCc7XG5pbXBvcnQge0Rpc2N1c3Npb25UaHJlYWR9IGZyb20gJy4vRGlzY3Vzc2lvblRocmVhZCc7XG5cbi8qKiBTaGFyZSB3aXRoaW4gbW9kdWxlICovXG5leHBvcnQgbGV0IHVzZXI7XG5cbi8qKlxuICogQG5nZG9jIHNlcnZpY2VcbiAqIEBuYW1lIGFwRGlzY3Vzc2lvblRocmVhZEZhY3RvcnlcbiAqIEBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgY2xhc3MgRGlzY3Vzc2lvblRocmVhZEZhY3Rvcnkge1xuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyd1c2VyJ107XG5cbiAgICBjb25zdHJ1Y3RvcihfdXNlcl8pIHtcbiAgICAgICAgdXNlciA9IF91c2VyXztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbmdkb2MgZnVuY3Rpb25cbiAgICAgKiBAbmFtZSBjcmVhdGVEaXNjdXNzaW9uT2JqZWN0XG4gICAgICogQHBhcmFtIHtvYmplY3R9IGxpc3RJdGVtIExpc3QgaXRlbSB3aXRoIGRpc2N1c3Npb24uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpc2N1c3Npb25BdHRyaWJ1dGVOYW1lIE5hbWUgb2YgYXR0cmlidXRlIG9uIGxpc3QgaXRlbS5cbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBOZXdseSBpbnN0YW50aWF0ZWQgZGlzY3Vzc2lvbiBvYmplY3QuXG4gICAgICovXG4gICAgY3JlYXRlRGlzY3Vzc2lvbk9iamVjdDxUIGV4dGVuZHMgTGlzdEl0ZW08VD4+KGxpc3RJdGVtOiBMaXN0SXRlbTxUPiwgZGlzY3Vzc2lvbkF0dHJpYnV0ZU5hbWUgPSAnZGlzY3Vzc2lvblRocmVhZCcpOiBEaXNjdXNzaW9uVGhyZWFkIHtcbiAgICAgICAgbGV0IGRpc2N1c3Npb25UaHJlYWQ7XG5cbiAgICAgICAgLy8gaWYgKGxpc3RJdGVtW2Rpc2N1c3Npb25BdHRyaWJ1dGVOYW1lXSAmJiBsaXN0SXRlbVtkaXNjdXNzaW9uQXR0cmlidXRlTmFtZV0uY29uc3RydWN0b3IubmFtZSA9PT0gJ0Rpc2N1c3Npb25UaHJlYWQnKSB7XG4gICAgICAgIC8vICAgICAvKiogRGlzY3Vzc2lvbiB0aHJlYWQgaXMgYWxyZWFkeSBpbnN0YW50aWF0ZWQgKi9cbiAgICAgICAgLy8gICAgIGRpc2N1c3Npb25UaHJlYWQgPSBsaXN0SXRlbVtkaXNjdXNzaW9uQXR0cmlidXRlTmFtZV07XG4gICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8qKiBJbnN0YW50aWF0ZSBhbmQgcmV0dXJuIG5ldyBkaXNjdXNzaW9uIHRocmVhZCAqL1xuICAgICAgICBkaXNjdXNzaW9uVGhyZWFkID0gbmV3IERpc2N1c3Npb25UaHJlYWQobGlzdEl0ZW0sIGRpc2N1c3Npb25BdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHJldHVybiBkaXNjdXNzaW9uVGhyZWFkO1xuICAgIH1cblxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3RzbGludC1sb2FkZXIhLi9zcmMvYXBEaXNjdXNzaW9uVGhyZWFkRmFjdG9yeS50cyIsImltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIHRvYXN0ciBmcm9tICd0b2FzdHInO1xuaW1wb3J0IHtMaXN0SXRlbX0gZnJvbSAnYW5ndWxhci1wb2ludCc7XG5pbXBvcnQge0lTY29wZX0gZnJvbSAnYW5ndWxhcic7XG5pbXBvcnQge0Rpc2N1c3Npb25UaHJlYWRGYWN0b3J5fSBmcm9tICcuL2FwRGlzY3Vzc2lvblRocmVhZEZhY3RvcnknO1xuaW1wb3J0IHtEaXNjdXNzaW9uVGhyZWFkfSBmcm9tICcuL0Rpc2N1c3Npb25UaHJlYWQnO1xuaW1wb3J0IHtQb3N0fSBmcm9tICcuL1Bvc3QnO1xuXG5cbmludGVyZmFjZSBJQ29udHJvbGxlclNjb3BlIGV4dGVuZHMgbmcuSVNjb3BlIHtcbiAgICBjaGFuZ2VFdmVudD8oYWN0aW9uOiBzdHJpbmcsIGNvbnRlbnQ/OiBzdHJpbmcpOiB2b2lkO1xuICAgIGZpZWxkTmFtZT86IHN0cmluZztcbiAgICBsaXN0SXRlbTogTGlzdEl0ZW08YW55Pjtcbn1cblxuY2xhc3MgRGlzY3Vzc2lvblRocmVhZENvbnRyb2xsZXIge1xuICAgIHN0YXRpYyAkaW5qZWN0ID0gWydhcERpc2N1c3Npb25UaHJlYWRGYWN0b3J5JywgJyR0ZW1wbGF0ZUNhY2hlJ107XG4gICAgY2hhbmdlRXZlbnQ6IChhY3Rpb246IHN0cmluZywgY29udGVudD86IHN0cmluZykgPT4gdm9pZDtcbiAgICBkaXNjdXNzaW9uVGhyZWFkOiBEaXNjdXNzaW9uVGhyZWFkO1xuICAgIGZpZWxkTmFtZSA9ICdkaXNjdXNzaW9uVGhyZWFkJztcbiAgICBsaXN0SXRlbTogT2JqZWN0O1xuICAgIG5lZ290aWF0aW5nV2l0aFNlcnZlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHJlc3BvbmRpbmdUbyA9ICcnO1xuICAgIHRlbXBQb3N0ID0gJyc7XG4gICAgdGVtcFJlc3BvbnNlID0gJyc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwRGlzY3Vzc2lvblRocmVhZEZhY3Rvcnk6IERpc2N1c3Npb25UaHJlYWRGYWN0b3J5LCBwcml2YXRlICR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgICAgIHRoaXMuJHRlbXBsYXRlQ2FjaGUucHV0KCdhbmd1bGFyLXBvaW50LWRpc2N1c3Npb24tdGhyZWFkL2FwLWRpc2N1c3Npb24tdGhyZWFkLW5ldy1wb3N0Lmh0bWwnLCByZXF1aXJlKCcuL2FwLWRpc2N1c3Npb24tdGhyZWFkLW5ldy1wb3N0Lmh0bWwnKSk7XG4gICAgICAgIHRoaXMuJHRlbXBsYXRlQ2FjaGUucHV0KCdhbmd1bGFyLXBvaW50LWRpc2N1c3Npb24tdGhyZWFkL2FwLWRpc2N1c3Npb24tdGhyZWFkLXBvc3QuaHRtbCcsIHJlcXVpcmUoJy4vYXAtZGlzY3Vzc2lvbi10aHJlYWQtcG9zdC5odG1sJykpO1xuICAgIH1cblxuICAgICRvbkluaXQoKSB7XG5cbiAgICB9XG5cbiAgICAkb25DaGFuZ2VzKGNoYW5nZXNPYmo6IG5nLklPbkNoYW5nZXNPYmplY3QpIHtcbiAgICAgICAgaWYgKGNoYW5nZXNPYmoubGlzdEl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuZGlzY3Vzc2lvblRocmVhZCA9IGNoYW5nZXNPYmoubGlzdEl0ZW0uY3VycmVudFZhbHVlW3RoaXMuZmllbGROYW1lXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyVGVtcFZhcnMoKSB7XG4gICAgICAgIHRoaXMucmVzcG9uZGluZ1RvID0gJyc7XG4gICAgICAgIHRoaXMudGVtcFBvc3QgPSAnJztcbiAgICAgICAgdGhpcy50ZW1wUmVzcG9uc2UgPSAnJztcbiAgICB9XG5cbiAgICBjbGVhbnVwKGV2ZW50OiBzdHJpbmcsIGNvbnRlbnQ/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jbGVhclRlbXBWYXJzKCk7XG4gICAgICAgIHRoaXMubmVnb3RpYXRpbmdXaXRoU2VydmVyID0gZmFsc2U7XG4gICAgICAgIHRvYXN0ci5zdWNjZXNzKCdEaXNjdXNzaW9uIHRocmVhZCBzdWNjZXNzZnVsbHkgdXBkYXRlZC4nKTtcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLmNoYW5nZUV2ZW50KSAmJiBldmVudCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VFdmVudChldmVudCwgY29udGVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVQb3N0KGNvbnRlbnQ6IHN0cmluZywgcG9zdDogUG9zdCkge1xuICAgICAgICBpZiAoY29udGVudC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICB0b2FzdHIud2FybmluZygnWW91IG5lZWQgdG8gYWRkIGEgY29tbWVudCBiZWZvcmUgc2F2aW5nLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uZWdvdGlhdGluZ1dpdGhTZXJ2ZXIgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHBvc3QpIHtcbiAgICAgICAgICAgICAgICBwb3N0LnJlcGx5KGNvbnRlbnQsIHRoaXMuZGlzY3Vzc2lvblRocmVhZClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5jbGVhbnVwKCdyZXBseScsIGNvbnRlbnQpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLyoqIENyZWF0aW5nIG5ldyB0b3AgbGV2ZWwgcG9zdCAqL1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzY3Vzc2lvblRocmVhZC5jcmVhdGVQb3N0KG51bGwsIGNvbnRlbnQpXG4gICAgICAgICAgICAgICAgICAgIC5zYXZlUG9zdCh0aGlzLmRpc2N1c3Npb25UaHJlYWQpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuY2xlYW51cCgnY3JlYXRlJywgY29udGVudCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVsZXRlUG9zdChwb3N0OiBQb3N0KSB7XG4gICAgICAgIGxldCBoYXNDaGlsZHJlbiA9IGZhbHNlO1xuICAgICAgICBfLmVhY2godGhpcy5kaXNjdXNzaW9uVGhyZWFkLnBvc3RzLCAocCkgPT4ge1xuICAgICAgICAgICAgaWYgKHAucGFyZW50SWQgPT09IHBvc3QuaWQpIHtcbiAgICAgICAgICAgICAgICBoYXNDaGlsZHJlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGhhc0NoaWxkcmVuKSB7XG4gICAgICAgICAgICB0b2FzdHIud2FybmluZygnVW5hYmxlIHRvIGRlbGV0ZSBhIGNvbW1lbnQgd2l0aCBjaGlsZCByZXNwb25zZXMuICBQbGVhc2UgJyArXG4gICAgICAgICAgICAgICAgJ3JlbW92ZSBhbGwgY2hpbGRyZW4gZmlyc3QuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29uZmlybWF0aW9uID0gd2luZG93LmNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBjb21tZW50PycpO1xuICAgICAgICBpZiAoY29uZmlybWF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm5lZ290aWF0aW5nV2l0aFNlcnZlciA9IHRydWU7XG4gICAgICAgICAgICBwb3N0LmRlbGV0ZVBvc3QodGhpcy5kaXNjdXNzaW9uVGhyZWFkKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuY2xlYW51cCgnZGVsZXRlJykpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjb25zdCBBUERpc2N1c3Npb25UaHJlYWRDb21wb25lbnQgPSB7XG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vYXAtZGlzY3Vzc2lvbi10aHJlYWQuaHRtbCcpLFxuICAgIGNvbnRyb2xsZXI6IERpc2N1c3Npb25UaHJlYWRDb250cm9sbGVyLFxuICAgIGJpbmRpbmdzOiB7XG4gICAgICAgIGNoYW5nZUV2ZW50OiAnPD8nLCAvLyBDYWxsYmFjayBleGVjdXRlZCBpZiBhdmFpbGFibGUgdGhhdCBwYXNzZXMgYmFjayBhY3Rpb25bY3JlYXRlLCByZXBseSwgb3IgZGVsZXRlXSBhbmQgYm9keSBvZiBwb3N0XG4gICAgICAgIGZpZWxkTmFtZTogJzw/JywgLy8gRGVmYXVsdHMgdG8gJ2Rpc2N1c3Npb25UaHJlYWQnXG4gICAgICAgIGxpc3RJdGVtOiAnPCdcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vc3JjL2FwRGlzY3Vzc2lvblRocmVhZENvbXBvbmVudC50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFuZ3VsYXItcG9pbnRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJhbmd1bGFyLXBvaW50XCJcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtMaXN0SXRlbX0gZnJvbSAnYW5ndWxhci1wb2ludCc7XG5pbXBvcnQge1Bvc3R9IGZyb20gJy4vUG9zdCc7XG5pbXBvcnQge3VzZXJ9IGZyb20gJy4vYXBEaXNjdXNzaW9uVGhyZWFkRmFjdG9yeSc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBJRGlzY3Vzc2lvblRocmVhZCB7XG4gICAgY3JlYXRlUG9zdChwYXJlbnRJZDogbnVtYmVyLCBjb250ZW50OiBzdHJpbmcpOiBQb3N0O1xuICAgIGdldERpc2N1c3Npb25BdHRyaWJ1dGVOYW1lKCk6IHN0cmluZztcbiAgICBnZXRMaXN0SXRlbSgpOiBMaXN0SXRlbTxhbnk+O1xuICAgIGdldE5leHRJZCgpOiBudW1iZXI7XG4gICAgcG9zdHM6IFBvc3RbXTtcbiAgICBwcnVuZSgpOiB2b2lkO1xuICAgIHJlc2V0KCk6IHZvaWQ7XG4gICAgc2F2ZUNoYW5nZXMoKTogbmcuSVByb21pc2U8TGlzdEl0ZW08YW55Pj47XG59XG5cbi8qKlxuICogQG5nZG9jIGZ1bmN0aW9uXG4gKiBAbmFtZSBjcmVhdGVEaXNjdXNzaW9uT2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gbGlzdEl0ZW0gTGlzdCBpdGVtIHdpdGggZGlzY3Vzc2lvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbZGlzY3Vzc2lvbkF0dHJpYnV0ZU5hbWU9J2Rpc2N1c3Npb25UaHJlYWQnXSBOYW1lIG9mIGF0dHJpYnV0ZSBvbiBsaXN0IGl0ZW0uXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBOZXdseSBpbnN0YW50aWF0ZWQgZGlzY3Vzc2lvbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBEaXNjdXNzaW9uVGhyZWFkIGltcGxlbWVudHMgSURpc2N1c3Npb25UaHJlYWQge1xuICAgIGdldERpc2N1c3Npb25BdHRyaWJ1dGVOYW1lOiAoKSA9PiBzdHJpbmc7XG4gICAgZ2V0TGlzdEl0ZW06ICgpID0+IExpc3RJdGVtPGFueT47XG4gICAgcG9zdHM6IFBvc3RbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IobGlzdEl0ZW06IExpc3RJdGVtPGFueT4sIGRpc2N1c3Npb25BdHRyaWJ1dGVOYW1lID0gJ2Rpc2N1c3Npb25UaHJlYWQnKSB7XG5cbiAgICAgICAgLyoqIFByb3RlY3QgdGhlc2UgdHdvIHBhcmFtYXRlcnMgdG8gcHJldmVudCBzYXZpbmcgdG8gU2hhcmVQb2ludCAqL1xuICAgICAgICB0aGlzLmdldExpc3RJdGVtID0gKCkgPT4gbGlzdEl0ZW07XG4gICAgICAgIHRoaXMuZ2V0RGlzY3Vzc2lvbkF0dHJpYnV0ZU5hbWUgPSAoKSA9PiBkaXNjdXNzaW9uQXR0cmlidXRlTmFtZTtcblxuICAgICAgICBfLmFzc2lnbih0aGlzLCBsaXN0SXRlbVtkaXNjdXNzaW9uQXR0cmlidXRlTmFtZV0pO1xuXG4gICAgICAgIF8uZWFjaCh0aGlzLnBvc3RzLCAocG9zdCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucG9zdHNbaW5kZXhdID0gbmV3IFBvc3QocG9zdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZVBvc3QocGFyZW50SWQ6IG51bWJlciwgY29udGVudDogc3RyaW5nKTogUG9zdCB7XG4gICAgICAgIGNvbnN0IG5ld1Bvc3QgPSBuZXcgUG9zdCh7XG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICAgICAgaWQ6IHRoaXMuZ2V0TmV4dElkKCksXG4gICAgICAgICAgICBwYXJlbnRJZDogcGFyZW50SWQgfHwgMCxcbiAgICAgICAgICAgIGNyZWF0ZWQ6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICB1c2VyOiB1c2VyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucG9zdHMucHVzaChuZXdQb3N0KTtcbiAgICAgICAgcmV0dXJuIG5ld1Bvc3Q7XG4gICAgfVxuXG4gICAgZ2V0TmV4dElkKCk6IG51bWJlciB7XG4gICAgICAgIGxldCBoaWdoZXN0SWQgPSAwO1xuICAgICAgICBpZiAodGhpcy5wb3N0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBoaWdoZXN0SWQgPSBfLm1heCh0aGlzLnBvc3RzLm1hcChwb3N0ID0+IHBvc3QuaWQpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGlnaGVzdElkICsgMTtcbiAgICB9XG5cbiAgICBwcnVuZSgpOiB2b2lkIHtcbiAgICAgICAgLyoqIFJlbW92ZSBhbnkgYmxhbmsgcG9zdHMgcHJpb3IgdG8gc2F2aW5nICovXG4gICAgICAgIF8uZWFjaCh0aGlzLnBvc3RzLCAocG9zdCkgPT4ge1xuICAgICAgICAgICAgaWYgKF8uaXNFbXB0eShwb3N0LmNvbnRlbnQpKSB7XG4gICAgICAgICAgICAgICAgcG9zdC5yZW1vdmVQb3N0KHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNldCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wb3N0cy5sZW5ndGggPSAwO1xuICAgIH1cblxuICAgIHNhdmVDaGFuZ2VzKCk6IG5nLklQcm9taXNlPExpc3RJdGVtPGFueT4+IHtcbiAgICAgICAgdGhpcy5wcnVuZSgpO1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IHRoaXMuZ2V0TGlzdEl0ZW0oKTtcbiAgICAgICAgcmV0dXJuIGxpc3RJdGVtLnNhdmVGaWVsZHMoW3RoaXMuZ2V0RGlzY3Vzc2lvbkF0dHJpYnV0ZU5hbWUoKV0pO1xuICAgIH1cbn1cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3RzbGludC1sb2FkZXIhLi9zcmMvRGlzY3Vzc2lvblRocmVhZC50cyIsImltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQge0lVc2VyfSBmcm9tICdhbmd1bGFyLXBvaW50Jztcbi8vIGltcG9ydCB7SVVzZXJ9IGZyb20gJy4uL2FuZ3VsYXItcG9pbnQvZmFjdG9yaWVzL2FwVXNlckZhY3RvcnknO1xuaW1wb3J0IHtEaXNjdXNzaW9uVGhyZWFkfSBmcm9tICcuL0Rpc2N1c3Npb25UaHJlYWQnO1xuXG5cbmV4cG9ydCBjbGFzcyBQb3N0IHtcbiAgICBjcmVhdGVkOiBEYXRlO1xuICAgIGNvbnRlbnQ6IHN0cmluZztcbiAgICBpZDogbnVtYmVyO1xuICAgIHBhcmVudElkOiBudW1iZXI7XG4gICAgdXNlcjogSVVzZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwb3N0KSB7XG4gICAgICAgIF8uYXNzaWduKHRoaXMsIHBvc3QpO1xuICAgICAgICBpZiAoXy5pc1N0cmluZyh0aGlzLmNyZWF0ZWQpKSB7XG4gICAgICAgICAgICAvKiogQ29udmVydCBzdHJpbmdpZmllZCBkYXRlIGJhY2sgaW50byBKUyBkYXRlICovXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZWQgPSBtb21lbnQodGhpcy5jcmVhdGVkKS50b0RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlbGV0ZVBvc3QoZGlzY3Vzc2lvblRocmVhZDogRGlzY3Vzc2lvblRocmVhZCkge1xuICAgICAgICB0aGlzLnJlbW92ZVBvc3QoZGlzY3Vzc2lvblRocmVhZCk7XG4gICAgICAgIHJldHVybiB0aGlzLnNhdmVQb3N0KGRpc2N1c3Npb25UaHJlYWQpO1xuICAgIH1cblxuICAgIHJlbW92ZVBvc3QoZGlzY3Vzc2lvblRocmVhZDogRGlzY3Vzc2lvblRocmVhZCk6IHZvaWQge1xuICAgICAgICBjb25zdCBpbmRleCA9IGRpc2N1c3Npb25UaHJlYWQucG9zdHMuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgZGlzY3Vzc2lvblRocmVhZC5wb3N0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJlcGx5KHJlc3BvbnNlOiBzdHJpbmcsIGRpc2N1c3Npb25UaHJlYWQ6IERpc2N1c3Npb25UaHJlYWQpIHtcbiAgICAgICAgZGlzY3Vzc2lvblRocmVhZC5jcmVhdGVQb3N0KHRoaXMuaWQsIHJlc3BvbnNlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZVBvc3QoZGlzY3Vzc2lvblRocmVhZCk7XG4gICAgfVxuXG4gICAgc2F2ZVBvc3QoZGlzY3Vzc2lvblRocmVhZDogRGlzY3Vzc2lvblRocmVhZCkge1xuICAgICAgICByZXR1cm4gZGlzY3Vzc2lvblRocmVhZC5zYXZlQ2hhbmdlcygpO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL3NyYy9Qb3N0LnRzIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxuZXctcG9zdCBjbGFzcz1cXFwicm93XFxcIiBuZy1mb3JtPVxcXCJuZXdQb3N0XFxcIj5cXG5cXHQ8ZGl2IGNsYXNzPVxcXCJjb2wteHMtMTJcXFwiPlxcblxcdFxcdDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXBcXFwiPlxcblxcdFxcdFxcdDx0ZXh0YXJlYSBtc2QtZWxhc3RpYyBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiBwbGFjZWhvbGRlcj1cXFwiRW50ZXIgYSBjb21tZW50Li4uXFxcIiBuZy1tb2RlbD1cXFwiJGN0cmxbdGVtcFN0YXRlXVxcXCI+PC90ZXh0YXJlYT5cXG5cXHRcXHRcXHQ8aDU+XFxuXFx0XFx0XFx0XFx0PHNtYWxsPlxcblxcdFxcdFxcdFxcdFxcdDxsYWJlbCBjbGFzcz1cXFwicHVsbC1yaWdodFxcXCI+XFxuXFx0XFx0XFx0XFx0XFx0XFx0PGEgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeSBidG4tc21cXFwiIGhyZWYgbmctZGlzYWJsZWQ9XFxcIiRjdHJsLm5lZ290aWF0aW5nV2l0aFNlcnZlclxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLmNyZWF0ZVBvc3QoJGN0cmxbdGVtcFN0YXRlXSwgcG9zdClcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtc2F2ZVxcXCI+PC9pPiBTYXZlXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxcblxcdFxcdFxcdFxcdFxcdFxcdDxhIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHQgYnRuLXNtXFxcIiBocmVmIG5nLWRpc2FibGVkPVxcXCIkY3RybC5uZWdvdGlhdGluZ1dpdGhTZXJ2ZXJcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5jbGVhclRlbXBWYXJzKClcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtdW5kb1xcXCI+PC9pPiBDbGVhclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cXG5cXHRcXHRcXHRcXHRcXHQ8L2xhYmVsPlxcblxcdFxcdFxcdFxcdDwvc21hbGw+XFxuXFx0XFx0XFx0PC9oNT5cXG5cXHRcXHQ8L2Rpdj5cXG5cXHQ8L2Rpdj5cXG48L25ldy1wb3N0PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXAtZGlzY3Vzc2lvbi10aHJlYWQtbmV3LXBvc3QuaHRtbFxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwiYXAtZGlzY3Vzc2lvbi1wb3N0XFxcIj5cXG5cXHQ8YmxvY2txdW90ZT5cXG5cXHRcXHQ8cD57eyBwb3N0LmNvbnRlbnQgfX08L3A+XFxuXFx0XFx0PHNtYWxsPlxcblxcdFxcdFxcdDxzcGFuIGNsYXNzPVxcXCJwb3N0LWJ5XFxcIj57eyBwb3N0LnVzZXIubG9va3VwVmFsdWUgfX08L3NwYW4+XFxuXFx0XFx0XFx0PHNwYW4gY2xhc3M9XFxcInBvc3QtZGF0ZVxcXCI+e3sgcG9zdC5jcmVhdGVkIHwgZGF0ZTonc2hvcnQnIH19PC9zcGFuPlxcblxcdFxcdFxcdDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1saW5rIGJ0bi1zbVxcXCIgbmctZGlzYWJsZWQ9XFxcIiRjdHJsLm5lZ290aWF0aW5nV2l0aFNlcnZlclxcXCJcXG5cXHRcXHRcXHRuZy1jbGljaz1cXFwiJGN0cmwucmVzcG9uZGluZ1RvID0gcG9zdFxcXCI+XFxuXFx0XFx0XFx0XFx0PGkgY2xhc3M9XFxcImZhIGZhLW1haWwtcmVwbHlcXFwiPjwvaT5SZXBseTwvYnV0dG9uPlxcblxcdFxcdFxcdDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1saW5rIGJ0bi1zbVxcXCIgbmctZGlzYWJsZWQ9XFxcIiRjdHJsLm5lZ290aWF0aW5nV2l0aFNlcnZlclxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLmRlbGV0ZVBvc3QocG9zdClcXFwiPlxcblxcdFxcdFxcdFxcdDxpIGNsYXNzPVxcXCJmYSBmYS10cmFzaC1vXFxcIj48L2k+RGVsZXRlPC9idXR0b24+XFxuXFx0XFx0PC9zbWFsbD5cXG5cXHQ8L2Jsb2NrcXVvdGU+XFxuXFx0PGRpdiBuZy1pZj1cXFwiJGN0cmwucmVzcG9uZGluZ1RvID09PSBwb3N0XFxcIj5cXG5cXHRcXHQ8ZGl2IG5nLWluY2x1ZGU9XFxcIidhbmd1bGFyLXBvaW50LWRpc2N1c3Npb24tdGhyZWFkL2FwLWRpc2N1c3Npb24tdGhyZWFkLW5ldy1wb3N0Lmh0bWwnXFxcIiBuZy1pbml0PVxcXCJ0ZW1wU3RhdGUgPSAndGVtcFJlc3BvbnNlJ1xcXCI+PC9kaXY+XFxuXFx0PC9kaXY+XFxuXFx0PHVsIGNsYXNzPVxcXCJjaGlsZC10aHJlYWRcXFwiPlxcblxcdFxcdDxsaSBuZy1yZXBlYXQ9XFxcInJlc3BvbnNlIGluICRjdHJsLmRpc2N1c3Npb25UaHJlYWQucG9zdHMgfCBmaWx0ZXI6e3BhcmVudElkOiBwb3N0LmlkfSB0cmFjayBieSByZXNwb25zZS5pZFxcXCI+XFxuXFx0XFx0XFx0PGRpdiBuZy1pbmNsdWRlPVxcXCInYW5ndWxhci1wb2ludC1kaXNjdXNzaW9uLXRocmVhZC9hcC1kaXNjdXNzaW9uLXRocmVhZC1wb3N0Lmh0bWwnXFxcIiBuZy1pbml0PVxcXCJwb3N0ID0gcmVzcG9uc2U7IGxldmVsID0gbGV2ZWwgKyAxXFxcIj48L2Rpdj5cXG5cXHRcXHQ8L2xpPlxcblxcdDwvdWw+XFxuPC9kaXY+XFxuXCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hcC1kaXNjdXNzaW9uLXRocmVhZC1wb3N0Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxzdHlsZSB0eXBlPVxcXCJ0ZXh0L2Nzc1xcXCI+XFxuXFx0dWwuYXAtZGlzY3Vzc2lvbi10aHJlYWQge1xcblxcdCAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XFxuXFx0fVxcblxcdHVsLmFwLWRpc2N1c3Npb24tdGhyZWFkIHVsIHtcXG5cXHQgICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcblxcdH1cXG48L3N0eWxlPlxcbjxmaWVsZHNldD5cXG5cXHQ8bGVnZW5kPlxcblxcdFxcdDxzbWFsbD5OZXcgUG9zdDwvc21hbGw+XFxuXFx0PC9sZWdlbmQ+XFxuXFx0PGRpdiBuZy1pbmNsdWRlPVxcXCInYW5ndWxhci1wb2ludC1kaXNjdXNzaW9uLXRocmVhZC9hcC1kaXNjdXNzaW9uLXRocmVhZC1uZXctcG9zdC5odG1sJ1xcXCIgbmctaW5pdD1cXFwidGVtcFN0YXRlID0gJ3RlbXBQb3N0J1xcXCI+PC9kaXY+XFxuPC9maWVsZHNldD5cXG48ZmllbGRzZXQgbmctaWY9XFxcIiRjdHJsLmRpc2N1c3Npb25UaHJlYWQucG9zdHMubGVuZ3RoID4gMFxcXCI+XFxuXFx0PGxlZ2VuZD5cXG5cXHRcXHQ8c21hbGw+RGlzY3Vzc2lvbiBUaHJlYWQ8L3NtYWxsPlxcblxcdDwvbGVnZW5kPlxcblxcdDx1bCBjbGFzcz1cXFwiYXAtZGlzY3Vzc2lvbi10aHJlYWQgd2VsbCB3ZWxsLXNtXFxcIj5cXG5cXHRcXHQ8bGkgY2xhc3M9XFxcImRpc2N1c3Npb24taGVhZFxcXCIgbmctcmVwZWF0PVxcXCJwb3N0IGluICRjdHJsLmRpc2N1c3Npb25UaHJlYWQucG9zdHMgfCBmaWx0ZXI6e3BhcmVudElkOiAwfSB0cmFjayBieSBwb3N0LmlkXFxcIlxcblxcdFxcdFxcdHN0eWxlPVxcXCJib3JkZXItdG9wLXdpZHRoOiAxcHg7Ym9yZGVyLXRvcC1jb2xvcjogZ3JleVxcXCI+XFxuXFx0XFx0XFx0PGRpdiBuZy1pbmNsdWRlPVxcXCInYW5ndWxhci1wb2ludC1kaXNjdXNzaW9uLXRocmVhZC9hcC1kaXNjdXNzaW9uLXRocmVhZC1wb3N0Lmh0bWwnXFxcIiBuZy1pbml0PVxcXCJsZXZlbCA9IDBcXFwiPjwvZGl2PlxcblxcdFxcdDwvbGk+XFxuXFx0PC91bD5cXG48L2ZpZWxkc2V0PlxcblwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXAtZGlzY3Vzc2lvbi10aHJlYWQuaHRtbFxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb21lbnRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJtb21lbnRcIlxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0b2FzdHJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ0b2FzdHJcIlxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtEaXNjdXNzaW9uVGhyZWFkRmFjdG9yeX0gZnJvbSAnLi9hcERpc2N1c3Npb25UaHJlYWRGYWN0b3J5JztcbmltcG9ydCB7QVBEaXNjdXNzaW9uVGhyZWFkQ29tcG9uZW50fSBmcm9tICcuL2FwRGlzY3Vzc2lvblRocmVhZENvbXBvbmVudCc7XG5pbXBvcnQge0FuZ3VsYXJQb2ludE1vZHVsZX0gZnJvbSAnYW5ndWxhci1wb2ludCc7XG4vLyBpbXBvcnQge0FuZ3VsYXJQb2ludE1vZHVsZX0gZnJvbSAnLi4vYW5ndWxhci1wb2ludCc7XG5cbkFuZ3VsYXJQb2ludE1vZHVsZVxuICAgIC5zZXJ2aWNlKCdhcERpc2N1c3Npb25UaHJlYWRGYWN0b3J5JywgRGlzY3Vzc2lvblRocmVhZEZhY3RvcnkpXG4gICAgLmNvbXBvbmVudCgnYXBEaXNjdXNzaW9uVGhyZWFkJywgQVBEaXNjdXNzaW9uVGhyZWFkQ29tcG9uZW50KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL3NyYy9pbmRleC50cyJdLCJzb3VyY2VSb290IjoiIn0=