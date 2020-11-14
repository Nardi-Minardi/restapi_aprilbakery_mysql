const sql = require('../config/db');

// constructor
const Product = function (product) {
    this.name = product.name;
    this.price = product.price;
    this.image = product.image;
    this.description = product.description;
    // this.catId = product.catId;

}

Product.getAll = (result) => {
    sql.query("SELECT * FROM tb_products", (err, res) => {
        if (err) {
            console.log("err", err)
            result(null, err)
            return;
        }
        console.log("Products", res)
        result(null, res)
    });
}

module.exports = Product