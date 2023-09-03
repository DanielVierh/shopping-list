//########################################
// Variables
//########################################
let shoppinglist = [];
let products = [];

let save_obj = {
    saved_shoppinglist: [],
    saved_products: [],
};

//########################################
// Elements
//########################################
const shopping_list = document.getElementById('shopping_list');
const all_products = document.getElementById('all_products');
const shopping_sum_label = document.getElementById('shopping_sum_label');
const products_modal = document.getElementById('products_modal');
const btn_show_list = document.getElementById('btn_show_list');
const inp_prod = document.getElementById('inp_prod');
const btn_submit = document.getElementById('btn_submit');
const xbuttons = document.querySelectorAll('.xbutton');
const modals = document.querySelectorAll('.modal');

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
// Create some test products
//########################################
// const pizza = new Product(122, 'Pizza Magharita', 3.22);
// const brot = new Product(123, 'Brot', 1.59);
// const apfel = new Product(124, 'Apfel', 2.99);
// const joghurt = new Product(125, 'Joghurt 3.5% Fett', 0.85)

// pizza.is_on_list = false;
// brot.is_on_list = false;
// apfel.is_on_list = false;
// joghurt.is_on_list = false;

// pizza.is_open = false;
// brot.is_open = false;
// apfel.is_open = false;
// joghurt.is_open = false;

// products.push(pizza);
// products.push(brot);
// products.push(apfel);
// products.push(joghurt);

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
        amount_label.innerHTML = product.amount;
        amount_label.classList.add('amount-label');
        prod_container.innerHTML = product.product_name;
        prod_container.classList.add('product');
        render_color(product, prod_container);
        // On Click, push item to shopping list
        prod_container.onclick = () => {
            if (product.is_open) {
                product.is_open = false;
            } else {
                product.is_open = true;
            }
            render_shopping_list();
            render_Product_list();
        };

        prod_container.appendChild(amount_label);
        shopping_list.appendChild(prod_container);
    });
    shopping_sum_label.innerHTML = `${calculated_shopping_sum.toFixed(2)} €`;
}

//########################################
// Render Product list
//########################################
function render_Product_list() {
    all_products.innerHTML = '';
    // Loop product list
    products.forEach((product) => {
        let prod_container = document.createElement('div');
        prod_container.innerHTML = product.product_name;
        prod_container.classList.add('product');
        render_color(product, prod_container, 'prod');

        // On Click, push item to shopping list
        prod_container.onclick = () => {
            // If product is already on list
            if (shoppinglist.includes(product)) {
                const decision = window.confirm(`Soll das Produkt ${product.product_name} nochmals auf die Einkaufsliste gesetzt werden?`)
                if(decision){
                    product.amount++;
                }
                // Else add to list
            } else {
                shoppinglist.push(product);
                product.is_on_list = true;
                product.is_open = true;
            }

            render_shopping_list();
            render_Product_list();
        };
        all_products.appendChild(prod_container);
    });
}

//########################################
// Colorize Tile if is open
//########################################
function render_color(product, tile, list) {

    if(list === 'prod') {
        if (product.is_on_list === true) {
            tile.classList.add('on-list');
        } else {
            tile.classList.remove('on-list');
        }
    }else {
        if (product.is_open === true) {
            tile.classList.add('item-open');
        } else {
            tile.classList.remove('item-open');
        }
    }


}

//########################################
// Modal
//########################################
btn_show_list.addEventListener('click', () => {
    products_modal.classList.add('active');
    xbuttons.forEach((xbutton) => {
        xbutton.classList.add('active');
    });
});

//########################################
//close Modals
//########################################
xbuttons.forEach((xbutton) => {
    xbutton.addEventListener('click', () => {
        modals.forEach((modal) => {
            modal.classList.remove('active');
            xbutton.classList.remove('active');
        });
    });
});

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
            products.push(prod);
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
