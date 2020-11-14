const Product = require("../models/productsModel")

const productsController = {
    createProduct: async (req, res) => {
        try {

        } catch (err) {
            res.status(403).json({ message: err })
        }
    },

    getProduct: async (req, res) => {
        try {
            Product.getAll((err, rows) => {
                if (err) {
                    return res.status(403).json({ message: err })
                }
                else
                    res.status(403).json({ message: "test from controller product", data: rows })
            });

        } catch (err) {
            res.status(403).json({ message: err })
        }
    }
}

module.exports = productsController