/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/restaurants.js":
/*!*******************************!*\
  !*** ./src/js/restaurants.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst restaurantsURL = './../src/restaurants.json';\nlet rawdata = fs.readFileSync(path.resolve(__dirname, restaurantsURL));\nlet restaurants = JSON.parse(rawdata);\n\nexports.updateLocalRestaurants = function (req, res) {\n  let sum = 0;\n  restaurants.forEach(restaurant => {\n    if (req.body.id === restaurant.id) {\n      //   get the ratings array and adding the new rating and review to it also recalculating avg\n      restaurant.ratings.push({\n        \"stars\": parseInt(req.body.rating),\n        \"comment\": req.body.review\n      });\n      restaurant.ratings.forEach(el => {\n        sum += el.stars;\n      });\n      let avg = restaurant.avgRating;\n      avg = sum / restaurant.ratings.length;\n      restaurant.avgRating = avg;\n    }\n  });\n  fs.writeFileSync(path.resolve(__dirname, restaurantsURL), JSON.stringify(restaurants));\n  res.end();\n};\n\nexports.displayReviews = function (req, res) {\n  restaurants.forEach(restaurant => {\n    if (req.body.id === restaurant.id) {\n      console.log(restaurant.ratings);\n      res.send(restaurant.ratings);\n    }\n  });\n};\n\n//# sourceURL=webpack:///./src/js/restaurants.js?");

/***/ }),

/***/ "./src/js/server.js":
/*!**************************!*\
  !*** ./src/js/server.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webpack */ \"webpack\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _restaurants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./restaurants.js */ \"./src/js/restaurants.js\");\n/* harmony import */ var _restaurants_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_restaurants_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _webpack_config_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../webpack.config.js */ \"./webpack.config.js\");\n/* harmony import */ var _webpack_config_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_webpack_config_js__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_1___default()(),\n      DIST_DIR = __dirname,\n      HTML_FILE = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(DIST_DIR, 'index.html'),\n      compiler = webpack__WEBPACK_IMPORTED_MODULE_2___default()(_webpack_config_js__WEBPACK_IMPORTED_MODULE_6___default.a);\napp.use(bodyParser.urlencoded({\n  extended: false\n}));\napp.use(bodyParser.json());\napp.use(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_3___default()(compiler, {\n  publicPath: _webpack_config_js__WEBPACK_IMPORTED_MODULE_6___default.a.output.publicPath\n}));\napp.use(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_4___default()(compiler));\napp.get('*', (req, res, next) => {\n  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {\n    if (err) {\n      return next(err);\n    }\n\n    res.set('content-type', 'text/html');\n    res.send(result);\n    res.end();\n  });\n});\napp.post('/restaurants', _restaurants_js__WEBPACK_IMPORTED_MODULE_5___default.a.updateLocalRestaurants);\napp.post('/restaurants/review', _restaurants_js__WEBPACK_IMPORTED_MODULE_5___default.a.displayReviews);\nconst PORT = process.env.PORT || 8081;\napp.listen(PORT, () => {\n  console.log(`App listening to ${PORT}....`);\n  console.log('Press Ctrl+C to quit.');\n});\n\n//# sourceURL=webpack:///./src/js/server.js?");

/***/ }),

/***/ "./webpack.config.js":
/*!***************************!*\
  !*** ./webpack.config.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const path = __webpack_require__(/*! path */ \"path\");\n\nconst HtmlWebpackPlugin = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\");\n\nconst {\n  CleanWebpackPlugin\n} = __webpack_require__(/*! clean-webpack-plugin */ \"clean-webpack-plugin\");\n\nmodule.exports = {\n  entry: ['@babel/polyfill', './src/js/index.js'],\n  mode: \"development\",\n  target: 'web',\n  module: {\n    rules: [{\n      test: /\\.css$/i,\n      use: ['style-loader', 'css-loader']\n    }, {\n      test: /\\.html$/i,\n      loader: 'html-loader'\n    }, {\n      test: /\\.(png|svg|jpg|jpeg|gif)$/,\n      use: {\n        loader: \"file-loader\",\n        options: {\n          name: \"[name].[ext]\",\n          outputPath: \"images\",\n          esModule: false\n        }\n      }\n    }, {\n      test: /\\.(woff|woff2|eot|ttf|otf)$/,\n      use: ['file-loader']\n    }, {\n      test: /\\.m?js$/,\n      exclude: /(node_modules|bower_components)/,\n      use: {\n        loader: 'babel-loader',\n        options: {\n          presets: ['@babel/preset-env', '@babel/react', {\n            'plugins': ['@babel/plugin-proposal-class-properties']\n          }]\n        }\n      }\n    }]\n  },\n  devServer: {\n    open: true\n  },\n  output: {\n    path: path.resolve(__dirname, 'dist'),\n    filename: 'index.js'\n  },\n  plugins: [new HtmlWebpackPlugin({\n    template: \"./src/index.html\"\n  }), new CleanWebpackPlugin()]\n};\n\n//# sourceURL=webpack:///./webpack.config.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "clean-webpack-plugin":
/*!***************************************!*\
  !*** external "clean-webpack-plugin" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"clean-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22clean-webpack-plugin%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"html-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22html-webpack-plugin%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-dev-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-dev-middleware%22?");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-hot-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-hot-middleware%22?");

/***/ })

/******/ });