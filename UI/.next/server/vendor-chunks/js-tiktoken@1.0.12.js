"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/js-tiktoken@1.0.12";
exports.ids = ["vendor-chunks/js-tiktoken@1.0.12"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/js-tiktoken@1.0.12/node_modules/js-tiktoken/dist/chunk-PEBACC3C.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/.pnpm/js-tiktoken@1.0.12/node_modules/js-tiktoken/dist/chunk-PEBACC3C.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Tiktoken: () => (/* binding */ Tiktoken),\n/* harmony export */   getEncodingNameForModel: () => (/* binding */ getEncodingNameForModel),\n/* harmony export */   never: () => (/* binding */ never)\n/* harmony export */ });\n/* harmony import */ var base64_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! base64-js */ \"(rsc)/./node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js\");\n\n\nvar __defProp = Object.defineProperty;\nvar __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;\nvar __publicField = (obj, key, value) => {\n  __defNormalProp(obj, typeof key !== \"symbol\" ? key + \"\" : key, value);\n  return value;\n};\n\n// src/utils.ts\nfunction never(_) {\n}\nfunction bytePairMerge(piece, ranks) {\n  let parts = Array.from(\n    { length: piece.length },\n    (_, i) => ({ start: i, end: i + 1 })\n  );\n  while (parts.length > 1) {\n    let minRank = null;\n    for (let i = 0; i < parts.length - 1; i++) {\n      const slice = piece.slice(parts[i].start, parts[i + 1].end);\n      const rank = ranks.get(slice.join(\",\"));\n      if (rank == null)\n        continue;\n      if (minRank == null || rank < minRank[0]) {\n        minRank = [rank, i];\n      }\n    }\n    if (minRank != null) {\n      const i = minRank[1];\n      parts[i] = { start: parts[i].start, end: parts[i + 1].end };\n      parts.splice(i + 1, 1);\n    } else {\n      break;\n    }\n  }\n  return parts;\n}\nfunction bytePairEncode(piece, ranks) {\n  if (piece.length === 1)\n    return [ranks.get(piece.join(\",\"))];\n  return bytePairMerge(piece, ranks).map((p) => ranks.get(piece.slice(p.start, p.end).join(\",\"))).filter((x) => x != null);\n}\nfunction escapeRegex(str) {\n  return str.replace(/[\\\\^$*+?.()|[\\]{}]/g, \"\\\\$&\");\n}\nvar _Tiktoken = class {\n  /** @internal */\n  specialTokens;\n  /** @internal */\n  inverseSpecialTokens;\n  /** @internal */\n  patStr;\n  /** @internal */\n  textEncoder = new TextEncoder();\n  /** @internal */\n  textDecoder = new TextDecoder(\"utf-8\");\n  /** @internal */\n  rankMap = /* @__PURE__ */ new Map();\n  /** @internal */\n  textMap = /* @__PURE__ */ new Map();\n  constructor(ranks, extendedSpecialTokens) {\n    this.patStr = ranks.pat_str;\n    const uncompressed = ranks.bpe_ranks.split(\"\\n\").filter(Boolean).reduce((memo, x) => {\n      const [_, offsetStr, ...tokens] = x.split(\" \");\n      const offset = Number.parseInt(offsetStr, 10);\n      tokens.forEach((token, i) => memo[token] = offset + i);\n      return memo;\n    }, {});\n    for (const [token, rank] of Object.entries(uncompressed)) {\n      const bytes = base64_js__WEBPACK_IMPORTED_MODULE_0__.toByteArray(token);\n      this.rankMap.set(bytes.join(\",\"), rank);\n      this.textMap.set(rank, bytes);\n    }\n    this.specialTokens = { ...ranks.special_tokens, ...extendedSpecialTokens };\n    this.inverseSpecialTokens = Object.entries(this.specialTokens).reduce((memo, [text, rank]) => {\n      memo[rank] = this.textEncoder.encode(text);\n      return memo;\n    }, {});\n  }\n  encode(text, allowedSpecial = [], disallowedSpecial = \"all\") {\n    const regexes = new RegExp(this.patStr, \"ug\");\n    const specialRegex = _Tiktoken.specialTokenRegex(\n      Object.keys(this.specialTokens)\n    );\n    const ret = [];\n    const allowedSpecialSet = new Set(\n      allowedSpecial === \"all\" ? Object.keys(this.specialTokens) : allowedSpecial\n    );\n    const disallowedSpecialSet = new Set(\n      disallowedSpecial === \"all\" ? Object.keys(this.specialTokens).filter(\n        (x) => !allowedSpecialSet.has(x)\n      ) : disallowedSpecial\n    );\n    if (disallowedSpecialSet.size > 0) {\n      const disallowedSpecialRegex = _Tiktoken.specialTokenRegex([\n        ...disallowedSpecialSet\n      ]);\n      const specialMatch = text.match(disallowedSpecialRegex);\n      if (specialMatch != null) {\n        throw new Error(\n          `The text contains a special token that is not allowed: ${specialMatch[0]}`\n        );\n      }\n    }\n    let start = 0;\n    while (true) {\n      let nextSpecial = null;\n      let startFind = start;\n      while (true) {\n        specialRegex.lastIndex = startFind;\n        nextSpecial = specialRegex.exec(text);\n        if (nextSpecial == null || allowedSpecialSet.has(nextSpecial[0]))\n          break;\n        startFind = nextSpecial.index + 1;\n      }\n      const end = nextSpecial?.index ?? text.length;\n      for (const match of text.substring(start, end).matchAll(regexes)) {\n        const piece = this.textEncoder.encode(match[0]);\n        const token2 = this.rankMap.get(piece.join(\",\"));\n        if (token2 != null) {\n          ret.push(token2);\n          continue;\n        }\n        ret.push(...bytePairEncode(piece, this.rankMap));\n      }\n      if (nextSpecial == null)\n        break;\n      let token = this.specialTokens[nextSpecial[0]];\n      ret.push(token);\n      start = nextSpecial.index + nextSpecial[0].length;\n    }\n    return ret;\n  }\n  decode(tokens) {\n    const res = [];\n    let length = 0;\n    for (let i2 = 0; i2 < tokens.length; ++i2) {\n      const token = tokens[i2];\n      const bytes = this.textMap.get(token) ?? this.inverseSpecialTokens[token];\n      if (bytes != null) {\n        res.push(bytes);\n        length += bytes.length;\n      }\n    }\n    const mergedArray = new Uint8Array(length);\n    let i = 0;\n    for (const bytes of res) {\n      mergedArray.set(bytes, i);\n      i += bytes.length;\n    }\n    return this.textDecoder.decode(mergedArray);\n  }\n};\nvar Tiktoken = _Tiktoken;\n__publicField(Tiktoken, \"specialTokenRegex\", (tokens) => {\n  return new RegExp(tokens.map((i) => escapeRegex(i)).join(\"|\"), \"g\");\n});\nfunction getEncodingNameForModel(model) {\n  switch (model) {\n    case \"gpt2\": {\n      return \"gpt2\";\n    }\n    case \"code-cushman-001\":\n    case \"code-cushman-002\":\n    case \"code-davinci-001\":\n    case \"code-davinci-002\":\n    case \"cushman-codex\":\n    case \"davinci-codex\":\n    case \"davinci-002\":\n    case \"text-davinci-002\":\n    case \"text-davinci-003\": {\n      return \"p50k_base\";\n    }\n    case \"code-davinci-edit-001\":\n    case \"text-davinci-edit-001\": {\n      return \"p50k_edit\";\n    }\n    case \"ada\":\n    case \"babbage\":\n    case \"babbage-002\":\n    case \"code-search-ada-code-001\":\n    case \"code-search-babbage-code-001\":\n    case \"curie\":\n    case \"davinci\":\n    case \"text-ada-001\":\n    case \"text-babbage-001\":\n    case \"text-curie-001\":\n    case \"text-davinci-001\":\n    case \"text-search-ada-doc-001\":\n    case \"text-search-babbage-doc-001\":\n    case \"text-search-curie-doc-001\":\n    case \"text-search-davinci-doc-001\":\n    case \"text-similarity-ada-001\":\n    case \"text-similarity-babbage-001\":\n    case \"text-similarity-curie-001\":\n    case \"text-similarity-davinci-001\": {\n      return \"r50k_base\";\n    }\n    case \"gpt-3.5-turbo-instruct-0914\":\n    case \"gpt-3.5-turbo-instruct\":\n    case \"gpt-3.5-turbo-16k-0613\":\n    case \"gpt-3.5-turbo-16k\":\n    case \"gpt-3.5-turbo-0613\":\n    case \"gpt-3.5-turbo-0301\":\n    case \"gpt-3.5-turbo\":\n    case \"gpt-4-32k-0613\":\n    case \"gpt-4-32k-0314\":\n    case \"gpt-4-32k\":\n    case \"gpt-4-0613\":\n    case \"gpt-4-0314\":\n    case \"gpt-4\":\n    case \"gpt-3.5-turbo-1106\":\n    case \"gpt-35-turbo\":\n    case \"gpt-4-1106-preview\":\n    case \"gpt-4-vision-preview\":\n    case \"gpt-3.5-turbo-0125\":\n    case \"gpt-4-turbo\":\n    case \"gpt-4-turbo-2024-04-09\":\n    case \"gpt-4-turbo-preview\":\n    case \"gpt-4-0125-preview\":\n    case \"text-embedding-ada-002\": {\n      return \"cl100k_base\";\n    }\n    case \"gpt-4o\":\n    case \"gpt-4o-2024-05-13\": {\n      return \"o200k_base\";\n    }\n    default:\n      throw new Error(\"Unknown model\");\n  }\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vanMtdGlrdG9rZW5AMS4wLjEyL25vZGVfbW9kdWxlcy9qcy10aWt0b2tlbi9kaXN0L2NodW5rLVBFQkFDQzNDLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBK0I7O0FBRS9CO0FBQ0EsOEVBQThFLDZEQUE2RDtBQUMzSTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxzQkFBc0I7QUFDNUIsaUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssSUFBSTtBQUNUO0FBQ0Esb0JBQW9CLGtEQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsS0FBSyxJQUFJO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0UsZ0JBQWdCO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0JBQW9CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRW9EIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQG1hcmJsaXNtL25leHRqcy8uL25vZGVfbW9kdWxlcy8ucG5wbS9qcy10aWt0b2tlbkAxLjAuMTIvbm9kZV9tb2R1bGVzL2pzLXRpa3Rva2VuL2Rpc3QvY2h1bmstUEVCQUNDM0MuanM/MWFlMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZTY0IGZyb20gJ2Jhc2U2NC1qcyc7XG5cbnZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19kZWZOb3JtYWxQcm9wID0gKG9iaiwga2V5LCB2YWx1ZSkgPT4ga2V5IGluIG9iaiA/IF9fZGVmUHJvcChvYmosIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlLCB2YWx1ZSB9KSA6IG9ialtrZXldID0gdmFsdWU7XG52YXIgX19wdWJsaWNGaWVsZCA9IChvYmosIGtleSwgdmFsdWUpID0+IHtcbiAgX19kZWZOb3JtYWxQcm9wKG9iaiwgdHlwZW9mIGtleSAhPT0gXCJzeW1ib2xcIiA/IGtleSArIFwiXCIgOiBrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuLy8gc3JjL3V0aWxzLnRzXG5mdW5jdGlvbiBuZXZlcihfKSB7XG59XG5mdW5jdGlvbiBieXRlUGFpck1lcmdlKHBpZWNlLCByYW5rcykge1xuICBsZXQgcGFydHMgPSBBcnJheS5mcm9tKFxuICAgIHsgbGVuZ3RoOiBwaWVjZS5sZW5ndGggfSxcbiAgICAoXywgaSkgPT4gKHsgc3RhcnQ6IGksIGVuZDogaSArIDEgfSlcbiAgKTtcbiAgd2hpbGUgKHBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICBsZXQgbWluUmFuayA9IG51bGw7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGNvbnN0IHNsaWNlID0gcGllY2Uuc2xpY2UocGFydHNbaV0uc3RhcnQsIHBhcnRzW2kgKyAxXS5lbmQpO1xuICAgICAgY29uc3QgcmFuayA9IHJhbmtzLmdldChzbGljZS5qb2luKFwiLFwiKSk7XG4gICAgICBpZiAocmFuayA9PSBudWxsKVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIGlmIChtaW5SYW5rID09IG51bGwgfHwgcmFuayA8IG1pblJhbmtbMF0pIHtcbiAgICAgICAgbWluUmFuayA9IFtyYW5rLCBpXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1pblJhbmsgIT0gbnVsbCkge1xuICAgICAgY29uc3QgaSA9IG1pblJhbmtbMV07XG4gICAgICBwYXJ0c1tpXSA9IHsgc3RhcnQ6IHBhcnRzW2ldLnN0YXJ0LCBlbmQ6IHBhcnRzW2kgKyAxXS5lbmQgfTtcbiAgICAgIHBhcnRzLnNwbGljZShpICsgMSwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcGFydHM7XG59XG5mdW5jdGlvbiBieXRlUGFpckVuY29kZShwaWVjZSwgcmFua3MpIHtcbiAgaWYgKHBpZWNlLmxlbmd0aCA9PT0gMSlcbiAgICByZXR1cm4gW3JhbmtzLmdldChwaWVjZS5qb2luKFwiLFwiKSldO1xuICByZXR1cm4gYnl0ZVBhaXJNZXJnZShwaWVjZSwgcmFua3MpLm1hcCgocCkgPT4gcmFua3MuZ2V0KHBpZWNlLnNsaWNlKHAuc3RhcnQsIHAuZW5kKS5qb2luKFwiLFwiKSkpLmZpbHRlcigoeCkgPT4geCAhPSBudWxsKTtcbn1cbmZ1bmN0aW9uIGVzY2FwZVJlZ2V4KHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCBcIlxcXFwkJlwiKTtcbn1cbnZhciBfVGlrdG9rZW4gPSBjbGFzcyB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgc3BlY2lhbFRva2VucztcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBpbnZlcnNlU3BlY2lhbFRva2VucztcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwYXRTdHI7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgdGV4dEVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICB0ZXh0RGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcihcInV0Zi04XCIpO1xuICAvKiogQGludGVybmFsICovXG4gIHJhbmtNYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICAvKiogQGludGVybmFsICovXG4gIHRleHRNYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICBjb25zdHJ1Y3RvcihyYW5rcywgZXh0ZW5kZWRTcGVjaWFsVG9rZW5zKSB7XG4gICAgdGhpcy5wYXRTdHIgPSByYW5rcy5wYXRfc3RyO1xuICAgIGNvbnN0IHVuY29tcHJlc3NlZCA9IHJhbmtzLmJwZV9yYW5rcy5zcGxpdChcIlxcblwiKS5maWx0ZXIoQm9vbGVhbikucmVkdWNlKChtZW1vLCB4KSA9PiB7XG4gICAgICBjb25zdCBbXywgb2Zmc2V0U3RyLCAuLi50b2tlbnNdID0geC5zcGxpdChcIiBcIik7XG4gICAgICBjb25zdCBvZmZzZXQgPSBOdW1iZXIucGFyc2VJbnQob2Zmc2V0U3RyLCAxMCk7XG4gICAgICB0b2tlbnMuZm9yRWFjaCgodG9rZW4sIGkpID0+IG1lbW9bdG9rZW5dID0gb2Zmc2V0ICsgaSk7XG4gICAgICByZXR1cm4gbWVtbztcbiAgICB9LCB7fSk7XG4gICAgZm9yIChjb25zdCBbdG9rZW4sIHJhbmtdIG9mIE9iamVjdC5lbnRyaWVzKHVuY29tcHJlc3NlZCkpIHtcbiAgICAgIGNvbnN0IGJ5dGVzID0gYmFzZTY0LnRvQnl0ZUFycmF5KHRva2VuKTtcbiAgICAgIHRoaXMucmFua01hcC5zZXQoYnl0ZXMuam9pbihcIixcIiksIHJhbmspO1xuICAgICAgdGhpcy50ZXh0TWFwLnNldChyYW5rLCBieXRlcyk7XG4gICAgfVxuICAgIHRoaXMuc3BlY2lhbFRva2VucyA9IHsgLi4ucmFua3Muc3BlY2lhbF90b2tlbnMsIC4uLmV4dGVuZGVkU3BlY2lhbFRva2VucyB9O1xuICAgIHRoaXMuaW52ZXJzZVNwZWNpYWxUb2tlbnMgPSBPYmplY3QuZW50cmllcyh0aGlzLnNwZWNpYWxUb2tlbnMpLnJlZHVjZSgobWVtbywgW3RleHQsIHJhbmtdKSA9PiB7XG4gICAgICBtZW1vW3JhbmtdID0gdGhpcy50ZXh0RW5jb2Rlci5lbmNvZGUodGV4dCk7XG4gICAgICByZXR1cm4gbWVtbztcbiAgICB9LCB7fSk7XG4gIH1cbiAgZW5jb2RlKHRleHQsIGFsbG93ZWRTcGVjaWFsID0gW10sIGRpc2FsbG93ZWRTcGVjaWFsID0gXCJhbGxcIikge1xuICAgIGNvbnN0IHJlZ2V4ZXMgPSBuZXcgUmVnRXhwKHRoaXMucGF0U3RyLCBcInVnXCIpO1xuICAgIGNvbnN0IHNwZWNpYWxSZWdleCA9IF9UaWt0b2tlbi5zcGVjaWFsVG9rZW5SZWdleChcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuc3BlY2lhbFRva2VucylcbiAgICApO1xuICAgIGNvbnN0IHJldCA9IFtdO1xuICAgIGNvbnN0IGFsbG93ZWRTcGVjaWFsU2V0ID0gbmV3IFNldChcbiAgICAgIGFsbG93ZWRTcGVjaWFsID09PSBcImFsbFwiID8gT2JqZWN0LmtleXModGhpcy5zcGVjaWFsVG9rZW5zKSA6IGFsbG93ZWRTcGVjaWFsXG4gICAgKTtcbiAgICBjb25zdCBkaXNhbGxvd2VkU3BlY2lhbFNldCA9IG5ldyBTZXQoXG4gICAgICBkaXNhbGxvd2VkU3BlY2lhbCA9PT0gXCJhbGxcIiA/IE9iamVjdC5rZXlzKHRoaXMuc3BlY2lhbFRva2VucykuZmlsdGVyKFxuICAgICAgICAoeCkgPT4gIWFsbG93ZWRTcGVjaWFsU2V0Lmhhcyh4KVxuICAgICAgKSA6IGRpc2FsbG93ZWRTcGVjaWFsXG4gICAgKTtcbiAgICBpZiAoZGlzYWxsb3dlZFNwZWNpYWxTZXQuc2l6ZSA+IDApIHtcbiAgICAgIGNvbnN0IGRpc2FsbG93ZWRTcGVjaWFsUmVnZXggPSBfVGlrdG9rZW4uc3BlY2lhbFRva2VuUmVnZXgoW1xuICAgICAgICAuLi5kaXNhbGxvd2VkU3BlY2lhbFNldFxuICAgICAgXSk7XG4gICAgICBjb25zdCBzcGVjaWFsTWF0Y2ggPSB0ZXh0Lm1hdGNoKGRpc2FsbG93ZWRTcGVjaWFsUmVnZXgpO1xuICAgICAgaWYgKHNwZWNpYWxNYXRjaCAhPSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgVGhlIHRleHQgY29udGFpbnMgYSBzcGVjaWFsIHRva2VuIHRoYXQgaXMgbm90IGFsbG93ZWQ6ICR7c3BlY2lhbE1hdGNoWzBdfWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0YXJ0ID0gMDtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgbGV0IG5leHRTcGVjaWFsID0gbnVsbDtcbiAgICAgIGxldCBzdGFydEZpbmQgPSBzdGFydDtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHNwZWNpYWxSZWdleC5sYXN0SW5kZXggPSBzdGFydEZpbmQ7XG4gICAgICAgIG5leHRTcGVjaWFsID0gc3BlY2lhbFJlZ2V4LmV4ZWModGV4dCk7XG4gICAgICAgIGlmIChuZXh0U3BlY2lhbCA9PSBudWxsIHx8IGFsbG93ZWRTcGVjaWFsU2V0LmhhcyhuZXh0U3BlY2lhbFswXSkpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIHN0YXJ0RmluZCA9IG5leHRTcGVjaWFsLmluZGV4ICsgMTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGVuZCA9IG5leHRTcGVjaWFsPy5pbmRleCA/PyB0ZXh0Lmxlbmd0aDtcbiAgICAgIGZvciAoY29uc3QgbWF0Y2ggb2YgdGV4dC5zdWJzdHJpbmcoc3RhcnQsIGVuZCkubWF0Y2hBbGwocmVnZXhlcykpIHtcbiAgICAgICAgY29uc3QgcGllY2UgPSB0aGlzLnRleHRFbmNvZGVyLmVuY29kZShtYXRjaFswXSk7XG4gICAgICAgIGNvbnN0IHRva2VuMiA9IHRoaXMucmFua01hcC5nZXQocGllY2Uuam9pbihcIixcIikpO1xuICAgICAgICBpZiAodG9rZW4yICE9IG51bGwpIHtcbiAgICAgICAgICByZXQucHVzaCh0b2tlbjIpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldC5wdXNoKC4uLmJ5dGVQYWlyRW5jb2RlKHBpZWNlLCB0aGlzLnJhbmtNYXApKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZXh0U3BlY2lhbCA9PSBudWxsKVxuICAgICAgICBicmVhaztcbiAgICAgIGxldCB0b2tlbiA9IHRoaXMuc3BlY2lhbFRva2Vuc1tuZXh0U3BlY2lhbFswXV07XG4gICAgICByZXQucHVzaCh0b2tlbik7XG4gICAgICBzdGFydCA9IG5leHRTcGVjaWFsLmluZGV4ICsgbmV4dFNwZWNpYWxbMF0ubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG4gIGRlY29kZSh0b2tlbnMpIHtcbiAgICBjb25zdCByZXMgPSBbXTtcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBmb3IgKGxldCBpMiA9IDA7IGkyIDwgdG9rZW5zLmxlbmd0aDsgKytpMikge1xuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaTJdO1xuICAgICAgY29uc3QgYnl0ZXMgPSB0aGlzLnRleHRNYXAuZ2V0KHRva2VuKSA/PyB0aGlzLmludmVyc2VTcGVjaWFsVG9rZW5zW3Rva2VuXTtcbiAgICAgIGlmIChieXRlcyAhPSBudWxsKSB7XG4gICAgICAgIHJlcy5wdXNoKGJ5dGVzKTtcbiAgICAgICAgbGVuZ3RoICs9IGJ5dGVzLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbWVyZ2VkQXJyYXkgPSBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKGNvbnN0IGJ5dGVzIG9mIHJlcykge1xuICAgICAgbWVyZ2VkQXJyYXkuc2V0KGJ5dGVzLCBpKTtcbiAgICAgIGkgKz0gYnl0ZXMubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy50ZXh0RGVjb2Rlci5kZWNvZGUobWVyZ2VkQXJyYXkpO1xuICB9XG59O1xudmFyIFRpa3Rva2VuID0gX1Rpa3Rva2VuO1xuX19wdWJsaWNGaWVsZChUaWt0b2tlbiwgXCJzcGVjaWFsVG9rZW5SZWdleFwiLCAodG9rZW5zKSA9PiB7XG4gIHJldHVybiBuZXcgUmVnRXhwKHRva2Vucy5tYXAoKGkpID0+IGVzY2FwZVJlZ2V4KGkpKS5qb2luKFwifFwiKSwgXCJnXCIpO1xufSk7XG5mdW5jdGlvbiBnZXRFbmNvZGluZ05hbWVGb3JNb2RlbChtb2RlbCkge1xuICBzd2l0Y2ggKG1vZGVsKSB7XG4gICAgY2FzZSBcImdwdDJcIjoge1xuICAgICAgcmV0dXJuIFwiZ3B0MlwiO1xuICAgIH1cbiAgICBjYXNlIFwiY29kZS1jdXNobWFuLTAwMVwiOlxuICAgIGNhc2UgXCJjb2RlLWN1c2htYW4tMDAyXCI6XG4gICAgY2FzZSBcImNvZGUtZGF2aW5jaS0wMDFcIjpcbiAgICBjYXNlIFwiY29kZS1kYXZpbmNpLTAwMlwiOlxuICAgIGNhc2UgXCJjdXNobWFuLWNvZGV4XCI6XG4gICAgY2FzZSBcImRhdmluY2ktY29kZXhcIjpcbiAgICBjYXNlIFwiZGF2aW5jaS0wMDJcIjpcbiAgICBjYXNlIFwidGV4dC1kYXZpbmNpLTAwMlwiOlxuICAgIGNhc2UgXCJ0ZXh0LWRhdmluY2ktMDAzXCI6IHtcbiAgICAgIHJldHVybiBcInA1MGtfYmFzZVwiO1xuICAgIH1cbiAgICBjYXNlIFwiY29kZS1kYXZpbmNpLWVkaXQtMDAxXCI6XG4gICAgY2FzZSBcInRleHQtZGF2aW5jaS1lZGl0LTAwMVwiOiB7XG4gICAgICByZXR1cm4gXCJwNTBrX2VkaXRcIjtcbiAgICB9XG4gICAgY2FzZSBcImFkYVwiOlxuICAgIGNhc2UgXCJiYWJiYWdlXCI6XG4gICAgY2FzZSBcImJhYmJhZ2UtMDAyXCI6XG4gICAgY2FzZSBcImNvZGUtc2VhcmNoLWFkYS1jb2RlLTAwMVwiOlxuICAgIGNhc2UgXCJjb2RlLXNlYXJjaC1iYWJiYWdlLWNvZGUtMDAxXCI6XG4gICAgY2FzZSBcImN1cmllXCI6XG4gICAgY2FzZSBcImRhdmluY2lcIjpcbiAgICBjYXNlIFwidGV4dC1hZGEtMDAxXCI6XG4gICAgY2FzZSBcInRleHQtYmFiYmFnZS0wMDFcIjpcbiAgICBjYXNlIFwidGV4dC1jdXJpZS0wMDFcIjpcbiAgICBjYXNlIFwidGV4dC1kYXZpbmNpLTAwMVwiOlxuICAgIGNhc2UgXCJ0ZXh0LXNlYXJjaC1hZGEtZG9jLTAwMVwiOlxuICAgIGNhc2UgXCJ0ZXh0LXNlYXJjaC1iYWJiYWdlLWRvYy0wMDFcIjpcbiAgICBjYXNlIFwidGV4dC1zZWFyY2gtY3VyaWUtZG9jLTAwMVwiOlxuICAgIGNhc2UgXCJ0ZXh0LXNlYXJjaC1kYXZpbmNpLWRvYy0wMDFcIjpcbiAgICBjYXNlIFwidGV4dC1zaW1pbGFyaXR5LWFkYS0wMDFcIjpcbiAgICBjYXNlIFwidGV4dC1zaW1pbGFyaXR5LWJhYmJhZ2UtMDAxXCI6XG4gICAgY2FzZSBcInRleHQtc2ltaWxhcml0eS1jdXJpZS0wMDFcIjpcbiAgICBjYXNlIFwidGV4dC1zaW1pbGFyaXR5LWRhdmluY2ktMDAxXCI6IHtcbiAgICAgIHJldHVybiBcInI1MGtfYmFzZVwiO1xuICAgIH1cbiAgICBjYXNlIFwiZ3B0LTMuNS10dXJiby1pbnN0cnVjdC0wOTE0XCI6XG4gICAgY2FzZSBcImdwdC0zLjUtdHVyYm8taW5zdHJ1Y3RcIjpcbiAgICBjYXNlIFwiZ3B0LTMuNS10dXJiby0xNmstMDYxM1wiOlxuICAgIGNhc2UgXCJncHQtMy41LXR1cmJvLTE2a1wiOlxuICAgIGNhc2UgXCJncHQtMy41LXR1cmJvLTA2MTNcIjpcbiAgICBjYXNlIFwiZ3B0LTMuNS10dXJiby0wMzAxXCI6XG4gICAgY2FzZSBcImdwdC0zLjUtdHVyYm9cIjpcbiAgICBjYXNlIFwiZ3B0LTQtMzJrLTA2MTNcIjpcbiAgICBjYXNlIFwiZ3B0LTQtMzJrLTAzMTRcIjpcbiAgICBjYXNlIFwiZ3B0LTQtMzJrXCI6XG4gICAgY2FzZSBcImdwdC00LTA2MTNcIjpcbiAgICBjYXNlIFwiZ3B0LTQtMDMxNFwiOlxuICAgIGNhc2UgXCJncHQtNFwiOlxuICAgIGNhc2UgXCJncHQtMy41LXR1cmJvLTExMDZcIjpcbiAgICBjYXNlIFwiZ3B0LTM1LXR1cmJvXCI6XG4gICAgY2FzZSBcImdwdC00LTExMDYtcHJldmlld1wiOlxuICAgIGNhc2UgXCJncHQtNC12aXNpb24tcHJldmlld1wiOlxuICAgIGNhc2UgXCJncHQtMy41LXR1cmJvLTAxMjVcIjpcbiAgICBjYXNlIFwiZ3B0LTQtdHVyYm9cIjpcbiAgICBjYXNlIFwiZ3B0LTQtdHVyYm8tMjAyNC0wNC0wOVwiOlxuICAgIGNhc2UgXCJncHQtNC10dXJiby1wcmV2aWV3XCI6XG4gICAgY2FzZSBcImdwdC00LTAxMjUtcHJldmlld1wiOlxuICAgIGNhc2UgXCJ0ZXh0LWVtYmVkZGluZy1hZGEtMDAyXCI6IHtcbiAgICAgIHJldHVybiBcImNsMTAwa19iYXNlXCI7XG4gICAgfVxuICAgIGNhc2UgXCJncHQtNG9cIjpcbiAgICBjYXNlIFwiZ3B0LTRvLTIwMjQtMDUtMTNcIjoge1xuICAgICAgcmV0dXJuIFwibzIwMGtfYmFzZVwiO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBtb2RlbFwiKTtcbiAgfVxufVxuXG5leHBvcnQgeyBUaWt0b2tlbiwgZ2V0RW5jb2RpbmdOYW1lRm9yTW9kZWwsIG5ldmVyIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/js-tiktoken@1.0.12/node_modules/js-tiktoken/dist/chunk-PEBACC3C.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/js-tiktoken@1.0.12/node_modules/js-tiktoken/dist/lite.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/.pnpm/js-tiktoken@1.0.12/node_modules/js-tiktoken/dist/lite.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Tiktoken: () => (/* reexport safe */ _chunk_PEBACC3C_js__WEBPACK_IMPORTED_MODULE_0__.Tiktoken),\n/* harmony export */   getEncodingNameForModel: () => (/* reexport safe */ _chunk_PEBACC3C_js__WEBPACK_IMPORTED_MODULE_0__.getEncodingNameForModel)\n/* harmony export */ });\n/* harmony import */ var _chunk_PEBACC3C_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-PEBACC3C.js */ \"(rsc)/./node_modules/.pnpm/js-tiktoken@1.0.12/node_modules/js-tiktoken/dist/chunk-PEBACC3C.js\");\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vanMtdGlrdG9rZW5AMS4wLjEyL25vZGVfbW9kdWxlcy9qcy10aWt0b2tlbi9kaXN0L2xpdGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXdFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQG1hcmJsaXNtL25leHRqcy8uL25vZGVfbW9kdWxlcy8ucG5wbS9qcy10aWt0b2tlbkAxLjAuMTIvbm9kZV9tb2R1bGVzL2pzLXRpa3Rva2VuL2Rpc3QvbGl0ZS5qcz9iNmNjIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IFRpa3Rva2VuLCBnZXRFbmNvZGluZ05hbWVGb3JNb2RlbCB9IGZyb20gJy4vY2h1bmstUEVCQUNDM0MuanMnO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/js-tiktoken@1.0.12/node_modules/js-tiktoken/dist/lite.js\n");

/***/ })

};
;