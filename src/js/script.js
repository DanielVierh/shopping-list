let shoppinglist = [];

class Product {
    constructor(product_id, product_name, product_price) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.product_price = product_price;
        this.is_on_list = false;
        this.is_open = false;
    }

}

const pizza = new Product(122, 'Pizza Magharita', 3.22)
const brot = new Product(123, 'Brot', 1.59)
const apfel = new Product(124, 'Apfel', 2.99)

pizza.is_on_list = true;
brot.is_on_list = true;
apfel.is_on_list = true;    

pizza.is_open = true;
brot.is_open = true;
apfel.is_open = true;    


shoppinglist.push(pizza)
shoppinglist.push(brot)
shoppinglist.push(apfel)

render_shopping_list()





function render_shopping_list() {
    shoppinglist.forEach((product) => {
        console.log(product);
    })
}
