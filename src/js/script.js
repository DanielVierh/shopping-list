//########################################
//? Variables
//########################################
let shoppinglist = [];
let products = [];

let save_obj = {
    saved_shoppinglist: [],
    saved_products: [],
};

let current_product;

//########################################
//? Elements
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
const btn_delete_shoppinglist = document.getElementById("btn_delete_shoppinglist")
const btn_delete_product = document.getElementById("btn_delete_product")



const xbuttons = document.querySelectorAll('.xbutton');
const modals = document.querySelectorAll('.modal');
const productLabels = document.querySelectorAll('.productLabel');


//########################################
//? Class
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
//? Init
//########################################

window.onload = init();

function init() {
    load_local_storage();
    update_lists()
}

//########################################
//? Window Onload Load Local Storage
//########################################
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

//########################################
//? Save to local Storage
//########################################
function save_into_storage() {
    localStorage.setItem('stored_shopping_saveobj', JSON.stringify(save_obj));
}

//########################################
//? Render Shopping list
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
// //? Toggle check for product
//########################################
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
    update_lists()
    close_all_modals();
})

//########################################
// //? Open Edit Modal
//########################################

action_edit.addEventListener("click", ()=> {
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
}

//########################################
//? Event Listener for remove button
//########################################
action_delete.addEventListener('click', ()=> {
    delete_from_shoppinglist();
    close_all_modals();
})

//########################################
//? Remove one product from shopping list
//########################################
function delete_from_shoppinglist() {
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
    update_lists()
}



//########################################
//? Render Product list
//########################################
function render_Product_list(arr) {
    all_products.innerHTML = '';
    // Loop product list
    arr.forEach((product) => {
        let prod_container = document.createElement('div');
        let amount_label = document.createElement('p');
        let edit_button = document.createElement('div');
        amount_label.innerHTML = product.amount;
        amount_label.classList.add('amount-label');
        prod_container.innerHTML = product.product_name;
        prod_container.classList.add('product');
        render_color(product, prod_container, 'prod');
        edit_button.classList.add('tile-edit-button');
        edit_button.innerHTML = 'bearbeiten';

        //? On Click, push item to shopping list
        prod_container.onclick = () => {
            // If product is already on list
            if (!shoppinglist.includes(product)) {
                shoppinglist.push(product);
                product.is_on_list = true;
                product.is_open = true;
                save_obj.saved_shoppinglist = shoppinglist;
                save_into_storage();
            }else {
                //? Delete from shoppinglist
                current_product = product;
                delete_from_shoppinglist()
            }

            update_lists();
        };

        edit_button.addEventListener('click', ()=> {
            current_product = product;
            open_edit_modal()
        })

        //prod_container.appendChild(amount_label);
        prod_container.appendChild(edit_button);

        all_products.appendChild(prod_container);
    });
}

//########################################
//? Save Edit changes
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
    update_lists()
    close_all_modals();

})


//########################################
//? Colorize Tile if is open
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
//? Set Product at the last pos
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
//? Set Product at the first pos
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
//? Modal
//########################################
btn_show_list.addEventListener('click', () => {
    products_modal.classList.add('active');
    activate_xbuttons('prod_x');
});

//########################################
// ? Activate X Buttons
//########################################
function activate_xbuttons(id) {
    xbuttons.forEach((xbutton) => {
        if(xbutton.id === id) {
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
//? close Modals
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
//? Add new Product
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
// ? Function to give random id
//########################################
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


//########################################
// ? Delete shopping list
//########################################

btn_delete_shoppinglist.addEventListener("click", ()=> {

    const decision = window.confirm("Sollen alle Produkte auf der Einkaufsliste entfernt werden?")

    if(decision) {
        for(let i = 0; i < shoppinglist.length; i++) {
            shoppinglist[i].is_on_list = false;
            shoppinglist[i].is_open = false;
        }
        for(let i = 0; i < products.length; i++) {
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
// ? Delete Product forever
//########################################
btn_delete_product.addEventListener("click", ()=> {

    const decision = window.confirm(`Soll das Produkt "${current_product.product_name}" für immer gelöscht werden?`)

    if(decision) {
        for(let i = 0; i < shoppinglist.length; i++) {
            if(current_product.product_name === shoppinglist[i].product_name) {
                shoppinglist.splice(i, 1);
            }
        }
        for(let i = 0; i < products.length; i++) {
            if(current_product.product_name === products[i].product_name) {
                products.splice(i, 1);
            }
        }

        update_lists()
        save_obj.saved_products = products;
        save_obj.saved_shoppinglist = shoppinglist;
        save_into_storage();
        close_all_modals();
    }
})


//########################################
//? Updage List and clean up
//########################################
function update_lists(){
    render_shopping_list();
    render_Product_list(products);
    inp_prod.value = '';
}




//########################################
//? Filter Function for typing in product modal input field
//########################################

inp_prod.oninput = ()=> {
    const current_inp = inp_prod.value;
    let products_filtered = [];

    for(let i = 0; i < products.length; i++) {
        if(products[i].product_name.includes(current_inp)) {
            products_filtered.push(products[i])
        }
    }
    render_Product_list(products_filtered)
}
