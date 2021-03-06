/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__ (1);
const UsersSearch = __webpack_require__ (3);

$(() => {
  $('button.follow-toggle').each(function(index) {
    new FollowToggle($(this));
  });
  $('nav.users-search').each(function() {
    new UsersSearch($(this));
  });
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__ (2);

class FollowToggle {
  constructor($el) {
    // console.log($el);
    // console.log($el.attr("data-user-id"));
    // console.log($($el).attr("data-initial-follow-state"));
    this.userId = $el.attr("data-user-id");
    this.followState = $el.attr("data-initial-follow-state");
    this.$el = $el;
    this.render();
    this.$el.on("click", this.handleClick.bind(this));
  }

  render() {
    this.toggleDisable();
    if (this.followState === "false") {
      this.$el.html("Follow!");
    } else if (this.followState === "true") {
      this.$el.html("Unfollow!");
    } else if (this.followState === "following") {
      this.followState = "false";
    } else if (this.followState === "unfollowing") {
      this.followState = "true";
    }
  }

  toggleDisable() {
    if (this.followState === "false" || this.followState === "true") {
      this.$el.attr("disabled", false);
    } else if (this.followState === "unfollowing" || this.followState === "following") {
      this.$el.attr("disabled", true);
    }
  }

  handleClick(e) {
    e.preventDefault();
    if (this.followState === "false"){
      this.followState = "following";
      this.render();
      APIUtil.followUser(this.userId).then(() => this.toggleFollow());
    } else {
      this.followState = "unfollowing";
      this.render();
      APIUtil.unfollowUser(this.userId).then(() => this.toggleFollow());
    }

  }

  toggleFollow() {
    if (this.followState === "true"){
      this.followState = "false";
    } else {
      this.followState = "true";
    }
    this.render();
  }
}

module.exports = FollowToggle;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => (
    $.ajax({
      method: "POST",
      url: `/users/${id}/follow`,
      dataType: 'json',
    })
  ),

  unfollowUser: id => (
    $.ajax({
      method: "DELETE",
      url: `/users/${id}/follow`,
      dataType: 'json'
    })
  ),

  searchUsers: (queryVal, success) => (
    $.ajax({
      method: "GET",
      url: '/users/search',
      dataType: 'json',
      data: {
        query: queryVal
      },
      success: (res) => (res)
    })
  )
};


module.exports = APIUtil;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__ (2);

class UsersSearch {

  constructor ($el){
    this.$el = $el;
    this.input = $el.children().eq(0).val();
    this.ul = $el.children().eq(1);
    this.$el.on("keyup", this.handleInput.bind(this));
  }

  handleInput(e) {
    APIUtil.searchUsers(e.target.value, "hello").then((res) => this.renderResults(res));
  }

  renderResults(res) {
    $("ul.users").empty();
    res.forEach((user) => {
      console.log(user.followed);
      $("ul.users").append(`
        <li>
          <a href=/users/${user.id}>${user.username}</a>
          <button class="follow-toggle" data-user-id="${user.id}" data-initial-follow-state="${user.followed}"></button>
        </li>`);
    });
  }
}

module.exports = UsersSearch;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map