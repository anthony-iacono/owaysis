/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_oasis_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_oasis_jpg__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".booking-card {\n  background-color: rgba(199, 173, 143, 0.85);\n}\n\n.dashboard {\n  display: grid;\n  grid-template-columns: 300px 300px 300px 300px;\n}\n.dashboard section {\n  min-width: 300px;\n  padding: 10px;\n}\n\n.dashboard-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: rgba(109, 143, 182, 0.85);\n  color: white;\n}\n\n.date-selector {\n  width: 200px;\n  text-align: center;\n}\n\n.new-booking-form {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 10px, 10px, 0px, 10px;\n  min-height: 100px;\n}\n.new-booking-form section {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  min-width: auto;\n}\n\n.room-card, .booking-card {\n  margin: 10px;\n  padding: 10px;\n  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.8);\n}\n.room-card p, .booking-card p {\n  padding: 3px;\n}\n\n.room-card {\n  background-color: rgba(182, 148, 109, 0.85);\n  cursor: pointer;\n  border-radius: 10px;\n}\n\n.section-heading {\n  padding: 10px;\n  text-align: center;\n}\n\n.total-spent,\n.total-spent-heading {\n  text-align: center;\n}\n\n.type {\n  display: block;\n}\n\nheader {\n  display: flex;\n  justify-content: center;\n}\nheader span {\n  padding: 20px;\n  width: 300px;\n  font-family: \"Cinzel Decorative\", cursive;\n  font-size: 72px;\n  color: white;\n  background-color: rgba(109, 143, 182, 0.85);\n}\n\n.login-button {\n  margin: 10px;\n  padding: 5px;\n  color: white;\n  background-color: rgba(182, 148, 109, 0.85);\n  cursor: pointer;\n}\n\n.login-error-box p {\n  padding: 5px;\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  align-items: center;\n  height: auto;\n  padding: 20px;\n  width: 300px;\n  font-size: 18px;\n  text-align: center;\n  color: white;\n  background-color: rgba(109, 143, 182, 0.85);\n  border-radius: 0 0 10% 10%;\n}\n.login-form input {\n  margin: 10px;\n  text-align: center;\n}\n.login-form input:focus::placeholder {\n  color: white;\n}\n.login-form article {\n  padding: 10px;\n  text-align: center;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  align-items: center;\n  width: 90%;\n}\n\n.main-heading {\n  padding-top: 20px;\n  font-family: \"Cinzel Decorative\", cursive;\n  text-align: center;\n}\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  font-family: sans-serif;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100vh;\n  width: 100vw;\n  color: white;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n}\n\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/dashboard.scss","webpack://./src/css/base.scss","webpack://./src/css/mixins.scss","webpack://./src/css/variables.scss","webpack://./src/css/header.scss","webpack://./src/css/login.scss","webpack://./src/css/main.scss"],"names":[],"mappings":"AAGA;EACE,2CAAA;ACFF;;ADKA;EACE,aAAA;EACA,8CAAA;ACFF;ADIE;EACE,gBAAA;EACA,aAAA;ACFJ;;ADMA;EEhBE,aAAA;EACA,sBAAA;EACA,mBAAA;EFgBA,2CGlBK;EHmBL,YAAA;ACDF;;ADIA;EACE,YAAA;EACA,kBAAA;ACDF;;ADIA;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,8BAAA;EACA,iBAAA;ACDF;ADGE;EACE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,eAAA;ACDJ;;ADKA;EACE,YAAA;EACA,aAAA;EACA,0CGxCO;AFsCT;ADGE;EACE,YAAA;ACDJ;;ADKA;EACE,2CGnDI;EHoDJ,eAAA;EACA,mBAAA;ACFF;;ADKA;EACE,aAAA;EACA,kBAAA;ACFF;;ADKA;;EAEE,kBAAA;ACFF;;ADKA;EACE,cAAA;ACFF;;AGjEA;EACE,aAAA;EACA,uBAAA;AHoEF;AGlEE;EACE,aAAA;EACA,YAAA;EACA,yCAAA;EACA,eAAA;EACA,YDRI;ECSJ,2CDXG;AF+EP;;AI7EA;EACE,YAAA;EACA,YAAA;EACA,YFHM;EEIN,2CFLI;EEMJ,eAAA;AJgFF;;AI5EE;EACE,YAAA;AJ+EJ;;AI3EA;EHhBE,aAAA;EACA,sBAAA;EACA,mBAAA;EGgBA,mBAAA;EACA,YAAA;EACA,aAAA;EACA,YAAA;EACA,eAAA;EACA,kBAAA;EACA,YFtBM;EEuBN,2CFzBK;EE0BL,0BAAA;AJgFF;AI9EE;EACE,YAAA;EACA,kBAAA;AJgFJ;AI9EI;EACE,YF/BE;AF+GR;AI5EE;EACE,aAAA;EACA,kBAAA;AJ8EJ;;AKnHA;EJFE,aAAA;EACA,sBAAA;EACA,mBAAA;EIEA,mBAAA;EACA,UAAA;ALwHF;;AKrHA;EACE,iBAAA;EACA,yCHFa;EGGb,kBAAA;ALwHF;;AA7HA;EACE,sBAAA;EACA,SAAA;EACA,uBAAA;AAgIF;;AA7HA;ECZE,aAAA;EACA,sBAAA;EACA,mBAAA;EDYA,aAAA;EACA,YAAA;EACA,YEdM;EFeN,yDAAA;EACA,sBAAA;AAkIF;;AA/HA;EACE,aAAA;AAkIF","sourcesContent":["@use 'variables' as *;\n@use 'mixins' as *;\n\n.booking-card {\n  background-color: lighten($tan, 10%);\n}\n\n.dashboard {\n  display: grid;\n  grid-template-columns: 300px 300px 300px 300px;\n\n  section {\n    min-width: 300px;\n    padding: 10px;\n  }\n}\n\n.dashboard-container {\n  @include columnCentered();\n  background-color: $blue;\n  color: white;\n}\n\n.date-selector {\n  width: 200px;\n  text-align: center;\n}\n\n.new-booking-form {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 10px, 10px, 0px, 10px;\n  min-height: 100px;\n\n  section {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    min-width: auto;\n  }\n}\n\n.room-card, .booking-card {\n  margin: 10px;\n  padding: 10px;\n  box-shadow: $shadow;\n  p {\n    padding: 3px;\n  }\n}\n\n.room-card {\n  background-color: $tan;\n  cursor: pointer;\n  border-radius: 10px;\n}\n\n.section-heading {\n  padding: 10px;\n  text-align: center;\n}\n\n.total-spent,\n.total-spent-heading {\n  text-align: center;\n}\n\n.type {\n  display: block;\n}\n","@use 'dashboard' as *;\n@use 'header' as *;\n@use 'login' as *;\n@use 'main' as *;\n@use 'mixins' as *;\n@use 'variables' as *;\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  font-family: sans-serif;\n}\n\nbody {\n  @include columnCentered();\n  height: 100vh;\n  width: 100vw;\n  color: $white;\n  background-image: url(\"../images/oasis.jpg\");\n  background-size: cover;\n}\n\n.hidden {\n  display: none;\n}\n","@mixin columnCentered() {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n","// Colors\n$blue: hsla(212, 33%, 57%, 0.85);\n$tan: complement($blue);\n$white: hsla(0, 0%, 100%, 1);\n\n// Effects\n$shadow: 3px 3px 3px rgb(0 0 0 / 0.8);\n\n// Fonts\n$primary-font: 'Cinzel Decorative', cursive;\n","@use 'variables' as *;\n\nheader {\n  display: flex;\n  justify-content: center;\n\n  span {\n    padding: 20px;\n    width: 300px;\n    font-family: $primary-font;\n    font-size: 72px;\n    color: $white;\n    background-color: $blue;\n  }\n}\n","@use 'variables' as *;\n@use 'mixins' as *;\n\n.login-button {\n  margin: 10px;\n  padding: 5px;\n  color: $white;\n  background-color: $tan;\n  cursor: pointer;\n}\n\n.login-error-box {\n  p {\n    padding: 5px;\n  }\n}\n\n.login-form {\n  @include columnCentered();\n  align-items: center;\n  height: auto;\n  padding: 20px;\n  width: 300px;\n  font-size: 18px;\n  text-align: center;\n  color: $white;\n  background-color: $blue;\n  border-radius: 0 0 10% 10%;\n\n  input {\n    margin: 10px;\n    text-align: center;\n\n    &:focus::placeholder {\n      color: $white;\n    }\n  }\n\n  article {\n    padding: 10px;\n    text-align: center;\n  }\n}\n","@use 'variables' as *;\n@use 'mixins' as *;\n\nmain {\n  @include columnCentered();\n  align-items: center;\n  width: 90%;\n}\n\n.main-heading {\n  padding-top: 20px;\n  font-family: $primary-font;\n  text-align: center;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/oasis.jpg");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const api = {
  getAllCustomers() {
    return fetch('http://localhost:3001/api/v1/customers')
      .then(response => {
        this.checkHttpError(response);
        return response.json();
      })
      .then(data => data.customers)
      .catch(error => console.error(error));
  },

  getCustomer(id) {
    return fetch(`http://localhost:3001/api/v1/customers/${id}`)
      .then(response => {
        this.checkHttpError(response);
        return response.json();
      })
      .then(customer => customer)
      .catch(error => console.error(error));
  },

  getAllRooms() {
    return fetch('http://localhost:3001/api/v1/rooms')
      .then(response => {
        this.checkHttpError(response);
        return response.json();
      })
      .then(data => data.rooms)
      .catch(error => console.error(error));
  },

  getAllBookings() {
    return fetch('http://localhost:3001/api/v1/bookings')
      .then(response => {
        this.checkHttpError(response);
        return response.json();
      })
      .then(data => data.bookings)
      .catch(error => console.error(error));
  },

  addBooking(userID, date, roomNumber) {  
    return fetch('http://localhost:3001/api/v1/bookings', {
      method: 'POST',
      body: JSON.stringify({
        userID: userID,
        date: date,
        roomNumber: roomNumber
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        this.checkHttpError(response);
        return response.json();
      })
      .then(data => {
        console.log(data.message);
        return data.newBooking;
      })
      .catch(error => console.error(error));
  },

  deleteBooking(id) {
    return fetch(`http://localhost:3001/api/v1/bookings/${id}`, {
      method: 'DELETE',
      headears: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        this.checkHttpError(response);
        return response.json();
      })
      .then(data => console.log(data.message))
      .catch(error => console.error(error));
  },

  checkHttpError(response) {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (api);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const dom = {

  displayApology(section) {
    this.show(section);
    section.innerHTML = `
      <p>Sorry, but there are no rooms available on this date. Please try another date.</p>
    `;
  },

  fillHeading(text, heading) {
    heading.innerText = `${text}`;
  },

  fillRooms(availableRooms, section) {
    section.innerHTML = '';
    availableRooms.forEach(availableRoom => {
      section.innerHTML += `
        <article class="room-card js-room-card" id='${availableRoom.number}'>
          <p>Type: ${availableRoom.roomType}</p>
          <p>Bidet: ${availableRoom.bidet}</p>
          <p>Bed Size: ${availableRoom.bedSize}</p>
          <p>No. of Beds: ${availableRoom.numBeds}</p>
          <p>Cost per Night: $${availableRoom.costPerNight}</p>
        </article>
      `
    })
  },

  fillBookings(user, allRooms, selectedDate, currentSection, pastSection) {
    currentSection.innerHTML = '';
    pastSection.innerHTML = '';
    user.bookings.forEach(booking => {
      const room = allRooms.find(room => room.number === booking.roomNumber);
      let section = pastSection;
      if (Date.parse(booking.date) >= Date.parse(selectedDate)) {
        section = currentSection;
      }

      section.innerHTML += `
      <article class="booking-card" id="${booking.id}">
        <p>BookingID: ${booking.id}</p>
        <p>Date: ${booking.date}</p>
        <p>Type: ${room.roomType}</p>
        <p>Bidet: ${room.bidet}</p>
        <p>Bed Size: ${room.bedSize}</p>
        <p>No. of Beds: ${room.numBeds}</p>
        <p>Cost per Night: $${room.costPerNight}</p>
      </article>
      `;
    })
  },

  fillTotalSpent(user, element) {
    element.innerText = `$${user.totalSpent}`;
  },

  fillTypes(availableTypes, section) {
    section.innerHTML = '';
    availableTypes.forEach(availableType => {
      section.innerHTML += `
      <label class="type">
      <input type="checkbox" value="${availableType}"> ${availableType}
      </label>
      `
    })
  },

  hide(...elements) {
    elements.forEach(element => element.classList.add('hidden'));
  },

  show(...elements) {
    elements.forEach(element => element.classList.remove('hidden'));
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Customer {
  constructor(id) {
    this.id = id;
    this.bookings;
    this.totalSpent;
  }

  getBookings(allBookings) {
    this.bookings = allBookings.filter(booking => booking.userID === this.id);
  }

  getTotalSpent(allRooms) {
    const totalSpent = this.bookings.reduce((total, booking) => {
      const matchingRoom = allRooms.find(room => {
        return room.number === booking.roomNumber;
      });
      total += matchingRoom.costPerNight;
      return total;
    }, 0);
    this.totalSpent = (Math.round(totalSpent * 100) / 100).toLocaleString();
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Customer);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Hotel {
  constructor(customers, rooms, bookings) {
    this.customers = customers;
    this.rooms = rooms;
    this.bookings = bookings;
    this.availableRooms;
    this.types;
    this.selectedTypes = [];
    this.filteredRooms;
  }

  addType(type) {
    this.selectedTypes.push(type);
  }

  getAvailableRooms(selectedDate) {
    const unavailableRoomNumbers = this.bookings.reduce((acc, booking) => {
      const bookingDate = booking.date.replace(/\//g, '-');
      if (bookingDate === selectedDate) {
        acc.push(booking.roomNumber);
      }

      return acc;
    }, [])
    this.availableRooms = this.rooms.filter(room => {
      return !unavailableRoomNumbers.includes(room.number);
    })
  }

  getAvailableTypes() {
    this.types = this.availableRooms.reduce((acc, room) => {
      if (!acc.includes(room.roomType)) {
        acc.push(room.roomType);
      }

      return acc;
    }, []);
  }

  getFilteredRooms() {
    if (!this.selectedTypes.length) {
      return this.filteredRooms = this.availableRooms;
    }

    this.filteredRooms = this.availableRooms.filter(availableRoom => {
      return this.selectedTypes.includes(availableRoom.roomType);
    })
  }

  removeType(type) {
    this.selectedTypes = this.selectedTypes.filter(selectedType => {
      return selectedType !== type;
    })
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hotel);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _classes_Customer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _classes_Hotel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
// Imports /////////////////////////////////////////////////////////////////////









// Variables ///////////////////////////////////////////////////////////////////

const currentSection = document.querySelector('.js-current-bookings');
const dashboard = document.querySelector('.js-dashboard');
const dateSelector = document.querySelector('.js-date-selector');
const defaultDate = document.querySelector('input[type="date"]');
const heading = document.querySelector('.js-heading');
const loginError = document.querySelector('.js-login-error');
const loginForm = document.querySelector('.js-login-form');
const password = document.querySelector('.js-password');
const pastSection = document.querySelector('.js-past-bookings');
const roomsSection = document.querySelector('.js-rooms-section');
const totalSpentBox = document.querySelector('.js-total-spent');
const typesSection = document.querySelector('.js-types-section');
const username = document.querySelector('.js-username');

let hotel;
let customer;

// On Load /////////////////////////////////////////////////////////////////////

const loadData = () => {
  return Promise.all([_api__WEBPACK_IMPORTED_MODULE_1__.default.getAllCustomers(), _api__WEBPACK_IMPORTED_MODULE_1__.default.getAllRooms(), _api__WEBPACK_IMPORTED_MODULE_1__.default.getAllBookings()])
    .then(data => hotel = new _classes_Hotel__WEBPACK_IMPORTED_MODULE_4__.default(data[0], data[1], data[2]));
}

window.onload = loadData();

// Event Listeners /////////////////////////////////////////////////////////////

dateSelector.addEventListener('change', displayRooms);
loginForm.addEventListener('submit', logIn);
roomsSection.addEventListener('click', confirmBooking);
typesSection.addEventListener('change', displayFilteredRooms);

// Functions ///////////////////////////////////////////////////////////////////

function convertToLocal(date) {
 return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
}

function confirmBooking() {
  if (window.confirm('Make this booking?')) {
    const date = dateSelector.value.replace(/-/g, '\/');
    const roomNumber = parseInt(event.target.parentNode.id);
    _api__WEBPACK_IMPORTED_MODULE_1__.default.addBooking(customer.id, date, roomNumber)
      .then(() => loadData())
      .then(() => displayDashboard());
  }
}

function displayDashboard() {
  customer.getBookings(hotel.bookings);
  customer.getTotalSpent(hotel.rooms);
  _dom__WEBPACK_IMPORTED_MODULE_2__.default.show(dashboard, heading);
  _dom__WEBPACK_IMPORTED_MODULE_2__.default.hide(loginForm);
  _dom__WEBPACK_IMPORTED_MODULE_2__.default.fillHeading('Bookings', heading);
  _dom__WEBPACK_IMPORTED_MODULE_2__.default.fillTotalSpent(customer, totalSpentBox);
  setDate();
  hotel.getAvailableRooms(dateSelector.value);
  if (!hotel.availableRooms.length) {
    _dom__WEBPACK_IMPORTED_MODULE_2__.default.displayApology(roomsSection);
  } else {
    _dom__WEBPACK_IMPORTED_MODULE_2__.default.fillRooms(hotel.availableRooms, roomsSection);
  }

  hotel.getAvailableTypes();
  _dom__WEBPACK_IMPORTED_MODULE_2__.default.fillTypes(hotel.types, typesSection);
  _dom__WEBPACK_IMPORTED_MODULE_2__.default.fillBookings(customer, hotel.rooms, dateSelector.value, currentSection, pastSection);
}

function displayFilteredRooms() {
  const checkbox = event.target;
  if (checkbox.checked) {
    hotel.addType(checkbox.value);
  } else if (!checkbox.checked) {
    hotel.removeType(checkbox.value);
  }
  hotel.getFilteredRooms();
  if (!hotel.filteredRooms.length) {
    return _dom__WEBPACK_IMPORTED_MODULE_2__.default.fillRooms(hotel.availableRooms, roomsSection);
  }

  _dom__WEBPACK_IMPORTED_MODULE_2__.default.fillRooms(hotel.filteredRooms, roomsSection);
}

function displayRooms() {
  hotel.getAvailableRooms(dateSelector.value);
  hotel.getFilteredRooms();
  if (!hotel.availableRooms.length) {
    return _dom__WEBPACK_IMPORTED_MODULE_2__.default.displayApology(roomsSection);
  }

  _dom__WEBPACK_IMPORTED_MODULE_2__.default.fillRooms(hotel.filteredRooms, roomsSection);
}

function getTodaysDate() {
  const dateUTC = new Date();
  const dateLocal = convertToLocal(dateUTC);
  return dateLocal.toISOString().slice(0, 10);
}

function logIn() {
  event.preventDefault();
  const isValidUsername = username.value.slice(0, 8) === 'customer';
  const isValidPassword = password.value === 'overlook2021';
  const matchingCustomer = hotel.customers.find(customer => {
    return customer.id === parseInt(username.value.slice(8));
  })
  if (isValidUsername && isValidPassword && matchingCustomer) {
    customer = new _classes_Customer__WEBPACK_IMPORTED_MODULE_3__.default(matchingCustomer.id);
    return displayDashboard();
  }

  _dom__WEBPACK_IMPORTED_MODULE_2__.default.show(loginError);
}

function setDate() {
  const nextYear = parseInt(getTodaysDate().substring(0, 4)) + 1;
  defaultDate.value = getTodaysDate();
  dateSelector.setAttribute('min', getTodaysDate());
  dateSelector.setAttribute('max', nextYear + getTodaysDate().slice(4));
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map