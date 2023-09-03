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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_script_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/script.js */ \"./src/js/script.js\");\n/* harmony import */ var _js_script_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_script_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/style.scss */ \"./src/scss/style.scss\");\n\r\n\r\n\n\n//# sourceURL=webpack://project-template/./src/index.js?");

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/***/ (() => {

eval("//########################################\r\n// Variables\r\n//########################################\r\nlet shoppinglist = [];\r\nlet products = [];\r\n\r\nlet save_obj = {\r\n    saved_shoppinglist: [],\r\n    saved_products: [],\r\n};\r\n\r\n//########################################\r\n// Elements\r\n//########################################\r\nconst shopping_list = document.getElementById('shopping_list');\r\nconst all_products = document.getElementById('all_products');\r\nconst shopping_sum_label = document.getElementById('shopping_sum_label');\r\nconst products_modal = document.getElementById('products_modal');\r\nconst action_modal = document.getElementById('action_modal');\r\nconst btn_show_list = document.getElementById('btn_show_list');\r\nconst inp_prod = document.getElementById('inp_prod');\r\nconst btn_submit = document.getElementById('btn_submit');\r\nconst xbuttons = document.querySelectorAll('.xbutton');\r\nconst modals = document.querySelectorAll('.modal');\r\n\r\n//########################################\r\n// Class\r\n//########################################\r\nclass Product {\r\n    constructor(product_id, product_name, product_price) {\r\n        this.product_id = product_id;\r\n        this.product_name = product_name;\r\n        this.product_price = product_price;\r\n        this.is_on_list = false;\r\n        this.is_open = false;\r\n        this.amount = 1;\r\n    }\r\n}\r\n\r\n//########################################\r\n// Window Onload Load Local Storage\r\n//########################################\r\nwindow.onload = init();\r\n\r\nfunction init() {\r\n    load_local_storage();\r\n    render_shopping_list();\r\n    render_Product_list();\r\n    console.log('Producta', products);\r\n}\r\n\r\nfunction load_local_storage() {\r\n    if (localStorage.getItem('stored_shopping_saveobj') != '') {\r\n        try {\r\n            save_obj = JSON.parse(\r\n                localStorage.getItem('stored_shopping_saveobj'),\r\n            );\r\n            products = save_obj.saved_products;\r\n            shoppinglist = save_obj.saved_shoppinglist;\r\n        } catch (error) {\r\n            console.log(error);\r\n            save_obj = {\r\n                saved_shoppinglist: [],\r\n                saved_products: [],\r\n            };\r\n            save_obj.saved_products = products;\r\n            save_obj.saved_shoppinglist = shoppinglist;\r\n        }\r\n    }\r\n}\r\n\r\nfunction save_into_storage() {\r\n    localStorage.setItem('stored_shopping_saveobj', JSON.stringify(save_obj));\r\n}\r\n\r\n//########################################\r\n// Create some test products\r\n//########################################\r\n// const pizza = new Product(122, 'Pizza Magharita', 3.22);\r\n// const brot = new Product(123, 'Brot', 1.59);\r\n// const apfel = new Product(124, 'Apfel', 2.99);\r\n// const joghurt = new Product(125, 'Joghurt 3.5% Fett', 0.85)\r\n\r\n// pizza.is_on_list = false;\r\n// brot.is_on_list = false;\r\n// apfel.is_on_list = false;\r\n// joghurt.is_on_list = false;\r\n\r\n// pizza.is_open = false;\r\n// brot.is_open = false;\r\n// apfel.is_open = false;\r\n// joghurt.is_open = false;\r\n\r\n// products.push(pizza);\r\n// products.push(brot);\r\n// products.push(apfel);\r\n// products.push(joghurt);\r\n\r\n//########################################\r\n// Render Shopping list\r\n//########################################\r\nfunction render_shopping_list() {\r\n    shopping_list.innerHTML = '';\r\n    let calculated_shopping_sum = 0;\r\n    // Loop shopping list\r\n    shoppinglist.forEach((product) => {\r\n        try {\r\n            const price = product.amount * product.product_price;\r\n            calculated_shopping_sum += price;\r\n        } catch (error) {\r\n            console.log('Calc_error', error);\r\n        }\r\n\r\n        let prod_container = document.createElement('div');\r\n        let amount_label = document.createElement('p');\r\n        amount_label.innerHTML = product.amount;\r\n        amount_label.classList.add('amount-label');\r\n        prod_container.innerHTML = product.product_name;\r\n        prod_container.classList.add('product');\r\n        render_color(product, prod_container);\r\n        // On Click, push item to shopping list\r\n        prod_container.onclick = () => {\r\n\r\n            //Öffne neues Modal und übergebe prod\r\n\r\n            action_modal.classList.add('active-mini')\r\n            activate_xbuttons();\r\n            // if (product.is_open) {\r\n            //     product.is_open = false;\r\n            // } else {\r\n            //     product.is_open = true;\r\n            // }\r\n            // save_obj.saved_shoppinglist = shoppinglist;\r\n            // save_into_storage();\r\n            // render_shopping_list();\r\n            // render_Product_list();\r\n        };\r\n\r\n        prod_container.appendChild(amount_label);\r\n        shopping_list.appendChild(prod_container);\r\n    });\r\n    shopping_sum_label.innerHTML = `${calculated_shopping_sum.toFixed(2)} €`;\r\n}\r\n\r\n//########################################\r\n// Render Product list\r\n//########################################\r\nfunction render_Product_list() {\r\n    all_products.innerHTML = '';\r\n    // Loop product list\r\n    products.forEach((product) => {\r\n        let prod_container = document.createElement('div');\r\n        let amount_label = document.createElement('p');\r\n        amount_label.innerHTML = product.amount;\r\n        amount_label.classList.add('amount-label');\r\n        prod_container.innerHTML = product.product_name;\r\n        prod_container.classList.add('product');\r\n        render_color(product, prod_container, 'prod');\r\n\r\n        // On Click, push item to shopping list\r\n        prod_container.onclick = () => {\r\n            // If product is already on list\r\n            if (shoppinglist.includes(product)) {\r\n                const decision = window.confirm(`Soll das Produkt ${product.product_name} nochmals auf die Einkaufsliste gesetzt werden?`)\r\n                if(decision){\r\n                    product.amount++;\r\n                }\r\n                // Else add to list\r\n            } else {\r\n                shoppinglist.push(product);\r\n                product.is_on_list = true;\r\n                product.is_open = true;\r\n                save_obj.saved_shoppinglist = shoppinglist;\r\n                save_into_storage();\r\n            }\r\n\r\n            render_shopping_list();\r\n            render_Product_list();\r\n        };\r\n\r\n        prod_container.appendChild(amount_label);\r\n        all_products.appendChild(prod_container);\r\n    });\r\n}\r\n\r\n//########################################\r\n// Colorize Tile if is open\r\n//########################################\r\nfunction render_color(product, tile, list) {\r\n\r\n    if(list === 'prod') {\r\n        if (product.is_on_list === true) {\r\n            tile.classList.add('on-list');\r\n        } else {\r\n            tile.classList.remove('on-list');\r\n        }\r\n    }else {\r\n        if (product.is_open === true) {\r\n            tile.classList.add('item-open');\r\n        } else {\r\n            tile.classList.remove('item-open');\r\n        }\r\n    }\r\n\r\n\r\n}\r\n\r\n//########################################\r\n// Modal\r\n//########################################\r\nbtn_show_list.addEventListener('click', () => {\r\n    products_modal.classList.add('active');\r\n    activate_xbuttons();\r\n});\r\n\r\nfunction activate_xbuttons(){\r\n    xbuttons.forEach((xbutton) => {\r\n        xbutton.classList.add('active');\r\n    });\r\n}\r\n\r\nfunction hide_xbuttons(){\r\n    xbuttons.forEach((xbutton) => {\r\n        xbutton.classList.remove('active');\r\n    });\r\n}\r\n\r\n//########################################\r\n//close Modals\r\n//########################################\r\nxbuttons.forEach((xbutton) => {\r\n    xbutton.addEventListener('click', () => {\r\n        modals.forEach((modal) => {\r\n            modal.classList.remove('active');\r\n            hide_xbuttons();\r\n            action_modal.classList.remove('active-mini')\r\n        });\r\n    });\r\n});\r\n\r\n//########################################\r\n// Add new Product\r\n//########################################\r\n\r\nbtn_submit.addEventListener('click', () => {\r\n    add_new_product();\r\n});\r\n\r\nwindow.addEventListener('keydown', (e) => {\r\n    if (e.key === 'Enter') {\r\n        add_new_product();\r\n    }\r\n});\r\n\r\nfunction add_new_product() {\r\n    const new_product_name = inp_prod.value;\r\n    if (new_product_name.length > 0) {\r\n        let product_exists = false;\r\n        for (let i = 0; i < products.length; i++) {\r\n            if (new_product_name === products[i].product_name) {\r\n                product_exists = true;\r\n                break;\r\n            }\r\n        }\r\n        if (product_exists === false) {\r\n            const prod = new Product(\r\n                uniqueID_Generator(),\r\n                new_product_name,\r\n                0.0,\r\n            );\r\n            prod.is_on_list = false;\r\n            prod.is_open = false;\r\n            products.push(prod);\r\n            save_obj.saved_products = products;\r\n            inp_prod.value = '';\r\n            save_into_storage();\r\n            render_Product_list();\r\n        } else {\r\n            //TODO - Hier könnte man die Logik implementieren, dass das Produkt auf die Shoppinglist gesetzt wird\r\n        }\r\n    }\r\n}\r\n\r\nfunction uniqueID_Generator() {\r\n    const rndStuff = [\r\n        'A',\r\n        'B',\r\n        'C',\r\n        'D',\r\n        'E',\r\n        'F',\r\n        'G',\r\n        'H',\r\n        'I',\r\n        'J',\r\n        'K',\r\n        'L',\r\n        'M',\r\n        'N',\r\n        'O',\r\n        'P',\r\n        'Q',\r\n        'R',\r\n        'S',\r\n        'T',\r\n        'U',\r\n        'V',\r\n        'W',\r\n        'X',\r\n        'Y',\r\n        'Z',\r\n        '$',\r\n        '!',\r\n        '1',\r\n        '2',\r\n        '3',\r\n        '4',\r\n        '8',\r\n        '7',\r\n        '6',\r\n        '5',\r\n        '9',\r\n        '0',\r\n        '#',\r\n    ];\r\n    let key = '';\r\n    for (let i = 1; i <= 36; i++) {\r\n        key += rndStuff[parseInt(Math.random() * rndStuff.length)];\r\n    }\r\n    return key;\r\n}\r\n\n\n//# sourceURL=webpack://project-template/./src/js/script.js?");

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