"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/domelementtype@2.3.0";
exports.ids = ["vendor-chunks/domelementtype@2.3.0"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/domelementtype@2.3.0/node_modules/domelementtype/lib/esm/index.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/.pnpm/domelementtype@2.3.0/node_modules/domelementtype/lib/esm/index.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CDATA: () => (/* binding */ CDATA),\n/* harmony export */   Comment: () => (/* binding */ Comment),\n/* harmony export */   Directive: () => (/* binding */ Directive),\n/* harmony export */   Doctype: () => (/* binding */ Doctype),\n/* harmony export */   ElementType: () => (/* binding */ ElementType),\n/* harmony export */   Root: () => (/* binding */ Root),\n/* harmony export */   Script: () => (/* binding */ Script),\n/* harmony export */   Style: () => (/* binding */ Style),\n/* harmony export */   Tag: () => (/* binding */ Tag),\n/* harmony export */   Text: () => (/* binding */ Text),\n/* harmony export */   isTag: () => (/* binding */ isTag)\n/* harmony export */ });\n/** Types of elements found in htmlparser2's DOM */\nvar ElementType;\n(function (ElementType) {\n    /** Type for the root element of a document */\n    ElementType[\"Root\"] = \"root\";\n    /** Type for Text */\n    ElementType[\"Text\"] = \"text\";\n    /** Type for <? ... ?> */\n    ElementType[\"Directive\"] = \"directive\";\n    /** Type for <!-- ... --> */\n    ElementType[\"Comment\"] = \"comment\";\n    /** Type for <script> tags */\n    ElementType[\"Script\"] = \"script\";\n    /** Type for <style> tags */\n    ElementType[\"Style\"] = \"style\";\n    /** Type for Any tag */\n    ElementType[\"Tag\"] = \"tag\";\n    /** Type for <![CDATA[ ... ]]> */\n    ElementType[\"CDATA\"] = \"cdata\";\n    /** Type for <!doctype ...> */\n    ElementType[\"Doctype\"] = \"doctype\";\n})(ElementType || (ElementType = {}));\n/**\n * Tests whether an element is a tag or not.\n *\n * @param elem Element to test\n */\nfunction isTag(elem) {\n    return (elem.type === ElementType.Tag ||\n        elem.type === ElementType.Script ||\n        elem.type === ElementType.Style);\n}\n// Exports for backwards compatibility\n/** Type for the root element of a document */\nconst Root = ElementType.Root;\n/** Type for Text */\nconst Text = ElementType.Text;\n/** Type for <? ... ?> */\nconst Directive = ElementType.Directive;\n/** Type for <!-- ... --> */\nconst Comment = ElementType.Comment;\n/** Type for <script> tags */\nconst Script = ElementType.Script;\n/** Type for <style> tags */\nconst Style = ElementType.Style;\n/** Type for Any tag */\nconst Tag = ElementType.Tag;\n/** Type for <![CDATA[ ... ]]> */\nconst CDATA = ElementType.CDATA;\n/** Type for <!doctype ...> */\nconst Doctype = ElementType.Doctype;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vZG9tZWxlbWVudHR5cGVAMi4zLjAvbm9kZV9tb2R1bGVzL2RvbWVsZW1lbnR0eXBlL2xpYi9lc20vaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGtDQUFrQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQG1hcmJsaXNtL25leHRqcy8uL25vZGVfbW9kdWxlcy8ucG5wbS9kb21lbGVtZW50dHlwZUAyLjMuMC9ub2RlX21vZHVsZXMvZG9tZWxlbWVudHR5cGUvbGliL2VzbS9pbmRleC5qcz8xNjI1Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKiBUeXBlcyBvZiBlbGVtZW50cyBmb3VuZCBpbiBodG1scGFyc2VyMidzIERPTSAqL1xuZXhwb3J0IHZhciBFbGVtZW50VHlwZTtcbihmdW5jdGlvbiAoRWxlbWVudFR5cGUpIHtcbiAgICAvKiogVHlwZSBmb3IgdGhlIHJvb3QgZWxlbWVudCBvZiBhIGRvY3VtZW50ICovXG4gICAgRWxlbWVudFR5cGVbXCJSb290XCJdID0gXCJyb290XCI7XG4gICAgLyoqIFR5cGUgZm9yIFRleHQgKi9cbiAgICBFbGVtZW50VHlwZVtcIlRleHRcIl0gPSBcInRleHRcIjtcbiAgICAvKiogVHlwZSBmb3IgPD8gLi4uID8+ICovXG4gICAgRWxlbWVudFR5cGVbXCJEaXJlY3RpdmVcIl0gPSBcImRpcmVjdGl2ZVwiO1xuICAgIC8qKiBUeXBlIGZvciA8IS0tIC4uLiAtLT4gKi9cbiAgICBFbGVtZW50VHlwZVtcIkNvbW1lbnRcIl0gPSBcImNvbW1lbnRcIjtcbiAgICAvKiogVHlwZSBmb3IgPHNjcmlwdD4gdGFncyAqL1xuICAgIEVsZW1lbnRUeXBlW1wiU2NyaXB0XCJdID0gXCJzY3JpcHRcIjtcbiAgICAvKiogVHlwZSBmb3IgPHN0eWxlPiB0YWdzICovXG4gICAgRWxlbWVudFR5cGVbXCJTdHlsZVwiXSA9IFwic3R5bGVcIjtcbiAgICAvKiogVHlwZSBmb3IgQW55IHRhZyAqL1xuICAgIEVsZW1lbnRUeXBlW1wiVGFnXCJdID0gXCJ0YWdcIjtcbiAgICAvKiogVHlwZSBmb3IgPCFbQ0RBVEFbIC4uLiBdXT4gKi9cbiAgICBFbGVtZW50VHlwZVtcIkNEQVRBXCJdID0gXCJjZGF0YVwiO1xuICAgIC8qKiBUeXBlIGZvciA8IWRvY3R5cGUgLi4uPiAqL1xuICAgIEVsZW1lbnRUeXBlW1wiRG9jdHlwZVwiXSA9IFwiZG9jdHlwZVwiO1xufSkoRWxlbWVudFR5cGUgfHwgKEVsZW1lbnRUeXBlID0ge30pKTtcbi8qKlxuICogVGVzdHMgd2hldGhlciBhbiBlbGVtZW50IGlzIGEgdGFnIG9yIG5vdC5cbiAqXG4gKiBAcGFyYW0gZWxlbSBFbGVtZW50IHRvIHRlc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVGFnKGVsZW0pIHtcbiAgICByZXR1cm4gKGVsZW0udHlwZSA9PT0gRWxlbWVudFR5cGUuVGFnIHx8XG4gICAgICAgIGVsZW0udHlwZSA9PT0gRWxlbWVudFR5cGUuU2NyaXB0IHx8XG4gICAgICAgIGVsZW0udHlwZSA9PT0gRWxlbWVudFR5cGUuU3R5bGUpO1xufVxuLy8gRXhwb3J0cyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbi8qKiBUeXBlIGZvciB0aGUgcm9vdCBlbGVtZW50IG9mIGEgZG9jdW1lbnQgKi9cbmV4cG9ydCBjb25zdCBSb290ID0gRWxlbWVudFR5cGUuUm9vdDtcbi8qKiBUeXBlIGZvciBUZXh0ICovXG5leHBvcnQgY29uc3QgVGV4dCA9IEVsZW1lbnRUeXBlLlRleHQ7XG4vKiogVHlwZSBmb3IgPD8gLi4uID8+ICovXG5leHBvcnQgY29uc3QgRGlyZWN0aXZlID0gRWxlbWVudFR5cGUuRGlyZWN0aXZlO1xuLyoqIFR5cGUgZm9yIDwhLS0gLi4uIC0tPiAqL1xuZXhwb3J0IGNvbnN0IENvbW1lbnQgPSBFbGVtZW50VHlwZS5Db21tZW50O1xuLyoqIFR5cGUgZm9yIDxzY3JpcHQ+IHRhZ3MgKi9cbmV4cG9ydCBjb25zdCBTY3JpcHQgPSBFbGVtZW50VHlwZS5TY3JpcHQ7XG4vKiogVHlwZSBmb3IgPHN0eWxlPiB0YWdzICovXG5leHBvcnQgY29uc3QgU3R5bGUgPSBFbGVtZW50VHlwZS5TdHlsZTtcbi8qKiBUeXBlIGZvciBBbnkgdGFnICovXG5leHBvcnQgY29uc3QgVGFnID0gRWxlbWVudFR5cGUuVGFnO1xuLyoqIFR5cGUgZm9yIDwhW0NEQVRBWyAuLi4gXV0+ICovXG5leHBvcnQgY29uc3QgQ0RBVEEgPSBFbGVtZW50VHlwZS5DREFUQTtcbi8qKiBUeXBlIGZvciA8IWRvY3R5cGUgLi4uPiAqL1xuZXhwb3J0IGNvbnN0IERvY3R5cGUgPSBFbGVtZW50VHlwZS5Eb2N0eXBlO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/domelementtype@2.3.0/node_modules/domelementtype/lib/esm/index.js\n");

/***/ })

};
;