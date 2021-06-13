// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"fkXL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateID = void 0;

var generateID = function generateID() {
  return "_" + Math.random().toString(36).substr(2, 9);
};

exports.generateID = generateID;
},{}],"C3zP":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("../utils/utils");

var Todo = /*#__PURE__*/function () {
  function Todo(category, title, description) {
    _classCallCheck(this, Todo);

    this.category = category;
    this.title = title;
    this.description = description;
    /**
     * Represents a single Todo
     * @param title {string} - title of the todo
     * @param description {string} - description of the todo
     * @param category {string} - category of the todo
     */

    this.id = utils_1.generateID();
    this.dateOfCreation = new Date();
    this.title = title;
    this.description = description;
    this.category = category;
  }

  _createClass(Todo, [{
    key: "changeTodoTitle",
    value: function changeTodoTitle(newTitle) {
      this.title = newTitle;
    }
  }, {
    key: "changeTodoDescription",
    value: function changeTodoDescription(newDescription) {
      this.description = newDescription;
    }
  }]);

  return Todo;
}();

exports.default = Todo;
},{"../utils/utils":"fkXL"}],"auz1":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("../utils/utils");

var Bucket = /*#__PURE__*/function () {
  function Bucket(title) {
    var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Bucket);

    this.title = title;
    this.id = utils_1.generateID();
    this.items = [];
    this.title = title;
    this.items = items;
  }

  _createClass(Bucket, [{
    key: "addItemToBucket",
    value: function addItemToBucket(todo) {
      var toEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (toEnd) this.items = [].concat(_toConsumableArray(this.items), [todo]);
      if (!toEnd) this.items = [todo].concat(_toConsumableArray(this.items));
    }
  }, {
    key: "removeItemFromBucket",
    value: function removeItemFromBucket(id) {
      this.items = this.items.filter(function (todo) {
        return todo.id !== id;
      });
    }
  }, {
    key: "changeBucketTitle",
    value: function changeBucketTitle(newTitle) {
      this.title = newTitle;
    }
  }]);

  return Bucket;
}();

exports.default = Bucket;
},{"../utils/utils":"fkXL"}],"Cy5K":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

var _Model_state;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var todo_1 = __importDefault(require("../entities/todo"));

var bucket_1 = __importDefault(require("../entities/bucket"));

var Model = /*#__PURE__*/function () {
  function Model() {
    _classCallCheck(this, Model);

    _Model_state.set(this, {
      buckets: [] //replace with HashMap

    });
  }

  _createClass(Model, [{
    key: "addBucket",
    value: function addBucket() {
      var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "New Bucket";
      var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      /**
       * Adds a bucket to the model
       * @param title {string} - title of the container
       * @param items {Todo[]} - array of Todo items
       */
      var newBucket = new bucket_1.default(title, items);
      __classPrivateFieldGet(this, _Model_state, "f").buckets = [].concat(_toConsumableArray(__classPrivateFieldGet(this, _Model_state, "f").buckets), [newBucket]);
      this.setLocalStorageData();
      return newBucket;
    }
  }, {
    key: "buckets",
    get: function get() {
      return __classPrivateFieldGet(this, _Model_state, "f").buckets;
    }
  }, {
    key: "_findBucket",
    value: function _findBucket(bucketID) {
      return __classPrivateFieldGet(this, _Model_state, "f").buckets.find(function (bucket) {
        return bucket.id === bucketID;
      });
    }
  }, {
    key: "_findTodo",
    value: function _findTodo(bucket, todoID) {
      return bucket.items.find(function (todo) {
        return todo.id === todoID;
      });
    }
  }, {
    key: "setLocalStorageData",
    value: function setLocalStorageData() {
      localStorage.setItem("buckets", JSON.stringify(this.buckets));
    }
  }, {
    key: "getLocalStorageData",
    value: function getLocalStorageData() {
      var _this = this;

      var buckets = JSON.parse(localStorage.getItem("buckets"));

      if (!buckets) {
        //add first bucket if there is no data in localStorage
        this.addBucket();
      } else {
        //initialize the Bucket and Todo Objects
        buckets.forEach(function (bucket) {
          return _this.addBucket(bucket.title, bucket.items.map(function (todo) {
            return new todo_1.default(bucket.title, todo.title, todo.description);
          }));
        });
      }
    }
  }, {
    key: "addTodoToBucket",
    value: function addTodoToBucket(bucketID) {
      var todoTitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "New Todo";
      var todoDescription = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Todo Description";

      var targetBucket = this._findBucket(bucketID);

      var newTodo = new todo_1.default(targetBucket.title, todoTitle, todoDescription);
      targetBucket.addItemToBucket(newTodo);
      this.setLocalStorageData();
      return newTodo;
    }
  }, {
    key: "removeTodoFromBucket",
    value: function removeTodoFromBucket(bucketID, todoID) {
      var targetBucket = this._findBucket(bucketID);

      targetBucket.removeItemFromBucket(todoID);
      this.setLocalStorageData();
    }
  }, {
    key: "changeBucketTitle",
    value: function changeBucketTitle(bucketID, newTitle) {
      var targetBucket = this._findBucket(bucketID);

      targetBucket.changeBucketTitle(newTitle);
      this.setLocalStorageData();
    }
  }, {
    key: "changeTodoTitle",
    value: function changeTodoTitle(bucketID, todoID, newTitle) {
      var targetBucket = this._findBucket(bucketID);

      var targetTodo = this._findTodo(targetBucket, todoID);

      targetTodo.changeTodoTitle(newTitle);
      this.setLocalStorageData();
    }
  }, {
    key: "changeTodoDescription",
    value: function changeTodoDescription(bucketID, todoID, newDescription) {
      var targetBucket = this._findBucket(bucketID);

      var targetTodo = this._findTodo(targetBucket, todoID);

      targetTodo.changeTodoDescription(newDescription);
      this.setLocalStorageData();
    }
  }, {
    key: "moveTodoToAnotherBucket",
    value: function moveTodoToAnotherBucket(bucketID, todoID, targetBucketID) {
      var originBucket = this._findBucket(bucketID);

      var todo = originBucket.items.find(function (todo) {
        return todo.id === todoID;
      });

      var targetBucket = this._findBucket(targetBucketID);

      originBucket.removeItemFromBucket(todo.id);
      targetBucket.addItemToBucket(todo, true);
      this.setLocalStorageData();
    }
  }]);

  return Model;
}();

exports.default = Model;
_Model_state = new WeakMap();
},{"../entities/todo":"C3zP","../entities/bucket":"auz1"}],"Yav5":[function(require,module,exports) {
module.exports = "sprites.31745931.svg";
},{}],"EaOZ":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var sprites_svg_1 = __importDefault(require("../../../img/sprites.svg"));

var TodoView = /*#__PURE__*/function () {
  function TodoView() {
    _classCallCheck(this, TodoView);
  }

  _createClass(TodoView, [{
    key: "render",
    value: function render(todoObj) {
      /**
       * renders todo object to the dom
       * @param todoObj {Todo} - todo - Object created with Todo class
       */
      if (!todoObj) return;

      var markup = this._generateMarkup(todoObj);

      return markup;
    }
  }, {
    key: "_generateMarkup",
    value: function _generateMarkup(todoObj) {
      /**
       * generates the markup to render the todo
       * @param todoObj {Todo} - todo - Object created with Todo class
       */
      var id = todoObj.id,
          title = todoObj.title,
          description = todoObj.description;
      return "\n    <article class=\"card-item\" data-id=".concat(id, " draggable=\"true\">\n        <div class=\"card-item__header\">\n            <h3 class=\"card-item__title\" contenteditable=\"true\">").concat(title, "</h3>\n            <div class=\"card-item__buttons\">\n                <button type=\"submit\" data-tag=\"delete\" class=\"btn-delete\">\n                    <svg>\n                        <use xlink:href=\"").concat(sprites_svg_1.default, "#icon-bin\"></use>\n                    </svg>\n                </button>\n            </div>\n        </div>\n        <p class=\"card-item__description\" contenteditable=\"true\">").concat(description, "</p>\n    </article>");
    }
  }]);

  return TodoView;
}();

exports.default = TodoView;
},{"../../../img/sprites.svg":"Yav5"}],"mrfx":[function(require,module,exports) {
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

var _BucketView_parent, _BucketView_todoView;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var todoView_1 = __importDefault(require("./todoView"));

var sprites_svg_1 = __importDefault(require("../../../img/sprites.svg"));

var BucketView = /*#__PURE__*/function () {
  function BucketView() {
    _classCallCheck(this, BucketView);

    _BucketView_parent.set(this, document.querySelector(".container-grid"));

    _BucketView_todoView.set(this, new todoView_1.default());
  }

  _createClass(BucketView, [{
    key: "render",
    value: function render(bucketObj) {
      /**
       * renders bucket object to the dom
       * @param bucketObj {Bucket} - bucketObj
       */
      if (!bucketObj) return;

      var markup = this._generateMarkup(bucketObj);

      __classPrivateFieldGet(this, _BucketView_parent, "f").insertAdjacentHTML("beforeend", markup);
    }
  }, {
    key: "_generateMarkup",
    value: function _generateMarkup(bucketObj) {
      var _this = this;

      /**
       * generates the markup to render the bucket
       * @param bucketObj {Bucket} - bucketObj
       */
      var id = bucketObj.id,
          title = bucketObj.title,
          items = bucketObj.items;
      return "\n    <section class=\"task-container\" data-id=".concat(id, " >\n      <header class=\"task-container__header\">\n          <div class=\"container-info\">\n              <h2 class=\"task-headline\" contenteditable=\"true\">").concat(title, "</h2>\n              <div class=\"task-count\">").concat(items.length, "</div>\n          </div>\n          <button class=\"btn-add\">+</button>\n      </header>\n      <div class=\"task-container__cards\">\n      ").concat(items.length > 0 ? items.map(function (todo) {
        return __classPrivateFieldGet(_this, _BucketView_todoView, "f").render(todo);
      }).join("") : "<p>Everything done here!</p>", "\n      </div>       \n    </section>");
    }
  }, {
    key: "clear",
    value: function clear() {
      /**
       * clears view
       */
      __classPrivateFieldGet(this, _BucketView_parent, "f").innerHTML = "";
    }
  }, {
    key: "renderAddBucketButton",
    value: function renderAddBucketButton() {
      var markup = "\n    <button class=\"container-grid__add-container\">\n        <svg>\n            <use xlink:href=\"".concat(sprites_svg_1.default, "#icon-plus\"></use>\n        </svg>\n        <p>Add Task - Bucket</p>\n    </button>");

      __classPrivateFieldGet(this, _BucketView_parent, "f").insertAdjacentHTML("beforeend", markup);
    }
  }, {
    key: "addBucketClickHandler",
    value: function addBucketClickHandler(handler) {
      /**
       * Eventlistener for click on add Bucket button
       * @param handler {Function} - Function which responds to the Event
       */
      __classPrivateFieldGet(this, _BucketView_parent, "f").addEventListener("click", function (e) {
        e.preventDefault();
        var target = e.target;
        if (target.classList[0] !== "container-grid__add-container") return;
        e.preventDefault();
        handler();
      });
    }
  }, {
    key: "addTodoClickHandler",
    value: function addTodoClickHandler(handler) {
      /**
       * Eventlistener for click on add Todo button
       * @param handler {Function} - Function which responds to the Event
       */
      __classPrivateFieldGet(this, _BucketView_parent, "f").addEventListener("click", function (e) {
        e.preventDefault();
        var target = e.target;
        if (target.classList[0] !== "btn-add") return;
        var bucket = target.closest(".task-container");
        var bucketID = bucket.dataset.id;
        handler(bucketID);
      });
    }
  }, {
    key: "addTodoClickDeleteHandler",
    value: function addTodoClickDeleteHandler(handler) {
      /**
       * Eventlistener for click on delete todo button
       * @param handler {Function} - Function which responds to the Event
       */
      __classPrivateFieldGet(this, _BucketView_parent, "f").addEventListener("click", function (e) {
        e.preventDefault();
        var target = e.target;
        var closestBtn = target.closest(".btn-delete");
        if (!closestBtn) return;
        var bucket = target.closest(".task-container");
        var bucketID = bucket.dataset.id;
        var todo = target.closest(".card-item");
        var todoID = todo.dataset.id;
        handler(bucketID, todoID);
      });
    }
  }, {
    key: "addBucketTitleChangeHandler",
    value: function addBucketTitleChangeHandler(handler) {
      /**
       * Eventlistener for input event for bucket title change
       * @param handler {Function} - Function which responds to the Event
       */
      __classPrivateFieldGet(this, _BucketView_parent, "f").addEventListener("input", function (e) {
        var target = e.target;
        if (target.classList[0] !== "task-headline") return;
        var newTitle = target.innerText;
        var bucket = target.closest(".task-container");
        var bucketID = bucket.dataset.id;
        handler(bucketID, newTitle);
      });
    }
  }, {
    key: "_todoInfoChangeHandler",
    value: function _todoInfoChangeHandler(e, handler) {
      /**
       * Function to process todo change
       * @param e {Event} - fired Event
       * @param handler {Function} - Function which responds to the Event
       */
      var target = e.target;
      var newText = target.innerText;
      var bucket = target.closest(".task-container");
      var bucketID = bucket.dataset.id;
      var todo = target.closest(".card-item");
      var todoID = todo.dataset.id;
      handler(bucketID, todoID, newText);
    }
  }, {
    key: "addTodoTitleChangeHandler",
    value: function addTodoTitleChangeHandler(handler) {
      var _this2 = this;

      __classPrivateFieldGet(this, _BucketView_parent, "f").addEventListener("input", function (e) {
        var target = e.target;
        if (target.classList[0] !== "card-item__title") return;

        _this2._todoInfoChangeHandler(e, handler);
      });
    }
  }, {
    key: "addTodoDescriptionChangeHandler",
    value: function addTodoDescriptionChangeHandler(handler) {
      var _this3 = this;

      __classPrivateFieldGet(this, _BucketView_parent, "f").addEventListener("input", function (e) {
        var target = e.target;
        if (target.classList[0] !== "card-item__description") return;

        _this3._todoInfoChangeHandler(e, handler);
      });
    } // Drag and Drop Eventhandler

  }, {
    key: "addDragDropHandler",
    value: function addDragDropHandler(handler) {
      this._addDragStartHandler();

      this._addDragEndHandler();

      this._addDragOverHandler();

      this._addDragEnterHandler();

      this._addDragLeaveHandler();

      this._addDropHandler(handler);
    }
  }, {
    key: "_addDragStartHandler",
    value: function _addDragStartHandler() {
      /**
       * Connecting Data to the drag event at start
       */
      __classPrivateFieldGet(this, _BucketView_parent, "f").addEventListener("dragstart", function (e) {
        var todo = e.target;
        var todoID = todo.dataset.id;
        var bucket = todo.closest(".task-container");
        var bucketID = bucket.dataset.id;
        todo.style.opacity = "0.3";
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", "".concat(bucketID, ", ").concat(todoID));
      }, false);
    }
  }, {
    key: "_addDragEndHandler",
    value: function _addDragEndHandler() {
      /**
       * Restore old styles
       */
      __classPrivateFieldGet(this, _BucketView_parent, "f").addEventListener("dragend", function (e) {
        var todo = e.target;
        todo.style.opacity = "1";
      });
    }
  }, {
    key: "_addDragOverHandler",
    value: function _addDragOverHandler() {
      /**
       * prevent Default signals possible dropareas
       */
      __classPrivateFieldGet(this, _BucketView_parent, "f").addEventListener("dragover", function (e) {
        var target = e.target;

        if (target.classList[0] === "task-container__cards") {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
        }
      });
    }
  }, {
    key: "_addDragEnterHandler",
    value: function _addDragEnterHandler() {
      /**
       * prevent Default signals possible dropareas
       */
      __classPrivateFieldGet(this, _BucketView_parent, "f").addEventListener("dragenter", function (e) {
        var target = e.target;

        if (target.classList[0] === "task-container__cards") {
          e.preventDefault();
          target.classList.add("task-container__cards-entered");
        }
      });
    }
  }, {
    key: "_addDragLeaveHandler",
    value: function _addDragLeaveHandler() {
      /**
       * restore old styles
       */
      __classPrivateFieldGet(this, _BucketView_parent, "f").addEventListener("dragleave", function (e) {
        var target = e.target;

        if (target.classList[0] === "task-container__cards") {
          e.preventDefault();
          target.classList.remove("task-container__cards-entered");
        }
      });
    }
  }, {
    key: "_addDropHandler",
    value: function _addDropHandler(handler) {
      /**
       * manage drop event
       * @param handler {Function} - Function which responds to the Event
       */
      __classPrivateFieldGet(this, _BucketView_parent, "f").addEventListener("drop", function (e) {
        e.preventDefault();
        var target = e.target;
        var targetBucket = target.closest(".task-container");
        var targetBucketID = targetBucket.dataset.id;

        var _e$dataTransfer$getDa = e.dataTransfer.getData("text/plain").split(",").map(function (item) {
          return item.replace(" ", "");
        }),
            _e$dataTransfer$getDa2 = _slicedToArray(_e$dataTransfer$getDa, 2),
            bucketID = _e$dataTransfer$getDa2[0],
            todoID = _e$dataTransfer$getDa2[1];

        target.classList.remove("task-container__cards-entered");
        handler(bucketID, todoID, targetBucketID);
      });
    }
  }]);

  return BucketView;
}();

exports.default = BucketView;
_BucketView_parent = new WeakMap(), _BucketView_todoView = new WeakMap();
},{"./todoView":"EaOZ","../../../img/sprites.svg":"Yav5"}],"jVKl":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

var _Controller_model, _Controller_view;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var model_1 = __importDefault(require("./model"));

var bucketView_1 = __importDefault(require("./views/bucketView"));

var Controller = /*#__PURE__*/function () {
  function Controller() {
    _classCallCheck(this, Controller);

    _Controller_model.set(this, new model_1.default());

    _Controller_view.set(this, new bucketView_1.default());
  }

  _createClass(Controller, [{
    key: "init",
    value: function init() {
      //check for, load, render stored data
      __classPrivateFieldGet(this, _Controller_model, "f").getLocalStorageData();

      this._renderBuckets(); //subscribe to events


      __classPrivateFieldGet(this, _Controller_view, "f").addBucketClickHandler(this.addNewBucket.bind(this));

      __classPrivateFieldGet(this, _Controller_view, "f").addTodoClickHandler(this.addNewTodoToBucket.bind(this));

      __classPrivateFieldGet(this, _Controller_view, "f").addTodoClickDeleteHandler(this.removeTodoFromBucket.bind(this));

      __classPrivateFieldGet(this, _Controller_view, "f").addBucketTitleChangeHandler(this.handleBucketTitleChange.bind(this));

      __classPrivateFieldGet(this, _Controller_view, "f").addTodoTitleChangeHandler(this.handleTodoTitleChange.bind(this));

      __classPrivateFieldGet(this, _Controller_view, "f").addTodoDescriptionChangeHandler(this.handleTodoDescriptionChange.bind(this));

      __classPrivateFieldGet(this, _Controller_view, "f").addDragDropHandler(this.handleDragAndDrop.bind(this));
    }
  }, {
    key: "_renderBuckets",
    value: function _renderBuckets() {
      var _this = this;

      __classPrivateFieldGet(this, _Controller_view, "f").clear();

      __classPrivateFieldGet(this, _Controller_model, "f").buckets.forEach(function (bucket) {
        return __classPrivateFieldGet(_this, _Controller_view, "f").render(bucket);
      });

      __classPrivateFieldGet(this, _Controller_view, "f").renderAddBucketButton();
    }
  }, {
    key: "addNewBucket",
    value: function addNewBucket() {
      var newBucket = __classPrivateFieldGet(this, _Controller_model, "f").addBucket();

      this._renderBuckets(); // this.#view.render(newBucket);

    }
  }, {
    key: "addNewTodoToBucket",
    value: function addNewTodoToBucket(bucketID) {
      __classPrivateFieldGet(this, _Controller_model, "f").addTodoToBucket(bucketID);

      this._renderBuckets();
    }
  }, {
    key: "removeTodoFromBucket",
    value: function removeTodoFromBucket(bucketID, todoID) {
      __classPrivateFieldGet(this, _Controller_model, "f").removeTodoFromBucket(bucketID, todoID);

      this._renderBuckets();
    }
  }, {
    key: "handleBucketTitleChange",
    value: function handleBucketTitleChange(bucketID, newTitle) {
      __classPrivateFieldGet(this, _Controller_model, "f").changeBucketTitle(bucketID, newTitle);
    }
  }, {
    key: "handleTodoTitleChange",
    value: function handleTodoTitleChange(bucketID, todoID, newTitle) {
      __classPrivateFieldGet(this, _Controller_model, "f").changeTodoTitle(bucketID, todoID, newTitle);
    }
  }, {
    key: "handleTodoDescriptionChange",
    value: function handleTodoDescriptionChange(bucketID, todoID, newDescription) {
      __classPrivateFieldGet(this, _Controller_model, "f").changeTodoDescription(bucketID, todoID, newDescription);
    }
  }, {
    key: "handleDragAndDrop",
    value: function handleDragAndDrop(bucketID, todoID, targetBucketID) {
      if (bucketID !== targetBucketID) {
        __classPrivateFieldGet(this, _Controller_model, "f").moveTodoToAnotherBucket(bucketID, todoID, targetBucketID);

        this._renderBuckets();
      }
    }
  }]);

  return Controller;
}();

exports.default = Controller;
_Controller_model = new WeakMap(), _Controller_view = new WeakMap();
},{"./model":"Cy5K","./views/bucketView":"mrfx"}],"YSF2":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var controller_1 = __importDefault(require("./ts/components/controller"));

var controller = new controller_1.default();
controller.init();
},{"./ts/components/controller":"jVKl"}]},{},["YSF2"], null)
//# sourceMappingURL=app.39229e33.js.map