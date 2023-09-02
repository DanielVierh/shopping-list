//########################################
// Variables
//########################################
let shoppinglist = [];
let products = [];

//########################################
// Elements
//########################################
const shopping_list = document.getElementById("shopping_list");
const all_products = document.getElementById("all_products");
const shopping_sum_label = document.getElementById("shopping_sum_label")
const products_modal = document.getElementById("products_modal");
const btn_show_list = document.getElementById("btn_show_list");
const inp_prod = document.getElementById("inp_prod");
const btn_submit = document.getElementById("btn_submit");
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

    calc_price() {
        const price = this.amount * this.product_price;
        return price;
    }

}

//########################################
// Create some test products
//########################################
const pizza = new Product(122, 'Pizza Magharita', 3.22);
const brot = new Product(123, 'Brot', 1.59);
const apfel = new Product(124, 'Apfel', 2.99);
const joghurt = new Product(125, 'Joghurt 3.5% Fett', 0.85)

pizza.is_on_list = true;
brot.is_on_list = true;
apfel.is_on_list = true;
joghurt.is_on_list = false;

pizza.is_open = true;
brot.is_open = true;
apfel.is_open = true;
joghurt.is_open = false;

apfel.amount = 2;


products.push(pizza);
products.push(brot);
products.push(apfel);
products.push(joghurt);

render_shopping_list();
render_Product_list();


//########################################
// Render Shopping list 
//########################################
function render_shopping_list() {
    let calculated_shopping_sum = 0;
    // Loop shopping list
    shoppinglist.forEach((product) => {
        calculated_shopping_sum += product.calc_price();

        console.log(product);

        let prod_container = document.createElement('div');
        prod_container.innerHTML = product.product_name;
        prod_container.classList.add("product");

        shopping_list.appendChild(prod_container)
    });
    shopping_sum_label.innerHTML = `${(calculated_shopping_sum).toFixed(2)} €`
}

//########################################
// Render Product list 
//########################################
function render_Product_list() {
    // Loop shopping list
    products.forEach((product) => {
        console.log(product);
        let prod_container = document.createElement('div');
        prod_container.innerHTML = product.product_name;
        prod_container.classList.add("product");
        all_products.appendChild(prod_container)
    });
}


//########################################
// Modal
//########################################
btn_show_list.addEventListener("click", ()=> {
    products_modal.classList.add("active");
    xbuttons.forEach((xbutton)=> {
        xbutton.classList.add("active");
    })
})


//########################################
//close Modals
//########################################
xbuttons.forEach((xbutton)=> {
    xbutton.addEventListener("click", ()=> {
        modals.forEach((modal)=> {
            modal.classList.remove("active")
            xbutton.classList.remove("active")
        })
    })
})

