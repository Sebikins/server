const { Book, BasketBook, Basket } = require("../models/models")

class BasketController {
    // ------ CRUD корзины ------ //

    async addToBasket(req,res,next){
        const user = req.user
        const {bookId} = req.body
        const basket = await BasketBook.create({basketId : user.id, bookId : bookId})
        return res.json(basket)
    }

    async getBasketUser(req,res){
        const {id} = req.user
        const basket = await BasketBook.findAll({include: {
                model: Book
            }, where: {basketId: id}})
        if(!basket) res.status(400).json('None Id')
        return res.json(basket)
    }

    async deleteBasket (req, res) {
        const {id} = req.body
        if(!id) res.status(400).json('None Id')
            await BasketBook.destroy({where: {id: id}})
        res.status(200).json('Product deleted')
    }

}

module.exports = new BasketController()