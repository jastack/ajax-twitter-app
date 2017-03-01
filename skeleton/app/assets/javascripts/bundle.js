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

$(() => {
  $('button.follow-toggle').each(function(index) {
    new FollowToggle($(this));
  });
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class FollowToggle {
  constructor($el) {
    console.log($el);
    // console.log($el.attr("data-user-id"));
    // console.log($($el).attr("data-initial-follow-state"));
    this.userId = $el.attr("data-user-id");
    this.followState = $el.attr("data-initial-follow-state");
    this.$el = $el;
    this.render();
    this.$el.on("click", this.handleClick.bind(this));
  }

  render() {
    if (this.followState === "false") {
      this.$el.html("Follow!");
    } else if (this.followState === "true") {
      this.$el.html("Unfollow!");
    }
  }

  handleClick(e) {
    e.preventDefault();
    if (this.followState === "false"){
      $.ajax({
        method: "POST",
        url: `/users/${this.userId}/follow`,
        dataType: 'json',
        success: () => {
          this.followState = "true";
          this.render();
        }
      });
    } else {
      $.ajax({
        method: "DELETE",
        url: `/users/${this.userId}/follow`,
        dataType: 'json',
        success: () => {
          this.followState = "false";
          this.render();
        }
      });


    }

  }
}

module.exports = FollowToggle;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map