//########################################
// Variables
//########################################
let shoppinglist = [];
let products = [];

let save_obj = {
    saved_shoppinglist: [],
    saved_products: [],
};

let current_product;

//########################################
// Elements
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
const btn_submit_edit = document.getElementById('btn_submit_edit');



const xbuttons = document.querySelectorAll('.xbutton');
const modals = document.querySelectorAll('.modal');
const productLabels = document.querySelectorAll('.productLabel');

//########################################
// Class
//########################################
class Product {
    constructor(product_id, product_name, product_price) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.product_price = product_price;
        this.is_on_list = false;
        this.is_open = false;
        this.amount = 1;
    }
}

//########################################
// Window Onload Load Local Storage
//########################################
window.onload = init();

function init() {
    load_local_storage();
    render_shopping_list();
    render_Product_list();
    console.log('Producta', products);
    console.log('shoppinglist', shoppinglist);
}

function load_local_storage() {
    if (localStorage.getItem('stored_shopping_saveobj') != '') {
        try {
            save_obj = JSON.parse(
                localStorage.getItem('stored_shopping_saveobj'),
            );
            products = save_obj.saved_products;
            shoppinglist = save_obj.saved_shoppinglist;
        } catch (error) {
            console.log(error);
            save_obj = {
                saved_shoppinglist: [],
                saved_products: [],
            };
            save_obj.saved_products = products;
            save_obj.saved_shoppinglist = shoppinglist;
        }
    }
}

function save_into_storage() {
    localStorage.setItem('stored_shopping_saveobj', JSON.stringify(save_obj));
}

//########################################
// Render Shopping list
//########################################
function render_shopping_list() {
    shopping_list.innerHTML = '';
    let calculated_shopping_sum = 0;
    // Loop shopping list
    shoppinglist.forEach((product) => {
        try {
            const price = product.amount * product.product_price;
            calculated_shopping_sum += price;
        } catch (error) {
            console.log('Calc_error', error);
        }

        let prod_container = document.createElement('div');
        let amount_label = document.createElement('p');
        if(product.product_price > 0) {
            amount_label.innerHTML = `${product.amount} x ${product.product_price}€`;
            amount_label.classList.add("bigger-label")
        }else {
            amount_label.innerHTML = product.amount;
        }
        amount_label.classList.add('amount-label');
        prod_container.innerHTML = product.product_name;
        prod_container.classList.add('product');
        render_color(product, prod_container);
        // On Click, push item to shopping list
        prod_container.onclick = () => {
            //Öffne neues Modal und übergebe prod
            action_modal.classList.add('active-mini');
            activate_xbuttons();
            current_product = product;
            prod_modal_label.innerText = product.product_name;
        };

        prod_container.appendChild(amount_label);
        shopping_list.appendChild(prod_container);
    });
    shopping_sum_label.innerHTML = `${calculated_shopping_sum.toFixed(2)} €`;
}

//! Toggle check for product
action_check.addEventListener("click", ()=> {
    if (current_product.is_open) {
        current_product.is_open = false;
        set_product_at_the_end();
    } else {
        current_product.is_open = true;
        set_product_at_the_start();
    }
    save_obj.saved_shoppinglist = shoppinglist;
    save_into_storage();
    render_shopping_list();
    render_Product_list();
    close_all_modals();
})

//? Open Edit Modal
action_edit.addEventListener("click", ()=> {
    edit_modal.classList.add('active')
    activate_xbuttons();
    productLabels.forEach((prod_label) => {
        prod_label.innerText = current_product.product_name;
    });
    inp_price.value = current_product.product_price;
    inp_amount.value = current_product.amount;
    // window.scrollTo(0,0);
    // inp_price.focus();
})

action_delete.addEventListener('click', ()=> {
    if (current_product.is_on_list) {
        // uncheck on productlist
        for(let i = 0; i < products.length; i++) {
            if(current_product.product_name === products[i].product_name) {
                products[i].is_on_list = false;
                products[i].is_open = false;
            }
        }

        // Delete from shoppinglist
        for(let i = 0; i < shoppinglist.length; i++) {
            if(current_product.product_name === shoppinglist[i].product_name) {
                shoppinglist.splice(i, 1);
            }
        }
    }

    save_obj.saved_shoppinglist = shoppinglist;
    save_obj.saved_products = products;
    save_into_storage();
    render_shopping_list();
    render_Product_list();
    close_all_modals();
})



//########################################
// Render Product list
//########################################
function render_Product_list() {
    all_products.innerHTML = '';
    // Loop product list
    products.forEach((product) => {
        let prod_container = document.createElement('div');
        let amount_label = document.createElement('p');
        amount_label.innerHTML = product.amount;
        amount_label.classList.add('amount-label');
        prod_container.innerHTML = product.product_name;
        prod_container.classList.add('product');
        render_color(product, prod_container, 'prod');

        // On Click, push item to shopping list
        prod_container.onclick = () => {
            // If product is already on list
            if (shoppinglist.includes(product)) {
                // const decision = window.confirm(
                //     `Soll das Produkt ${product.product_name} nochmals auf die Einkaufsliste gesetzt werden? Damit ändert sich auch der Preis`,
                // );
                // if (decision) {
                //     product.amount++;
                // }
                //? Trigger for Edit Menu

                // Else add to list
            } else {
                shoppinglist.push(product);
                product.is_on_list = true;
                product.is_open = true;
                save_obj.saved_shoppinglist = shoppinglist;
                save_into_storage();
            }

            render_shopping_list();
            render_Product_list();
        };

        prod_container.appendChild(amount_label);
        all_products.appendChild(prod_container);
    });
}

//########################################
// Save Edit changes
//########################################
btn_submit_edit.addEventListener("click", ()=> {
    if(inp_amount.value !== '') {
        let new_amount_raw = inp_amount.value;
        let new_amount = new_amount_raw.replace(',', '.');
        parseFloat(new_amount);
        current_product.amount = new_amount;

        for(let i = 0; i < products.length; i++) {
            if(current_product.product_name === products[i].product_name) {
                products[i].amount = new_amount;
            }
        }

        for(let i = 0; i < shoppinglist.length; i++) {
            if(current_product.product_name === shoppinglist[i].product_name) {
                shoppinglist[i].amount = new_amount;
            }
        }
    }

    if(inp_price.value !== '') {
        let new_price_raw = inp_price.value;
        let new_price = new_price_raw.replace(',', '.');
        parseFloat(new_price);
        current_product.product_price = new_price;

        for(let i = 0; i < products.length; i++) {
            if(current_product.product_name === products[i].product_name) {
                products[i].product_price = new_price;
            }
        }

        for(let i = 0; i < shoppinglist.length; i++) {
            if(current_product.product_name === shoppinglist[i].product_name) {
                shoppinglist[i].product_price = new_price;
            }
        }
    }

    save_obj.saved_products = products;
    save_obj.saved_shoppinglist = shoppinglist;
    save_into_storage();
    render_Product_list();
    render_shopping_list();
    close_all_modals();

})


//########################################
// Colorize Tile if is open
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
// Modal
//########################################
btn_show_list.addEventListener('click', () => {
    products_modal.classList.add('active');
    activate_xbuttons();
    // window.scrollTo(0,0);
    // inp_prod.focus();
});

function activate_xbuttons() {
    xbuttons.forEach((xbutton) => {
        xbutton.classList.add('active');
    });
}

function hide_xbuttons() {
    xbuttons.forEach((xbutton) => {
        xbutton.classList.remove('active');
    });
}

//########################################
//close Modals
//########################################
xbuttons.forEach((xbutton) => {
    xbutton.addEventListener('click', () => {
        close_all_modals()
    });
});

function close_all_modals() {
    modals.forEach((modal) => {
        modal.classList.remove('active');
        hide_xbuttons();
        action_modal.classList.remove('active-mini');
    });
}

//########################################
// Add new Product
//########################################

btn_submit.addEventListener('click', () => {
    add_new_product();
});

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
            prod.is_on_list = false;
            prod.is_open = false;
            products.unshift(prod);
            save_obj.saved_products = products;
            inp_prod.value = '';
            save_into_storage();
            render_Product_list();
        } else {
            //TODO - Hier könnte man die Logik implementieren, dass das Produkt auf die Shoppinglist gesetzt wird
        }
    }
}



function uniqueID_Generator() {
    const rndStuff = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '$',
        '!',
        '1',
        '2',
        '3',
        '4',
        '8',
        '7',
        '6',
        '5',
        '9',
        '0',
        '#',
    ];
    let key = '';
    for (let i = 1; i <= 36; i++) {
        key += rndStuff[parseInt(Math.random() * rndStuff.length)];
    }
    return key;
}
