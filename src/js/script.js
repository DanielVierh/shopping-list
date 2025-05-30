/**
 * Erstellt am: 31.08.2023
 */

import { backup } from "./modules/backup.js";

//########################################
//*ANCHOR - Variables
//########################################
let shoppinglist = [];
let products = [];
let weeklylist = [];

let save_obj = {
    saved_shoppinglist: [],
    saved_products: [],
    saved_weekly_list: [],
    theme: '2',
};

let current_product;


//########################################
//*ANCHOR - Elements
//########################################
const shopping_list = document.getElementById('shopping_list');
const all_products = document.getElementById('all_products');
const shopping_sum_label = document.getElementById('shopping_sum_label');
const prod_modal_label = document.getElementById('prod_modal_label');
const products_modal = document.getElementById('products_modal');
const action_check = document.getElementById('action_check');
const action_delete = document.getElementById('action_delete');
const action_modal = document.getElementById('action_modal');
const action_edit = document.getElementById('action_edit');
const btn_show_list = document.getElementById('btn_show_list');
const inp_prod = document.getElementById('inp_prod');
const btn_submit = document.getElementById('btn_submit');
const edit_modal = document.getElementById('edit_modal');
const inp_price = document.getElementById('inp_price');
const inp_amount = document.getElementById('inp_amount');
const to_weeklyList_ToggleButton = document.getElementById("to_weeklyList_ToggleButton");
const btn_submit_edit = document.getElementById('btn_submit_edit');
const btn_delete_shoppinglist = document.getElementById("btn_delete_shoppinglist");
const btn_delete_product = document.getElementById("btn_delete_product");
const btn_trigger_weekly_list = document.getElementById("btn_trigger_weekly_list");
const lbl_products_info = document.getElementById("lbl_products_info");
const setting_modal = document.getElementById('setting_modal');
const setting_x = document.getElementById('setting_x');
const btn_open_settings = document.getElementById('btn_open_settings');
const themes = document.querySelectorAll('.theme-item');
const r = document.querySelector(':root');


const xbuttons = document.querySelectorAll('.xbutton');
const modals = document.querySelectorAll('.modal');
const productLabels = document.querySelectorAll('.productLabel');


//########################################
//*ANCHOR -  Class
//########################################
class Product {
    constructor(product_id, product_name, product_price) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.product_price = product_price;
        this.is_on_list = false;
        this.is_open = false;
        this.amount = 1;
        this.on_weekly_list = false;
    }
}


//########################################
//*ANCHOR -  Init
//########################################

window.onload = init();


function init() {
    load_local_storage();
    update_lists();
}

//########################################
//*ANCHOR -  Window Onload Load Local Storage
//########################################
function load_local_storage() {
    if (localStorage.getItem('stored_shopping_saveobj') != '') {
        try {
            save_obj = JSON.parse(
                localStorage.getItem('stored_shopping_saveobj'),
            );
            products = save_obj.saved_products;
            backup(save_obj);

            try {
                lbl_products_info.innerHTML = `${products.length} Produkte vorhanden`;
            } catch (error) { }
            shoppinglist = save_obj.saved_shoppinglist;
            try {
                weeklylist = save_obj.saved_weekly_list;
                if (weeklylist === undefined) {
                    weeklylist = [];
                }
            } catch (error) {
                console.log(error);
            }
            try {
                set_Theme(save_obj.theme)
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            save_obj = {
                saved_shoppinglist: [],
                saved_products: [],
                saved_weekly_list: [],
                theme: '2',
            };
            save_obj.saved_products = products;
            save_obj.saved_shoppinglist = shoppinglist;
            save_obj.saved_weekly_list = weeklylist;
        }
    }
}

//########################################
//*ANCHOR -  Save to local Storage
//########################################
function save_into_storage() {
    localStorage.setItem('stored_shopping_saveobj', JSON.stringify(save_obj));
}

//########################################
//*ANCHOR -  Render Shopping list
//########################################
function render_shopping_list() {
    shopping_list.innerHTML = '';
    let calculated_shopping_sum = 0;
    if (shoppinglist.length === 0) {
        let empty_Label = document.createElement('h2');
        empty_Label.innerHTML = 'Dein Einkaufszettel ist leer 🛒';
        empty_Label.classList.add('empty-label'); // Not in use yet
        shopping_list.appendChild(empty_Label);
        btn_delete_shoppinglist.style.display = 'none';
    } else {
        btn_delete_shoppinglist.style.display = 'block';
    }
    //* Loop shopping list
    shoppinglist.forEach((product) => {
        try {
            const price = product.amount * product.product_price;
            calculated_shopping_sum += price;
        } catch (error) {
            console.log('Calc_error', error);
        }

        let prod_container = document.createElement('div');
        let amount_label = document.createElement('p');
        if (product.product_price > 0) {
            amount_label.innerHTML = `${product.amount} x ${product.product_price} €`;
            amount_label.classList.add("bigger-label")
        } else {
            amount_label.innerHTML = product.amount;
        }
        amount_label.classList.add('amount-label');

        //* Product name div
        let product_name_div = document.createElement('div');
        product_name_div.innerHTML = product.product_name;
        product_name_div.classList.add('product-name-div');
        prod_container.appendChild(product_name_div);

        prod_container.classList.add('product');
        render_color(product, prod_container);
        // On Click, push item to shopping list
        prod_container.onclick = () => {
            //*Öffne neues Modal und übergebe prod
            action_modal.classList.add('active-mini');
            lbl_current_amount.innerText = `Menge \n ${product.amount}`;
            activate_xbuttons('action_x');
            current_product = product;
            prod_modal_label.innerText = product.product_name;
        };

        prod_container.appendChild(amount_label);
        shopping_list.appendChild(prod_container);
    });
    shopping_sum_label.innerHTML = `${calculated_shopping_sum.toFixed(2)} €`;
}

//########################################
//* ANCHOR -  //* Toggle check for product
//########################################
action_check.addEventListener("click", () => {
    if (current_product.is_open) {
        current_product.is_open = false;
        set_product_at_the_end();
    } else {
        current_product.is_open = true;
        set_product_at_the_start();
    }
    save_obj.saved_shoppinglist = shoppinglist;
    save_into_storage();
    update_lists()
    close_all_modals();
})

//########################################
// //*ANCHOR - Open Edit Modal
//########################################

action_edit.addEventListener("click", () => {
    open_edit_modal()
})

function open_edit_modal() {
    edit_modal.classList.add('active')
    activate_xbuttons('edit_x');
    productLabels.forEach((prod_label) => {
        prod_label.innerText = current_product.product_name;
    });
    inp_price.value = current_product.product_price;
    inp_amount.value = current_product.amount;

    // Set the toggle button if on list or not
    const on_weekly_list_status = check_if_product_is_on_weeklyShoppingList();
    if (on_weekly_list_status === false) {
        to_weeklyList_ToggleButton.checked = true;
        setTimeout(() => {
            to_weeklyList_ToggleButton.checked = false;
        }, 250);
    } else {
        to_weeklyList_ToggleButton.checked = false;
        setTimeout(() => {
            to_weeklyList_ToggleButton.checked = true;
        }, 250);
    }
}

//########################################
//*ANCHOR - Event Listener for remove button
//########################################
action_delete.addEventListener('click', () => {
    delete_from_shoppinglist();
    close_all_modals();
})

//########################################
//*ANCHOR - Remove one product from shopping list
//########################################
function delete_from_shoppinglist() {
    if (current_product.is_on_list) {
        // uncheck on productlist
        for (let i = 0; i < products.length; i++) {
            if (current_product.product_name === products[i].product_name) {
                products[i].is_on_list = false;
                products[i].is_open = false;
            }
        }

        // Delete from shoppinglist
        for (let i = 0; i < shoppinglist.length; i++) {
            if (current_product.product_name === shoppinglist[i].product_name) {
                shoppinglist.splice(i, 1);
            }
        }
    }

    save_obj.saved_shoppinglist = shoppinglist;
    save_obj.saved_products = products;
    save_into_storage();
    update_lists()
}



//########################################
//*ANCHOR - Render Product list
//########################################
function render_Product_list(arr) {
    all_products.innerHTML = '';
    // Loop product list
    arr.forEach((product) => {
        let prod_container = document.createElement('div');
        let amount_label = document.createElement('p');
        let edit_button = document.createElement('div');
        let add_remove_button = document.createElement('div');
        amount_label.innerHTML = `${product.product_price} €`;
        amount_label.classList.add('amount-label');
        //* Product name div
        let product_name_div = document.createElement('div');
        product_name_div.innerHTML = product.product_name;
        product_name_div.classList.add('product-name-div');
        prod_container.appendChild(product_name_div);
        prod_container.classList.add('product');
        render_color(product, prod_container, 'prod');
        edit_button.classList.add('tile-edit-button');
        edit_button.innerHTML = '🖊️';
        // add_remove_button.innerHTML = '+ -';
        add_remove_button.classList.add('add-remove-button');

        //* Onclick for add remove btn
        add_remove_button.addEventListener('click', () => {
            //* If product is already on list
            if (!shoppinglist.includes(product)) {
                shoppinglist.unshift(product);
                product.is_on_list = true;
                product.is_open = true;
                save_obj.saved_shoppinglist = shoppinglist;
                save_into_storage();
            } else {
                //* Delete from shoppinglist
                current_product = product;
                delete_from_shoppinglist()
            }

            update_lists();
        })

        // //* On Click, push item to shopping list
        edit_button.addEventListener('click', () => {
            current_product = product;
            open_edit_modal();
        })

        prod_container.appendChild(amount_label);
        prod_container.appendChild(edit_button);
        prod_container.appendChild(add_remove_button);

        all_products.appendChild(prod_container);
    });
}

//########################################
//*ANCHOR - Save Edit changes
//########################################
btn_submit_edit.addEventListener("click", () => {
    if (inp_amount.value !== '') {
        let new_amount_raw = inp_amount.value;
        let new_amount = new_amount_raw.replace(',', '.');
        parseFloat(new_amount);
        current_product.amount = new_amount;

        for (let i = 0; i < products.length; i++) {
            if (current_product.product_name === products[i].product_name) {
                products[i].amount = new_amount;
            }
        }

        for (let i = 0; i < shoppinglist.length; i++) {
            if (current_product.product_name === shoppinglist[i].product_name) {
                shoppinglist[i].amount = new_amount;
            }
        }

        for (let i = 0; i < weeklylist.length; i++) {
            if (current_product.product_name === weeklylist[i].product_name) {
                weeklylist[i].amount = new_amount;
            }
        }
    }

    if (inp_price.value !== '') {
        let new_price_raw = inp_price.value;
        let new_price = new_price_raw.replace(',', '.');
        parseFloat(new_price);
        current_product.product_price = new_price;

        for (let i = 0; i < products.length; i++) {
            if (current_product.product_name === products[i].product_name) {
                products[i].product_price = new_price;
            }
        }

        for (let i = 0; i < shoppinglist.length; i++) {
            if (current_product.product_name === shoppinglist[i].product_name) {
                shoppinglist[i].product_price = new_price;
            }
        }

        for (let i = 0; i < weeklylist.length; i++) {
            if (current_product.product_name === weeklylist[i].product_name) {
                weeklylist[i].product_price = new_price;
            }
        }
    }

    save_obj.saved_products = products;
    save_obj.saved_shoppinglist = shoppinglist;

    save_into_storage();
    update_lists()
    close_all_modals();

})

//########################################
//*ANCHOR -  set On / Off Weekly shopping list
//########################################
to_weeklyList_ToggleButton.addEventListener('click', () => {
    const on_weekly_list_status = check_if_product_is_on_weeklyShoppingList();
    if (on_weekly_list_status === false) {
        current_product.on_weekly_list = true;

        for (let i = 0; i < products.length; i++) {
            if (current_product.product_name === products[i].product_name) {
                products[i].on_weekly_list = true;
            }
        }

        for (let i = 0; i < shoppinglist.length; i++) {
            if (current_product.product_name === shoppinglist[i].product_name) {
                products[i].on_weekly_list = true;
            }
        }

        // Zur eigenrlichen Liste hinzufügen
        weeklylist.push(current_product);
    } else {
        current_product.on_weekly_list = false;

        for (let i = 0; i < products.length; i++) {
            if (current_product.product_name === products[i].product_name) {
                products[i].on_weekly_list = false;
            }
        }

        for (let i = 0; i < shoppinglist.length; i++) {
            if (current_product.product_name === shoppinglist[i].product_name) {
                products[i].on_weekly_list = false;
            }
        }

        // aus Liste entfernen
        for (let i = 0; i < weeklylist.length; i++) {
            if (current_product.product_name === weeklylist[i].product_name) {
                weeklylist.splice(i, 1);
            }
        }
    }

    // Speichern
    save_obj.saved_products = products;
    save_obj.saved_shoppinglist = shoppinglist;
    save_obj.saved_weekly_list = weeklylist;
    save_into_storage();
})

//########################################
//*ANCHOR - check if prod is on weekly list
//########################################

function check_if_product_is_on_weeklyShoppingList() {
    const product_is_on_weekly_list = current_product.on_weekly_list;
    let on_weekly_list_status = undefined;

    if (product_is_on_weekly_list === undefined) {
        current_product.on_weekly_list = false;
        on_weekly_list_status = false;
    } else if (product_is_on_weekly_list === false) {
        on_weekly_list_status = false;
    } else {
        on_weekly_list_status = true;
    }

    return on_weekly_list_status;

}


//########################################
//*ANCHOR - Colorize Tile if is open
//########################################
function render_color(product, tile, list) {
    if (list === 'prod') {
        if (product.is_on_list === true) {
            tile.classList.add('on-list');
        } else {
            tile.classList.remove('on-list');
        }
    } else {
        if (product.is_open === true) {
            tile.classList.add('item-open');
        } else {
            tile.classList.remove('item-open');
        }
    }
}

//########################################
//*ANCHOR - Set Product at the last pos
//########################################
function set_product_at_the_end() {
    const product = current_product;
    const arrIndex = shoppinglist.indexOf(product);
    const lastPos = shoppinglist.length;
    if (arrIndex === -1) {
        shoppinglist.splice(0, 0, product);
    } else {
        shoppinglist.splice(arrIndex, 1);
        shoppinglist.splice(lastPos, 0, product);
    }
}

//########################################
//*ANCHOR - Set Product at the first pos
//########################################
function set_product_at_the_start() {
    const product = current_product;
    const arrIndex = shoppinglist.indexOf(product);
    if (arrIndex === -1) {
        shoppinglist.splice(0, 0, product);
    } else {
        shoppinglist.splice(arrIndex, 1);
        shoppinglist.splice(0, 0, product);
    }
}

//########################################
//*ANCHOR - Modal
//########################################
btn_show_list.addEventListener('click', () => {
    products_modal.classList.add('active');
    activate_xbuttons('prod_x');

    if (weeklylist.length > 0) {
        btn_trigger_weekly_list.classList.add("active");
        btn_trigger_weekly_list.innerHTML = `Wocheneinkauf (${weeklylist.length})`;
    } else {
        btn_trigger_weekly_list.classList.remove("active");
    }
});

//########################################
// ? Activate X Buttons
//########################################
function activate_xbuttons(id) {
    xbuttons.forEach((xbutton) => {
        if (xbutton.id === id) {
            xbutton.classList.add('active');
        }
    });
}

//########################################
// ? Hide x buttons
//########################################
function hide_xbuttons() {
    xbuttons.forEach((xbutton) => {
        xbutton.classList.remove('active');
    });
}

//########################################
//* close Modals
//########################################
xbuttons.forEach((xbutton) => {
    xbutton.addEventListener('click', () => {
        close_all_modals()
    });
});

//########################################
// ? Close all Modals
//########################################
function close_all_modals() {
    modals.forEach((modal) => {
        modal.classList.remove('active');
        hide_xbuttons();
        action_modal.classList.remove('active-mini');
    });
}

//########################################
//*ANCHOR - Add new Product
//########################################

btn_submit.addEventListener('click', () => {
    add_new_product();
});

//########################################
// ? Add Product if enter key is pressed
//########################################
window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        add_new_product();
    }
});

function add_new_product() {
    const new_product_name = inp_prod.value;
    if (new_product_name.length > 0) {
        let product_exists = false;
        for (let i = 0; i < products.length; i++) {
            if (new_product_name === products[i].product_name) {
                product_exists = true;
                break;
            }
        }
        if (product_exists === false) {
            const prod = new Product(
                uniqueID_Generator(),
                new_product_name,
                0.0,
            );
            prod.is_on_list = true;
            prod.is_open = true;
            products.unshift(prod);
            shoppinglist.unshift(prod)
            save_obj.saved_products = products;
            inp_prod.value = '';
            save_into_storage();
            update_lists()
            // Edit Modal
            edit_modal.classList.add('active')
            activate_xbuttons('edit_x');
            current_product = prod;
            productLabels.forEach((prod_label) => {
                prod_label.innerText = current_product.product_name;
            });
            inp_price.value = current_product.product_price;
            inp_amount.value = current_product.amount;

        } else {
            //TODO - Hier könnte man die Logik implementieren, dass das Produkt auf die Shoppinglist gesetzt wird
        }
    }
}

//########################################
// *ANCHOR - Function to give random id
//########################################
function uniqueID_Generator() {
    const rndStuff = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
        'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '$', '!', '1', '2', '3', '4', '8', '7',
        '6', '5', '9', '0', '#',
    ];
    let key = '';
    for (let i = 1; i <= 36; i++) {
        key += rndStuff[parseInt(Math.random() * rndStuff.length)];
    }
    return key;
}


//########################################
//*ANCHOR - Delete shopping list
//########################################

btn_delete_shoppinglist.addEventListener("click", () => {

    const decision = window.confirm("Sollen alle Produkte auf der Einkaufsliste entfernt werden?")

    if (decision) {
        for (let i = 0; i < shoppinglist.length; i++) {
            shoppinglist[i].is_on_list = false;
            shoppinglist[i].is_open = false;
        }
        for (let i = 0; i < products.length; i++) {
            products[i].is_on_list = false;
            products[i].is_open = false;
        }
        shoppinglist = [];
        update_lists();
        save_obj.saved_products = products;
        save_obj.saved_shoppinglist = shoppinglist;
        save_into_storage();
    }
})


//########################################
//*ANCHOR - Delete Product forever
//########################################
btn_delete_product.addEventListener("click", () => {

    const decision = window.confirm(`Soll das Produkt "${current_product.product_name}" für immer gelöscht werden?`)

    if (decision) {
        for (let i = 0; i < shoppinglist.length; i++) {
            if (current_product.product_name === shoppinglist[i].product_name) {
                shoppinglist.splice(i, 1);
            }
        }
        for (let i = 0; i < products.length; i++) {
            if (current_product.product_name === products[i].product_name) {
                products.splice(i, 1);
            }
        }
        for (let i = 0; i < weeklylist.length; i++) {
            if (current_product.product_name === weeklylist[i].product_name) {
                weeklylist.splice(i, 1);
            }
        }

        update_lists()
        save_obj.saved_products = products;
        save_obj.saved_shoppinglist = shoppinglist;
        save_obj.saved_weekly_list = weeklylist;
        save_into_storage();
        close_all_modals();
    }
})


//########################################
//*ANCHOR - Updage List and clean up
//########################################
function update_lists() {
    render_shopping_list();
    render_Product_list(products);
    inp_prod.value = '';
}




//########################################
//*ANCHOR - Filter Function for typing in product modal input field
//########################################

inp_prod.oninput = () => {
    const current_inp = inp_prod.value;
    let products_filtered = [];

    for (let i = 0; i < products.length; i++) {
        const product_name_uppercase = products[i].product_name.toUpperCase()
        const inp_uppercase = current_inp.toUpperCase()
        if (product_name_uppercase.includes(inp_uppercase)) {
            products_filtered.push(products[i])
        }
    }
    render_Product_list(products_filtered)
}


const weeklyItems_Holder = document.getElementById('weeklyItems_Holder');
const weeklyShopping_modal = document.getElementById('weeklyShopping_modal');
const weeklyShopping_x = document.getElementById('weeklyShopping_x');
const btn_save_weekly_list = document.getElementById('btn_save_weekly_list');

//*ANCHOR - Weekly List
btn_trigger_weekly_list.addEventListener('click', () => {

    //* Reset weeklyItems_Holder
    weeklyItems_Holder.innerHTML = '';

    // * Display Modal an x Btn
    weeklyShopping_modal.classList.add('active');
    weeklyShopping_x.classList.add('active');

    //* loop weekly list and generate checklist items
    weeklylist.forEach((prod, index) => {
        let itemdiv = document.createElement('div');
        itemdiv.classList.add('select-item');

        let itemInp = document.createElement('input');
        itemInp.type = 'checkbox';
        itemInp.id = prod.product_id;
        itemInp.checked = true;
        itemInp.value = true;
        itemInp.name = prod.product_name;
        itemInp.classList.add('inp-check');
        itemInp.setAttribute('data-index', index)

        let itemLabel = document.createElement('label');
        itemLabel.innerHTML = prod.product_name;
        itemLabel.setAttribute('for', prod.product_id);

        itemdiv.appendChild(itemInp);
        itemdiv.appendChild(itemLabel);

        weeklyItems_Holder.appendChild(itemdiv);
    })
})

// *ANCHOR - Add weekly products on list
btn_save_weekly_list.addEventListener('click', () => {
    const weeklyItemHoldr = document.querySelectorAll('.inp-check')
    let success_counter = 0;
    weeklyItemHoldr.forEach((item) => {
        const isChecked = item.checked;
        const name = item.name;
        if (isChecked) {
            let product_is_already_on_shoppinglist = false;

            for (let j = 0; j < shoppinglist.length; j++) {
                if (name === shoppinglist[j].product_name) {
                    product_is_already_on_shoppinglist = true;
                }
            }

            if (product_is_already_on_shoppinglist === false) {
                success_counter++;
                const weeklyListIndex = item.getAttribute('data-index');
                const product = weeklylist[weeklyListIndex];
                product.is_on_list = true;
                product.is_open = true;
                shoppinglist.push(product);

                for (let j = 0; j < products.length; j++) {
                    if (name === products[j].product_name) {
                        products[j].is_on_list = true;
                        products[j].is_open = true;
                    }
                }
            }
        }
    })

    if (success_counter === 0) {
        alert('Es konnten keine Produkte auf die Einkaufsliste gesetzt werden, da sie sich bereits auf dieser befinden')
    } else {
        alert(`${success_counter} Produkte wurden zur Einkaufsliste hinzugefügt.`);
    }

    save_obj.saved_shoppinglist = shoppinglist;
    save_obj.saved_products = products;
    save_into_storage();
    update_lists();
    close_all_modals();
})

//*ANCHOR - Mark Value when user clicks on inputfield
inp_price.addEventListener('click', ()=> {
    if (inp_price.value) {
        inp_price.select();
    }
});
inp_amount.addEventListener('click', ()=> {
    if (inp_amount.value) {
        inp_amount.select();
    }
});

//* ANCHOR - Open Setting Modal

btn_open_settings.addEventListener('click', ()=> {
    setting_modal.classList.add('active')
})


//* ANCHOR - Set Theme

themes.forEach((theme)=> {
    theme.addEventListener('click', ()=> {
        remove_selected_theme();
        const choosenTheme = theme.getAttribute('data-theme');
        save_obj.theme = choosenTheme;
        theme.classList.add('selected');
        set_Theme(choosenTheme);
        save_into_storage();
    })
})

function set_Theme(_theme = '3') {
    r.style.setProperty('--MainTheme', `var(--style-open${_theme})`);
    remove_selected_theme();
    themes.forEach((theme, index)=> {
        if(index + 1 === parseInt(_theme)) {
            theme.classList.add('selected')
        }
    })
}


function remove_selected_theme() {
    themes.forEach((theme)=> {
        theme.classList.remove('selected')
    })
}


//* ANCHOR - Close Setting Modal

setting_x.addEventListener('click', ()=> {
    setting_modal.classList.remove('active')
})


// Elemente referenzieren
const increase_amount = document.getElementById('increase_amount');
const decrease_amount = document.getElementById('decrease_amount');
const lbl_current_amount = document.getElementById('lbl_current_amount');

// Event Listener für den "➕"-Button
increase_amount.addEventListener('click', () => {
    if (current_product) {
        current_product.amount++;
        lbl_current_amount.innerText = `Menge \n ${current_product.amount}`;

        // Update in allen relevanten Listen
        updateProductAmountInLists(current_product);
        save_into_storage();
        update_lists();
    }
});

// Event Listener für den "➖"-Button
decrease_amount.addEventListener('click', () => {
    if (current_product && current_product.amount > 1) {
        current_product.amount--;
        lbl_current_amount.innerText = `Menge \n ${current_product.amount}`;

        // Update in allen relevanten Listen
        updateProductAmountInLists(current_product);
        save_into_storage();
        update_lists();
    }
});

// Funktion, um die Menge in allen Listen zu aktualisieren
function updateProductAmountInLists(product) {
    // In der Produktliste aktualisieren
    products.forEach((prod) => {
        if (prod.product_name === product.product_name) {
            prod.amount = product.amount;
        }
    });

    // In der Einkaufsliste aktualisieren
    shoppinglist.forEach((prod) => {
        if (prod.product_name === product.product_name) {
            prod.amount = product.amount;
        }
    });

    // In der Wochenliste aktualisieren
    weeklylist.forEach((prod) => {
        if (prod.product_name === product.product_name) {
            prod.amount = product.amount;
        }
    });
}