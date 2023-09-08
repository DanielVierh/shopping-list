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

eval("//########################################\n// Variables\n//########################################\nlet shoppinglist = [];\nlet products = [];\n\nlet save_obj = {\n    saved_shoppinglist: [],\n    saved_products: [],\n};\n\nlet current_product;\n\n//########################################\n// Elements\n//########################################\nconst shopping_list = document.getElementById('shopping_list');\nconst all_products = document.getElementById('all_products');\nconst shopping_sum_label = document.getElementById('shopping_sum_label');\nconst prod_modal_label = document.getElementById('prod_modal_label');\nconst products_modal = document.getElementById('products_modal');\nconst action_check = document.getElementById('action_check');\nconst action_delete = document.getElementById('action_delete');\nconst action_modal = document.getElementById('action_modal');\nconst action_edit = document.getElementById('action_edit');\nconst btn_show_list = document.getElementById('btn_show_list');\nconst inp_prod = document.getElementById('inp_prod');\nconst btn_submit = document.getElementById('btn_submit');\nconst edit_modal = document.getElementById('edit_modal');\nconst inp_price = document.getElementById('inp_price');\nconst inp_amount = document.getElementById('inp_amount');\nconst btn_submit_edit = document.getElementById('btn_submit_edit');\nconst btn_delete_shoppinglist = document.getElementById(\"btn_delete_shoppinglist\")\n\n\nconst xbuttons = document.querySelectorAll('.xbutton');\nconst modals = document.querySelectorAll('.modal');\nconst productLabels = document.querySelectorAll('.productLabel');\n\n//########################################\n// Class\n//########################################\nclass Product {\n    constructor(product_id, product_name, product_price) {\n        this.product_id = product_id;\n        this.product_name = product_name;\n        this.product_price = product_price;\n        this.is_on_list = false;\n        this.is_open = false;\n        this.amount = 1;\n    }\n}\n\n//########################################\n// Window Onload Load Local Storage\n//########################################\nwindow.onload = init();\n\nfunction init() {\n    load_local_storage();\n    render_shopping_list();\n    render_Product_list();\n    console.log('Producta', products);\n    console.log('shoppinglist', shoppinglist);\n}\n\nfunction load_local_storage() {\n    if (localStorage.getItem('stored_shopping_saveobj') != '') {\n        try {\n            save_obj = JSON.parse(\n                localStorage.getItem('stored_shopping_saveobj'),\n            );\n            products = save_obj.saved_products;\n            shoppinglist = save_obj.saved_shoppinglist;\n        } catch (error) {\n            console.log(error);\n            save_obj = {\n                saved_shoppinglist: [],\n                saved_products: [],\n            };\n            save_obj.saved_products = products;\n            save_obj.saved_shoppinglist = shoppinglist;\n        }\n    }\n}\n\nfunction save_into_storage() {\n    localStorage.setItem('stored_shopping_saveobj', JSON.stringify(save_obj));\n}\n\n//########################################\n// Render Shopping list\n//########################################\nfunction render_shopping_list() {\n    shopping_list.innerHTML = '';\n    let calculated_shopping_sum = 0;\n    // Loop shopping list\n    shoppinglist.forEach((product) => {\n        try {\n            const price = product.amount * product.product_price;\n            calculated_shopping_sum += price;\n        } catch (error) {\n            console.log('Calc_error', error);\n        }\n\n        let prod_container = document.createElement('div');\n        let amount_label = document.createElement('p');\n        if(product.product_price > 0) {\n            amount_label.innerHTML = `${product.amount} x ${product.product_price}€`;\n            amount_label.classList.add(\"bigger-label\")\n        }else {\n            amount_label.innerHTML = product.amount;\n        }\n        amount_label.classList.add('amount-label');\n        prod_container.innerHTML = product.product_name;\n        prod_container.classList.add('product');\n        render_color(product, prod_container);\n        // On Click, push item to shopping list\n        prod_container.onclick = () => {\n            //Öffne neues Modal und übergebe prod\n            action_modal.classList.add('active-mini');\n            activate_xbuttons('action_x');\n            current_product = product;\n            prod_modal_label.innerText = product.product_name;\n        };\n\n        prod_container.appendChild(amount_label);\n        shopping_list.appendChild(prod_container);\n    });\n    shopping_sum_label.innerHTML = `${calculated_shopping_sum.toFixed(2)} €`;\n}\n\n//! Toggle check for product\naction_check.addEventListener(\"click\", ()=> {\n    if (current_product.is_open) {\n        current_product.is_open = false;\n        set_product_at_the_end();\n    } else {\n        current_product.is_open = true;\n        set_product_at_the_start();\n    }\n    save_obj.saved_shoppinglist = shoppinglist;\n    save_into_storage();\n    render_shopping_list();\n    render_Product_list();\n    close_all_modals();\n})\n\n//? Open Edit Modal\naction_edit.addEventListener(\"click\", ()=> {\n    edit_modal.classList.add('active')\n    activate_xbuttons('edit_x');\n    productLabels.forEach((prod_label) => {\n        prod_label.innerText = current_product.product_name;\n    });\n    inp_price.value = current_product.product_price;\n    inp_amount.value = current_product.amount;\n})\n\naction_delete.addEventListener('click', ()=> {\n    delete_from_shoppinglist();\n    close_all_modals();\n})\n\nfunction delete_from_shoppinglist() {\n    if (current_product.is_on_list) {\n        // uncheck on productlist\n        for(let i = 0; i < products.length; i++) {\n            if(current_product.product_name === products[i].product_name) {\n                products[i].is_on_list = false;\n                products[i].is_open = false;\n            }\n        }\n\n        // Delete from shoppinglist\n        for(let i = 0; i < shoppinglist.length; i++) {\n            if(current_product.product_name === shoppinglist[i].product_name) {\n                shoppinglist.splice(i, 1);\n            }\n        }\n    }\n\n    save_obj.saved_shoppinglist = shoppinglist;\n    save_obj.saved_products = products;\n    save_into_storage();\n    render_shopping_list();\n    render_Product_list();\n}\n\n\n\n//########################################\n// Render Product list\n//########################################\nfunction render_Product_list() {\n    all_products.innerHTML = '';\n    // Loop product list\n    products.forEach((product) => {\n        let prod_container = document.createElement('div');\n        let amount_label = document.createElement('p');\n        amount_label.innerHTML = product.amount;\n        amount_label.classList.add('amount-label');\n        prod_container.innerHTML = product.product_name;\n        prod_container.classList.add('product');\n        render_color(product, prod_container, 'prod');\n\n        //? On Click, push item to shopping list\n        prod_container.onclick = () => {\n            // If product is already on list\n            if (!shoppinglist.includes(product)) {\n                shoppinglist.push(product);\n                product.is_on_list = true;\n                product.is_open = true;\n                save_obj.saved_shoppinglist = shoppinglist;\n                save_into_storage();\n            }else {\n                //? Delete from shoppinglist\n                current_product = product;\n                delete_from_shoppinglist()\n            }\n\n            render_shopping_list();\n            render_Product_list();\n        };\n\n        //prod_container.appendChild(amount_label);\n        all_products.appendChild(prod_container);\n    });\n}\n\n//########################################\n// Save Edit changes\n//########################################\nbtn_submit_edit.addEventListener(\"click\", ()=> {\n    if(inp_amount.value !== '') {\n        let new_amount_raw = inp_amount.value;\n        let new_amount = new_amount_raw.replace(',', '.');\n        parseFloat(new_amount);\n        current_product.amount = new_amount;\n\n        for(let i = 0; i < products.length; i++) {\n            if(current_product.product_name === products[i].product_name) {\n                products[i].amount = new_amount;\n            }\n        }\n\n        for(let i = 0; i < shoppinglist.length; i++) {\n            if(current_product.product_name === shoppinglist[i].product_name) {\n                shoppinglist[i].amount = new_amount;\n            }\n        }\n    }\n\n    if(inp_price.value !== '') {\n        let new_price_raw = inp_price.value;\n        let new_price = new_price_raw.replace(',', '.');\n        parseFloat(new_price);\n        current_product.product_price = new_price;\n\n        for(let i = 0; i < products.length; i++) {\n            if(current_product.product_name === products[i].product_name) {\n                products[i].product_price = new_price;\n            }\n        }\n\n        for(let i = 0; i < shoppinglist.length; i++) {\n            if(current_product.product_name === shoppinglist[i].product_name) {\n                shoppinglist[i].product_price = new_price;\n            }\n        }\n    }\n\n    save_obj.saved_products = products;\n    save_obj.saved_shoppinglist = shoppinglist;\n    save_into_storage();\n    render_Product_list();\n    render_shopping_list();\n    close_all_modals();\n\n})\n\n\n//########################################\n// Colorize Tile if is open\n//########################################\nfunction render_color(product, tile, list) {\n    if (list === 'prod') {\n        if (product.is_on_list === true) {\n            tile.classList.add('on-list');\n        } else {\n            tile.classList.remove('on-list');\n        }\n    } else {\n        if (product.is_open === true) {\n            tile.classList.add('item-open');\n        } else {\n            tile.classList.remove('item-open');\n        }\n    }\n}\n\nfunction set_product_at_the_end() {\n    const product = current_product;\n    const arrIndex = shoppinglist.indexOf(product);\n    const lastPos = shoppinglist.length;\n    if (arrIndex === -1) {\n        shoppinglist.splice(0, 0, product);\n    } else {\n        shoppinglist.splice(arrIndex, 1);\n        shoppinglist.splice(lastPos, 0, product);\n    }\n}\n\nfunction set_product_at_the_start() {\n    const product = current_product;\n    const arrIndex = shoppinglist.indexOf(product);\n    if (arrIndex === -1) {\n        shoppinglist.splice(0, 0, product);\n    } else {\n        shoppinglist.splice(arrIndex, 1);\n        shoppinglist.splice(0, 0, product);\n    }\n}\n\n//########################################\n// Modal\n//########################################\nbtn_show_list.addEventListener('click', () => {\n    products_modal.classList.add('active');\n    activate_xbuttons('prod_x');\n});\n\nfunction activate_xbuttons(id) {\n    xbuttons.forEach((xbutton) => {\n        if(xbutton.id === id) {\n            xbutton.classList.add('active');\n        }\n    });\n}\n\nfunction hide_xbuttons() {\n    xbuttons.forEach((xbutton) => {\n        xbutton.classList.remove('active');\n    });\n}\n\n//########################################\n//close Modals\n//########################################\nxbuttons.forEach((xbutton) => {\n    xbutton.addEventListener('click', () => {\n        close_all_modals()\n    });\n});\n\nfunction close_all_modals() {\n    modals.forEach((modal) => {\n        modal.classList.remove('active');\n        hide_xbuttons();\n        action_modal.classList.remove('active-mini');\n    });\n}\n\n//########################################\n// Add new Product\n//########################################\n\nbtn_submit.addEventListener('click', () => {\n    add_new_product();\n});\n\nwindow.addEventListener('keydown', (e) => {\n    if (e.key === 'Enter') {\n        add_new_product();\n    }\n});\n\nfunction add_new_product() {\n    const new_product_name = inp_prod.value;\n    if (new_product_name.length > 0) {\n        let product_exists = false;\n        for (let i = 0; i < products.length; i++) {\n            if (new_product_name === products[i].product_name) {\n                product_exists = true;\n                break;\n            }\n        }\n        if (product_exists === false) {\n            const prod = new Product(\n                uniqueID_Generator(),\n                new_product_name,\n                0.0,\n            );\n            prod.is_on_list = true;\n            prod.is_open = true;\n            products.unshift(prod);\n            shoppinglist.unshift(prod)\n            save_obj.saved_products = products;\n            inp_prod.value = '';\n            save_into_storage();\n            render_Product_list();\n            render_shopping_list();\n                // Edit Modal\n            edit_modal.classList.add('active')\n            activate_xbuttons('edit_x');\n            current_product = prod;\n            productLabels.forEach((prod_label) => {\n                prod_label.innerText = current_product.product_name;\n            });\n            inp_price.value = current_product.product_price;\n            inp_amount.value = current_product.amount;\n\n        } else {\n            //TODO - Hier könnte man die Logik implementieren, dass das Produkt auf die Shoppinglist gesetzt wird\n        }\n    }\n}\n\n\n\nfunction uniqueID_Generator() {\n    const rndStuff = [\n        'A',\n        'B',\n        'C',\n        'D',\n        'E',\n        'F',\n        'G',\n        'H',\n        'I',\n        'J',\n        'K',\n        'L',\n        'M',\n        'N',\n        'O',\n        'P',\n        'Q',\n        'R',\n        'S',\n        'T',\n        'U',\n        'V',\n        'W',\n        'X',\n        'Y',\n        'Z',\n        '$',\n        '!',\n        '1',\n        '2',\n        '3',\n        '4',\n        '8',\n        '7',\n        '6',\n        '5',\n        '9',\n        '0',\n        '#',\n    ];\n    let key = '';\n    for (let i = 1; i <= 36; i++) {\n        key += rndStuff[parseInt(Math.random() * rndStuff.length)];\n    }\n    return key;\n}\n\n\n//########################################\n// Delete shopping list \n//########################################\n\nbtn_delete_shoppinglist.addEventListener(\"click\", ()=> {\n\n    const decision = window.confirm(\"Sollen die Produkte auf der Einkaufsliste entfernt werden?\")\n    \n    if(decision) {\n        for(let i = 0; i < shoppinglist.length; i++) {\n            shoppinglist[i].is_on_list = false;\n            shoppinglist[i].is_open = false;\n        }\n        for(let i = 0; i < products.length; i++) {\n            products[i].is_on_list = false;\n            products[i].is_open = false;\n        }\n        shoppinglist = [];\n        render_Product_list();\n        render_shopping_list();\n        save_obj.saved_products = products;\n        save_obj.saved_shoppinglist = shoppinglist;\n        save_into_storage();\n    }\n})\n\n//# sourceURL=webpack://project-template/./src/js/script.js?");

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