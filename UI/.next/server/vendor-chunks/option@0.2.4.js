/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/option@0.2.4";
exports.ids = ["vendor-chunks/option@0.2.4"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/option@0.2.4/node_modules/option/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/.pnpm/option@0.2.4/node_modules/option/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("exports.none = Object.create({\n    value: function() {\n        throw new Error('Called value on none');\n    },\n    isNone: function() {\n        return true;\n    },\n    isSome: function() {\n        return false;\n    },\n    map: function() {\n        return exports.none;\n    },\n    flatMap: function() {\n        return exports.none;\n    },\n    filter: function() {\n        return exports.none;\n    },\n    toArray: function() {\n        return [];\n    },\n    orElse: callOrReturn,\n    valueOrElse: callOrReturn\n});\n\nfunction callOrReturn(value) {\n    if (typeof(value) == \"function\") {\n        return value();\n    } else {\n        return value;\n    }\n}\n\nexports.some = function(value) {\n    return new Some(value);\n};\n\nvar Some = function(value) {\n    this._value = value;\n};\n\nSome.prototype.value = function() {\n    return this._value;\n};\n\nSome.prototype.isNone = function() {\n    return false;\n};\n\nSome.prototype.isSome = function() {\n    return true;\n};\n\nSome.prototype.map = function(func) {\n    return new Some(func(this._value));\n};\n\nSome.prototype.flatMap = function(func) {\n    return func(this._value);\n};\n\nSome.prototype.filter = function(predicate) {\n    return predicate(this._value) ? this : exports.none;\n};\n\nSome.prototype.toArray = function() {\n    return [this._value];\n};\n\nSome.prototype.orElse = function(value) {\n    return this;\n};\n\nSome.prototype.valueOrElse = function(value) {\n    return this._value;\n};\n\nexports.isOption = function(value) {\n    return value === exports.none || value instanceof Some;\n};\n\nexports.fromNullable = function(value) {\n    if (value == null) {\n        return exports.none;\n    }\n    return new Some(value);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vb3B0aW9uQDAuMi40L25vZGVfbW9kdWxlcy9vcHRpb24vaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTtBQUNaO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCO0FBQ2hCO0FBQ0E7O0FBRUEsb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AbWFyYmxpc20vbmV4dGpzLy4vbm9kZV9tb2R1bGVzLy5wbnBtL29wdGlvbkAwLjIuNC9ub2RlX21vZHVsZXMvb3B0aW9uL2luZGV4LmpzPzY3NGUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0cy5ub25lID0gT2JqZWN0LmNyZWF0ZSh7XG4gICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbGxlZCB2YWx1ZSBvbiBub25lJyk7XG4gICAgfSxcbiAgICBpc05vbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGlzU29tZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIG1hcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBleHBvcnRzLm5vbmU7XG4gICAgfSxcbiAgICBmbGF0TWFwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMubm9uZTtcbiAgICB9LFxuICAgIGZpbHRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBleHBvcnRzLm5vbmU7XG4gICAgfSxcbiAgICB0b0FycmF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH0sXG4gICAgb3JFbHNlOiBjYWxsT3JSZXR1cm4sXG4gICAgdmFsdWVPckVsc2U6IGNhbGxPclJldHVyblxufSk7XG5cbmZ1bmN0aW9uIGNhbGxPclJldHVybih2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YodmFsdWUpID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gdmFsdWUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuXG5leHBvcnRzLnNvbWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgU29tZSh2YWx1ZSk7XG59O1xuXG52YXIgU29tZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbn07XG5cblNvbWUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xufTtcblxuU29tZS5wcm90b3R5cGUuaXNOb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuU29tZS5wcm90b3R5cGUuaXNTb21lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG5Tb21lLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbihmdW5jKSB7XG4gICAgcmV0dXJuIG5ldyBTb21lKGZ1bmModGhpcy5fdmFsdWUpKTtcbn07XG5cblNvbWUucHJvdG90eXBlLmZsYXRNYXAgPSBmdW5jdGlvbihmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmModGhpcy5fdmFsdWUpO1xufTtcblxuU29tZS5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIHByZWRpY2F0ZSh0aGlzLl92YWx1ZSkgPyB0aGlzIDogZXhwb3J0cy5ub25lO1xufTtcblxuU29tZS5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBbdGhpcy5fdmFsdWVdO1xufTtcblxuU29tZS5wcm90b3R5cGUub3JFbHNlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cblNvbWUucHJvdG90eXBlLnZhbHVlT3JFbHNlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG59O1xuXG5leHBvcnRzLmlzT3B0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IGV4cG9ydHMubm9uZSB8fCB2YWx1ZSBpbnN0YW5jZW9mIFNvbWU7XG59O1xuXG5leHBvcnRzLmZyb21OdWxsYWJsZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMubm9uZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTb21lKHZhbHVlKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/option@0.2.4/node_modules/option/index.js\n");

/***/ })

};
;