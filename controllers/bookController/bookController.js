const express = require('express');
const app = express();
const Books = require('../../models/booksModel');


exports.getAllBooks = async (req,res,next)=>{
    try {
        const books = await Books.find({});

        if(!books) {
            res.status(404).json({
                status : 'success',
                message : "Book not found"
            });

            return;
        }

        res.status(200).json({
            status : 'success',
            data : books
        });
        
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message: error.message
        })
    }
};

exports.getBook = async (req,res,next)=>{
    try {
        let id = req.params.id;
        const book = await Books.findById(id);

        if(!book) {
            res.status(404).json({
                status : 'success',
                message : "Book not found"
            });

            return;
        }

        res.status(200).json({
            status : 'success',
            data : book
        });
        
    } catch (error) {
        res.status(400).json({
            status:'error',
            message: error.message
        })
    }
};

exports.createBook = async (req,res,next)=>{
    try {
        const book = await Books.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                book
            }
        });

    } catch (error) {
        res.status(400).json({
            status:'fail',
            message: error.message
        })
    }
};

exports.updateBook = async (req,res,next)=>{
    try {
        let id = req.params.id;
        const updatedBook = await Books.findByIdAndUpdate(id , req.body);

        if(!updatedBook)
        {
            res.status(404).json({
                status:'fail',
                message: 'Book not found with this id'
            });

            return;
        }

        res.status(200).json({
            status : 'success',
            data : updatedBook
        });
        
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message: error.message
        })
    }
};

exports.deleteBook = async (req,res,next)=>{
    try {
        let id = req.params.id;
        const deletedBook = await Books.findByIdAndDelete(id);

        if(!deletedBook)
        {
            res.status(404).json({
                status:'fail',
                message: 'Book not found with this id'
            });

            return;
        }

        res.status(200).json({
            status : 'success',
            message : "Movie deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            status:'fail',
            message: error.message
        })
    }
};

