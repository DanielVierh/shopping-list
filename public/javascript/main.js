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

eval("/**\n * Erstellt am: 31.08.2023\n */\n//########################################\n//*ANCHOR - Variables\n//########################################\nlet shoppinglist = [];\nlet products = [];\nlet weeklylist = [];\n\nlet save_obj = {\n    saved_shoppinglist: [],\n    saved_products: [],\n    saved_weekly_list: [],\n};\n\nlet current_product;\n\n//########################################\n//*ANCHOR - Elements\n//########################################\nconst shopping_list = document.getElementById('shopping_list');\nconst all_products = document.getElementById('all_products');\nconst shopping_sum_label = document.getElementById('shopping_sum_label');\nconst prod_modal_label = document.getElementById('prod_modal_label');\nconst products_modal = document.getElementById('products_modal');\nconst action_check = document.getElementById('action_check');\nconst action_delete = document.getElementById('action_delete');\nconst action_modal = document.getElementById('action_modal');\nconst action_edit = document.getElementById('action_edit');\nconst btn_show_list = document.getElementById('btn_show_list');\nconst inp_prod = document.getElementById('inp_prod');\nconst btn_submit = document.getElementById('btn_submit');\nconst edit_modal = document.getElementById('edit_modal');\nconst inp_price = document.getElementById('inp_price');\nconst inp_amount = document.getElementById('inp_amount');\nconst to_weeklyList_ToggleButton = document.getElementById(\"to_weeklyList_ToggleButton\");\nconst btn_submit_edit = document.getElementById('btn_submit_edit');\nconst btn_delete_shoppinglist = document.getElementById(\"btn_delete_shoppinglist\");\nconst btn_delete_product = document.getElementById(\"btn_delete_product\");\nconst btn_trigger_weekly_list = document.getElementById(\"btn_trigger_weekly_list\");\nconst lbl_products_info = document.getElementById(\"lbl_products_info\");\nconst setting_modal = document.getElementById('setting_modal');\nconst setting_x = document.getElementById('setting_x');\nconst btn_open_settings = document.getElementById('btn_open_settings');\n\n\n\nconst xbuttons = document.querySelectorAll('.xbutton');\nconst modals = document.querySelectorAll('.modal');\nconst productLabels = document.querySelectorAll('.productLabel');\n\n\n//########################################\n//*ANCHOR -  Class\n//########################################\nclass Product {\n    constructor(product_id, product_name, product_price) {\n        this.product_id = product_id;\n        this.product_name = product_name;\n        this.product_price = product_price;\n        this.is_on_list = false;\n        this.is_open = false;\n        this.amount = 1;\n        this.on_weekly_list = false;\n    }\n}\n\n\n//########################################\n//*ANCHOR -  Init\n//########################################\n\nwindow.onload = init();\n\n\nfunction init() {\n    load_local_storage();\n    update_lists();\n}\n\n//########################################\n//*ANCHOR -  Window Onload Load Local Storage\n//########################################\nfunction load_local_storage() {\n    if (localStorage.getItem('stored_shopping_saveobj') != '') {\n        try {\n            save_obj = JSON.parse(\n                localStorage.getItem('stored_shopping_saveobj'),\n            );\n            products = save_obj.saved_products;\n\n            try {\n                lbl_products_info.innerHTML = `${products.length} Produkte vorhanden`;\n            } catch (error) { }\n            shoppinglist = save_obj.saved_shoppinglist;\n            try {\n                weeklylist = save_obj.saved_weekly_list;\n                if (weeklylist === undefined) {\n                    weeklylist = [];\n                }\n            } catch (error) {\n                console.log(error);\n            }\n        } catch (error) {\n            console.log(error);\n            save_obj = {\n                saved_shoppinglist: [],\n                saved_products: [],\n                saved_weekly_list: [],\n            };\n            save_obj.saved_products = products;\n            save_obj.saved_shoppinglist = shoppinglist;\n            save_obj.saved_weekly_list = weeklylist;\n        }\n    }\n}\n\n//########################################\n//*ANCHOR -  Save to local Storage\n//########################################\nfunction save_into_storage() {\n    localStorage.setItem('stored_shopping_saveobj', JSON.stringify(save_obj));\n}\n\n//########################################\n//*ANCHOR -  Render Shopping list\n//########################################\nfunction render_shopping_list() {\n    shopping_list.innerHTML = '';\n    let calculated_shopping_sum = 0;\n    if (shoppinglist.length === 0) {\n        let empty_Label = document.createElement('h2');\n        empty_Label.innerHTML = 'Dein Einkaufszettel ist leer 🛒';\n        empty_Label.classList.add('empty-label'); // Not in use yet\n        shopping_list.appendChild(empty_Label);\n        btn_delete_shoppinglist.style.display = 'none';\n    } else {\n        btn_delete_shoppinglist.style.display = 'block';\n    }\n    //* Loop shopping list\n    shoppinglist.forEach((product) => {\n        try {\n            const price = product.amount * product.product_price;\n            calculated_shopping_sum += price;\n        } catch (error) {\n            console.log('Calc_error', error);\n        }\n\n        let prod_container = document.createElement('div');\n        let amount_label = document.createElement('p');\n        if (product.product_price > 0) {\n            amount_label.innerHTML = `${product.amount} x ${product.product_price} €`;\n            amount_label.classList.add(\"bigger-label\")\n        } else {\n            amount_label.innerHTML = product.amount;\n        }\n        amount_label.classList.add('amount-label');\n\n        //* Product name div\n        let product_name_div = document.createElement('div');\n        product_name_div.innerHTML = product.product_name;\n        product_name_div.classList.add('product-name-div');\n        prod_container.appendChild(product_name_div);\n\n        prod_container.classList.add('product');\n        render_color(product, prod_container);\n        // On Click, push item to shopping list\n        prod_container.onclick = () => {\n            //*Öffne neues Modal und übergebe prod\n            action_modal.classList.add('active-mini');\n            activate_xbuttons('action_x');\n            current_product = product;\n            prod_modal_label.innerText = product.product_name;\n        };\n\n        prod_container.appendChild(amount_label);\n        shopping_list.appendChild(prod_container);\n    });\n    shopping_sum_label.innerHTML = `${calculated_shopping_sum.toFixed(2)} €`;\n}\n\n//########################################\n//* ANCHOR -  //* Toggle check for product\n//########################################\naction_check.addEventListener(\"click\", () => {\n    if (current_product.is_open) {\n        current_product.is_open = false;\n        set_product_at_the_end();\n    } else {\n        current_product.is_open = true;\n        set_product_at_the_start();\n    }\n    save_obj.saved_shoppinglist = shoppinglist;\n    save_into_storage();\n    update_lists()\n    close_all_modals();\n})\n\n//########################################\n// //*ANCHOR - Open Edit Modal\n//########################################\n\naction_edit.addEventListener(\"click\", () => {\n    open_edit_modal()\n})\n\nfunction open_edit_modal() {\n    edit_modal.classList.add('active')\n    activate_xbuttons('edit_x');\n    productLabels.forEach((prod_label) => {\n        prod_label.innerText = current_product.product_name;\n    });\n    inp_price.value = current_product.product_price;\n    inp_amount.value = current_product.amount;\n\n    // Set the toggle button if on list or not\n    const on_weekly_list_status = check_if_product_is_on_weeklyShoppingList();\n    if (on_weekly_list_status === false) {\n        to_weeklyList_ToggleButton.checked = true;\n        setTimeout(() => {\n            to_weeklyList_ToggleButton.checked = false;\n        }, 250);\n    } else {\n        to_weeklyList_ToggleButton.checked = false;\n        setTimeout(() => {\n            to_weeklyList_ToggleButton.checked = true;\n        }, 250);\n    }\n}\n\n//########################################\n//*ANCHOR - Event Listener for remove button\n//########################################\naction_delete.addEventListener('click', () => {\n    delete_from_shoppinglist();\n    close_all_modals();\n})\n\n//########################################\n//*ANCHOR - Remove one product from shopping list\n//########################################\nfunction delete_from_shoppinglist() {\n    if (current_product.is_on_list) {\n        // uncheck on productlist\n        for (let i = 0; i < products.length; i++) {\n            if (current_product.product_name === products[i].product_name) {\n                products[i].is_on_list = false;\n                products[i].is_open = false;\n            }\n        }\n\n        // Delete from shoppinglist\n        for (let i = 0; i < shoppinglist.length; i++) {\n            if (current_product.product_name === shoppinglist[i].product_name) {\n                shoppinglist.splice(i, 1);\n            }\n        }\n    }\n\n    save_obj.saved_shoppinglist = shoppinglist;\n    save_obj.saved_products = products;\n    save_into_storage();\n    update_lists()\n}\n\n\n\n//########################################\n//*ANCHOR - Render Product list\n//########################################\nfunction render_Product_list(arr) {\n    all_products.innerHTML = '';\n    // Loop product list\n    arr.forEach((product) => {\n        let prod_container = document.createElement('div');\n        let amount_label = document.createElement('p');\n        let edit_button = document.createElement('div');\n        let add_remove_button = document.createElement('div');\n        amount_label.innerHTML = `${product.product_price} €`;\n        amount_label.classList.add('amount-label');\n        //* Product name div\n        let product_name_div = document.createElement('div');\n        product_name_div.innerHTML = product.product_name;\n        product_name_div.classList.add('product-name-div');\n        prod_container.appendChild(product_name_div);\n        prod_container.classList.add('product');\n        render_color(product, prod_container, 'prod');\n        edit_button.classList.add('tile-edit-button');\n        edit_button.innerHTML = '🖊️';\n        // add_remove_button.innerHTML = '+ -';\n        add_remove_button.classList.add('add-remove-button');\n\n        //* Onclick for add remove btn\n        add_remove_button.addEventListener('click', () => {\n            //* If product is already on list\n            if (!shoppinglist.includes(product)) {\n                shoppinglist.push(product);\n                product.is_on_list = true;\n                product.is_open = true;\n                save_obj.saved_shoppinglist = shoppinglist;\n                save_into_storage();\n            } else {\n                //* Delete from shoppinglist\n                current_product = product;\n                delete_from_shoppinglist()\n            }\n\n            update_lists();\n        })\n\n        // //* On Click, push item to shopping list\n        edit_button.addEventListener('click', () => {\n            current_product = product;\n            open_edit_modal();\n        })\n\n        prod_container.appendChild(amount_label);\n        prod_container.appendChild(edit_button);\n        prod_container.appendChild(add_remove_button);\n\n        all_products.appendChild(prod_container);\n    });\n}\n\n//########################################\n//*ANCHOR - Save Edit changes\n//########################################\nbtn_submit_edit.addEventListener(\"click\", () => {\n    if (inp_amount.value !== '') {\n        let new_amount_raw = inp_amount.value;\n        let new_amount = new_amount_raw.replace(',', '.');\n        parseFloat(new_amount);\n        current_product.amount = new_amount;\n\n        for (let i = 0; i < products.length; i++) {\n            if (current_product.product_name === products[i].product_name) {\n                products[i].amount = new_amount;\n            }\n        }\n\n        for (let i = 0; i < shoppinglist.length; i++) {\n            if (current_product.product_name === shoppinglist[i].product_name) {\n                shoppinglist[i].amount = new_amount;\n            }\n        }\n\n        for (let i = 0; i < weeklylist.length; i++) {\n            if (current_product.product_name === weeklylist[i].product_name) {\n                weeklylist[i].amount = new_amount;\n            }\n        }\n    }\n\n    if (inp_price.value !== '') {\n        let new_price_raw = inp_price.value;\n        let new_price = new_price_raw.replace(',', '.');\n        parseFloat(new_price);\n        current_product.product_price = new_price;\n\n        for (let i = 0; i < products.length; i++) {\n            if (current_product.product_name === products[i].product_name) {\n                products[i].product_price = new_price;\n            }\n        }\n\n        for (let i = 0; i < shoppinglist.length; i++) {\n            if (current_product.product_name === shoppinglist[i].product_name) {\n                shoppinglist[i].product_price = new_price;\n            }\n        }\n\n        for (let i = 0; i < weeklylist.length; i++) {\n            if (current_product.product_name === weeklylist[i].product_name) {\n                weeklylist[i].product_price = new_price;\n            }\n        }\n    }\n\n    save_obj.saved_products = products;\n    save_obj.saved_shoppinglist = shoppinglist;\n\n    save_into_storage();\n    update_lists()\n    close_all_modals();\n\n})\n\n//########################################\n//*ANCHOR -  set On / Off Weekly shopping list\n//########################################\nto_weeklyList_ToggleButton.addEventListener('click', () => {\n    const on_weekly_list_status = check_if_product_is_on_weeklyShoppingList();\n    if (on_weekly_list_status === false) {\n        current_product.on_weekly_list = true;\n\n        for (let i = 0; i < products.length; i++) {\n            if (current_product.product_name === products[i].product_name) {\n                products[i].on_weekly_list = true;\n            }\n        }\n\n        for (let i = 0; i < shoppinglist.length; i++) {\n            if (current_product.product_name === shoppinglist[i].product_name) {\n                products[i].on_weekly_list = true;\n            }\n        }\n\n        // Zur eigenrlichen Liste hinzufügen\n        weeklylist.push(current_product);\n    } else {\n        current_product.on_weekly_list = false;\n\n        for (let i = 0; i < products.length; i++) {\n            if (current_product.product_name === products[i].product_name) {\n                products[i].on_weekly_list = false;\n            }\n        }\n\n        for (let i = 0; i < shoppinglist.length; i++) {\n            if (current_product.product_name === shoppinglist[i].product_name) {\n                products[i].on_weekly_list = false;\n            }\n        }\n\n        // aus Liste entfernen\n        for (let i = 0; i < weeklylist.length; i++) {\n            if (current_product.product_name === weeklylist[i].product_name) {\n                weeklylist.splice(i, 1);\n            }\n        }\n    }\n\n    // Speichern\n    save_obj.saved_products = products;\n    save_obj.saved_shoppinglist = shoppinglist;\n    save_obj.saved_weekly_list = weeklylist;\n    save_into_storage();\n})\n\n//########################################\n//*ANCHOR - check if prod is on weekly list\n//########################################\n\nfunction check_if_product_is_on_weeklyShoppingList() {\n    const product_is_on_weekly_list = current_product.on_weekly_list;\n    let on_weekly_list_status = undefined;\n\n    if (product_is_on_weekly_list === undefined) {\n        current_product.on_weekly_list = false;\n        on_weekly_list_status = false;\n    } else if (product_is_on_weekly_list === false) {\n        on_weekly_list_status = false;\n    } else {\n        on_weekly_list_status = true;\n    }\n\n    return on_weekly_list_status;\n\n}\n\n\n//########################################\n//*ANCHOR - Colorize Tile if is open\n//########################################\nfunction render_color(product, tile, list) {\n    if (list === 'prod') {\n        if (product.is_on_list === true) {\n            tile.classList.add('on-list');\n        } else {\n            tile.classList.remove('on-list');\n        }\n    } else {\n        if (product.is_open === true) {\n            tile.classList.add('item-open');\n        } else {\n            tile.classList.remove('item-open');\n        }\n    }\n}\n\n//########################################\n//*ANCHOR - Set Product at the last pos\n//########################################\nfunction set_product_at_the_end() {\n    const product = current_product;\n    const arrIndex = shoppinglist.indexOf(product);\n    const lastPos = shoppinglist.length;\n    if (arrIndex === -1) {\n        shoppinglist.splice(0, 0, product);\n    } else {\n        shoppinglist.splice(arrIndex, 1);\n        shoppinglist.splice(lastPos, 0, product);\n    }\n}\n\n//########################################\n//*ANCHOR - Set Product at the first pos\n//########################################\nfunction set_product_at_the_start() {\n    const product = current_product;\n    const arrIndex = shoppinglist.indexOf(product);\n    if (arrIndex === -1) {\n        shoppinglist.splice(0, 0, product);\n    } else {\n        shoppinglist.splice(arrIndex, 1);\n        shoppinglist.splice(0, 0, product);\n    }\n}\n\n//########################################\n//*ANCHOR - Modal\n//########################################\nbtn_show_list.addEventListener('click', () => {\n    products_modal.classList.add('active');\n    activate_xbuttons('prod_x');\n\n    if (weeklylist.length > 0) {\n        btn_trigger_weekly_list.classList.add(\"active\");\n        btn_trigger_weekly_list.innerHTML = `Wocheneinkauf (${weeklylist.length})`;\n    } else {\n        btn_trigger_weekly_list.classList.remove(\"active\");\n    }\n});\n\n//########################################\n// ? Activate X Buttons\n//########################################\nfunction activate_xbuttons(id) {\n    xbuttons.forEach((xbutton) => {\n        if (xbutton.id === id) {\n            xbutton.classList.add('active');\n        }\n    });\n}\n\n//########################################\n// ? Hide x buttons\n//########################################\nfunction hide_xbuttons() {\n    xbuttons.forEach((xbutton) => {\n        xbutton.classList.remove('active');\n    });\n}\n\n//########################################\n//* close Modals\n//########################################\nxbuttons.forEach((xbutton) => {\n    xbutton.addEventListener('click', () => {\n        close_all_modals()\n    });\n});\n\n//########################################\n// ? Close all Modals\n//########################################\nfunction close_all_modals() {\n    modals.forEach((modal) => {\n        modal.classList.remove('active');\n        hide_xbuttons();\n        action_modal.classList.remove('active-mini');\n    });\n}\n\n//########################################\n//*ANCHOR - Add new Product\n//########################################\n\nbtn_submit.addEventListener('click', () => {\n    add_new_product();\n});\n\n//########################################\n// ? Add Product if enter key is pressed\n//########################################\nwindow.addEventListener('keydown', (e) => {\n    if (e.key === 'Enter') {\n        add_new_product();\n    }\n});\n\nfunction add_new_product() {\n    const new_product_name = inp_prod.value;\n    if (new_product_name.length > 0) {\n        let product_exists = false;\n        for (let i = 0; i < products.length; i++) {\n            if (new_product_name === products[i].product_name) {\n                product_exists = true;\n                break;\n            }\n        }\n        if (product_exists === false) {\n            const prod = new Product(\n                uniqueID_Generator(),\n                new_product_name,\n                0.0,\n            );\n            prod.is_on_list = true;\n            prod.is_open = true;\n            products.unshift(prod);\n            shoppinglist.unshift(prod)\n            save_obj.saved_products = products;\n            inp_prod.value = '';\n            save_into_storage();\n            update_lists()\n            // Edit Modal\n            edit_modal.classList.add('active')\n            activate_xbuttons('edit_x');\n            current_product = prod;\n            productLabels.forEach((prod_label) => {\n                prod_label.innerText = current_product.product_name;\n            });\n            inp_price.value = current_product.product_price;\n            inp_amount.value = current_product.amount;\n\n        } else {\n            //TODO - Hier könnte man die Logik implementieren, dass das Produkt auf die Shoppinglist gesetzt wird\n        }\n    }\n}\n\n//########################################\n// *ANCHOR - Function to give random id\n//########################################\nfunction uniqueID_Generator() {\n    const rndStuff = [\n        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',\n        'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '$', '!', '1', '2', '3', '4', '8', '7',\n        '6', '5', '9', '0', '#',\n    ];\n    let key = '';\n    for (let i = 1; i <= 36; i++) {\n        key += rndStuff[parseInt(Math.random() * rndStuff.length)];\n    }\n    return key;\n}\n\n\n//########################################\n//*ANCHOR - Delete shopping list\n//########################################\n\nbtn_delete_shoppinglist.addEventListener(\"click\", () => {\n\n    const decision = window.confirm(\"Sollen alle Produkte auf der Einkaufsliste entfernt werden?\")\n\n    if (decision) {\n        for (let i = 0; i < shoppinglist.length; i++) {\n            shoppinglist[i].is_on_list = false;\n            shoppinglist[i].is_open = false;\n        }\n        for (let i = 0; i < products.length; i++) {\n            products[i].is_on_list = false;\n            products[i].is_open = false;\n        }\n        shoppinglist = [];\n        update_lists();\n        save_obj.saved_products = products;\n        save_obj.saved_shoppinglist = shoppinglist;\n        save_into_storage();\n    }\n})\n\n\n//########################################\n//*ANCHOR - Delete Product forever\n//########################################\nbtn_delete_product.addEventListener(\"click\", () => {\n\n    const decision = window.confirm(`Soll das Produkt \"${current_product.product_name}\" für immer gelöscht werden?`)\n\n    if (decision) {\n        for (let i = 0; i < shoppinglist.length; i++) {\n            if (current_product.product_name === shoppinglist[i].product_name) {\n                shoppinglist.splice(i, 1);\n            }\n        }\n        for (let i = 0; i < products.length; i++) {\n            if (current_product.product_name === products[i].product_name) {\n                products.splice(i, 1);\n            }\n        }\n        for (let i = 0; i < weeklylist.length; i++) {\n            if (current_product.product_name === weeklylist[i].product_name) {\n                weeklylist.splice(i, 1);\n            }\n        }\n\n        update_lists()\n        save_obj.saved_products = products;\n        save_obj.saved_shoppinglist = shoppinglist;\n        save_obj.saved_weekly_list = weeklylist;\n        save_into_storage();\n        close_all_modals();\n    }\n})\n\n\n//########################################\n//*ANCHOR - Updage List and clean up\n//########################################\nfunction update_lists() {\n    render_shopping_list();\n    render_Product_list(products);\n    inp_prod.value = '';\n}\n\n\n\n\n//########################################\n//*ANCHOR - Filter Function for typing in product modal input field\n//########################################\n\ninp_prod.oninput = () => {\n    const current_inp = inp_prod.value;\n    let products_filtered = [];\n\n    for (let i = 0; i < products.length; i++) {\n        const product_name_uppercase = products[i].product_name.toUpperCase()\n        const inp_uppercase = current_inp.toUpperCase()\n        if (product_name_uppercase.includes(inp_uppercase)) {\n            products_filtered.push(products[i])\n        }\n    }\n    render_Product_list(products_filtered)\n}\n\n\nconst weeklyItems_Holder = document.getElementById('weeklyItems_Holder');\nconst weeklyShopping_modal = document.getElementById('weeklyShopping_modal');\nconst weeklyShopping_x = document.getElementById('weeklyShopping_x');\nconst btn_save_weekly_list = document.getElementById('btn_save_weekly_list');\n\n//*ANCHOR - Weekly List\nbtn_trigger_weekly_list.addEventListener('click', () => {\n\n    //* Reset weeklyItems_Holder\n    weeklyItems_Holder.innerHTML = '';\n\n    // * Display Modal an x Btn\n    weeklyShopping_modal.classList.add('active');\n    weeklyShopping_x.classList.add('active');\n\n    //* loop weekly list and generate checklist items\n    weeklylist.forEach((prod, index) => {\n        let itemdiv = document.createElement('div');\n        itemdiv.classList.add('select-item');\n\n        let itemInp = document.createElement('input');\n        itemInp.type = 'checkbox';\n        itemInp.id = prod.product_id;\n        itemInp.checked = true;\n        itemInp.value = true;\n        itemInp.name = prod.product_name;\n        itemInp.classList.add('inp-check');\n        itemInp.setAttribute('data-index', index)\n\n        let itemLabel = document.createElement('label');\n        itemLabel.innerHTML = prod.product_name;\n        itemLabel.setAttribute('for', prod.product_id);\n\n        itemdiv.appendChild(itemInp);\n        itemdiv.appendChild(itemLabel);\n\n        weeklyItems_Holder.appendChild(itemdiv);\n    })\n})\n\n// *ANCHOR - Add weekly products on list\nbtn_save_weekly_list.addEventListener('click', () => {\n    const weeklyItemHoldr = document.querySelectorAll('.inp-check')\n    let success_counter = 0;\n    weeklyItemHoldr.forEach((item) => {\n        const isChecked = item.checked;\n        const name = item.name;\n        if (isChecked) {\n            let product_is_already_on_shoppinglist = false;\n\n            for (let j = 0; j < shoppinglist.length; j++) {\n                if (name === shoppinglist[j].product_name) {\n                    product_is_already_on_shoppinglist = true;\n                }\n            }\n\n            if (product_is_already_on_shoppinglist === false) {\n                success_counter++;\n                const weeklyListIndex = item.getAttribute('data-index');\n                const product = weeklylist[weeklyListIndex];\n                product.is_on_list = true;\n                product.is_open = true;\n                shoppinglist.push(product);\n\n                for (let j = 0; j < products.length; j++) {\n                    if (name === products[j].product_name) {\n                        products[j].is_on_list = true;\n                        products[j].is_open = true;\n                    }\n                }\n            }\n        }\n    })\n\n    if (success_counter === 0) {\n        alert('Es konnten keine Produkte auf die Einkaufsliste gesetzt werden, da sie sich bereits auf dieser befinden')\n    } else {\n        alert(`${success_counter} Produkte wurden zur Einkaufsliste hinzugefügt.`);\n    }\n\n    save_obj.saved_shoppinglist = shoppinglist;\n    save_obj.saved_products = products;\n    save_into_storage();\n    update_lists();\n    close_all_modals();\n})\n\n//*ANCHOR - Mark Value when user clicks on inputfield\ninp_price.addEventListener('click', ()=> {\n    if (inp_price.value) {\n        inp_price.select();\n    }\n});\ninp_amount.addEventListener('click', ()=> {\n    if (inp_amount.value) {\n        inp_amount.select();\n    }\n});\n\n//* ANCHOR - Open Setting Modal\n\nbtn_open_settings.addEventListener('click', ()=> {\n    setting_modal.classList.add('active')\n})\n\n\n//* ANCHOR - Close Setting Modal\n\nsetting_x.addEventListener('click', ()=> {\n    setting_modal.classList.remove('active')\n})\n\n//# sourceURL=webpack://project-template/./src/js/script.js?");

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