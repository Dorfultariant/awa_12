const router = require("express").Router();
const mongoose = require("mongoose");

const Book = require("../models/Book");

router.post("/", async (req, res, next) => {
    try {
        await Book.create({
            author: req.body.author,
            name: req.body.name,
            pages: req.body.pages
        });
        res.status(200).send("Book added");
    } catch (err) {
        res.status(500).send("internal server error");
    }
});
