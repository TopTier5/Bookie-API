import { Schema,model } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    publicationYear: {
        type: Date,
        required: true
    },
    image: {
        type: String,
    }

    category: {
        type: String,
        enum: ["fiction", "history", "romance", "academic", "religious"]
    }

}, {timestamps: true})

export const Book = model('Book', bookSchema)

