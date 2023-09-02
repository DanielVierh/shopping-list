/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://project-template/./src/scss/style.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_script_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/script.js */ \"./src/js/script.js\");\n/* harmony import */ var _js_script_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_script_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/style.scss */ \"./src/scss/style.scss\");\n\n\n\n\n//# sourceURL=webpack://project-template/./src/index.js?");

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/***/ (() => {

eval("//########################################\n// Variables\n//########################################\nlet shoppinglist = [];\nlet products = [];\n\n//########################################\n// Elements\n//########################################\nconst shopping_list = document.getElementById(\"shopping_list\");\nconst all_products = document.getElementById(\"all_products\");\nconst shopping_sum_label = document.getElementById(\"shopping_sum_label\")\nconst products_modal = document.getElementById(\"products_modal\");\nconst btn_show_list = document.getElementById(\"btn_show_list\");\nconst inp_prod = document.getElementById(\"inp_prod\");\nconst btn_submit = document.getElementById(\"btn_submit\");\nconst xbuttons = document.querySelectorAll('.xbutton');\nconst modals = document.querySelectorAll('.modal');\n\n\n//########################################\n// Class\n//########################################\nclass Product {\n    constructor(product_id, product_name, product_price) {\n        this.product_id = product_id;\n        this.product_name = product_name;\n        this.product_price = product_price;\n        this.is_on_list = false;\n        this.is_open = false;\n        this.amount = 1;\n    }\n\n    calc_price() {\n        const price = this.amount * this.product_price;\n        return price;\n    }\n\n}\n\n//########################################\n// Create some test products\n//########################################\nconst pizza = new Product(122, 'Pizza Magharita', 3.22);\nconst brot = new Product(123, 'Brot', 1.59);\nconst apfel = new Product(124, 'Apfel', 2.99);\nconst joghurt = new Product(125, 'Joghurt 3.5% Fett', 0.85)\n\npizza.is_on_list = false;\nbrot.is_on_list = false;\napfel.is_on_list = false;\njoghurt.is_on_list = false;\n\npizza.is_open = false;\nbrot.is_open = false;\napfel.is_open = false;\njoghurt.is_open = false;\n\napfel.amount = 2;\n\n\nproducts.push(pizza);\nproducts.push(brot);\nproducts.push(apfel);\nproducts.push(joghurt);\n\nrender_shopping_list();\nrender_Product_list();\n\n\n//########################################\n// Render Shopping list \n//########################################\nfunction render_shopping_list() {\n    shopping_list.innerHTML = ''\n    let calculated_shopping_sum = 0;\n    // Loop shopping list\n    shoppinglist.forEach((product) => {\n        calculated_shopping_sum += product.calc_price();\n\n        let prod_container = document.createElement('div');\n        let amount_label = document.createElement(\"p\");\n        amount_label.innerHTML = product.amount;\n        amount_label.classList.add(\"amount-label\")\n        prod_container.innerHTML = product.product_name;\n        prod_container.classList.add(\"product\");\n\n        prod_container.appendChild(amount_label)\n        shopping_list.appendChild(prod_container)\n    });\n    shopping_sum_label.innerHTML = `${(calculated_shopping_sum).toFixed(2)} €`\n}\n\n//########################################\n// Render Product list \n//########################################\nfunction render_Product_list() {\n    // Loop product list\n    products.forEach((product) => {\n        let prod_container = document.createElement('div');\n        prod_container.innerHTML = product.product_name;\n        prod_container.classList.add(\"product\");\n        // On Click, push item to shopping list\n        prod_container.onclick = ()=> {\n            if(shoppinglist.includes(product)) {\n                product.amount++\n            }else {\n                shoppinglist.push(product);\n                product.is_on_list = true;\n                product.is_open = true;\n                console.log(shoppinglist);\n            }\n            \n            render_shopping_list();\n        }\n        all_products.appendChild(prod_container)\n    });\n}\n\n\n//########################################\n// Modal\n//########################################\nbtn_show_list.addEventListener(\"click\", ()=> {\n    products_modal.classList.add(\"active\");\n    xbuttons.forEach((xbutton)=> {\n        xbutton.classList.add(\"active\");\n    })\n})\n\n\n//########################################\n//close Modals\n//########################################\nxbuttons.forEach((xbutton)=> {\n    xbutton.addEventListener(\"click\", ()=> {\n        modals.forEach((modal)=> {\n            modal.classList.remove(\"active\")\n            xbutton.classList.remove(\"active\")\n        })\n    })\n})\n\n\n\n\n\n\n//# sourceURL=webpack://project-template/./src/js/script.js?");

/***/ })

/******/ 	});
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
/******/ 			// no module.id needed
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;