const uuid = require('uuid')
const path = require('path');
const {Book, BookInfo} = require('../models/models')
const ApiError = require('../error/ApiError');


class BookController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info, legalId, amount, country} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const book = await Book.create({name, price, brandId, typeId, img: fileName, legalId, amount, country});
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    BookInfo.create({
                        title: i.title,
                        description: i.description,
                        bookId: book.id
                    })
                )
            }
            return res.json(book)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async setDescription(req, res, next) {
        try {
            let {_id,text} = req.body
           const book = await Book.update(
                {_info: text},
                {where: {id: _id}}
            );
            return res.json(book)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        try{
            let {brandId, typeId, limit, page} = req.query
            page = page || 1

            limit = limit || 2

            let offset = page * limit - limit
            let books;
            if (!brandId && !typeId) {
                books = await Book.findAndCountAll({limit, offset})
            }
            if (brandId && !typeId) {
                books = await Book.findAndCountAll({where:{brandId}, limit, offset})
            }
            if (!brandId && typeId) {
                books = await Book.findAndCountAll({where:{typeId}, limit, offset})
            }
            if (brandId && typeId) {
                books = await Book.findAndCountAll({where:{typeId, brandId}, limit, offset})
            }
            return res.json(books)
        } catch(e) {
            console.log(e)
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const book = await Book.findOne(
            {
                where: {id},
                include: [{model: BookInfo, as: 'info'}]
            },
        )
        return res.json(book)
    }

    async delOne(req, res) {
        const {id} = req.params
        const book = await Book.update(
            {amount: '0'},
            {where: {id: id}}
        )
        return res.json(book)
    }

    async updated(req, res) {
        const {_id,_amount} = req.body
        const book = await Book.update(
            {amount: _amount},
            {where: {id: _id}}
        )
        return res.json(book)
    }
}

module.exports = new BookController()
