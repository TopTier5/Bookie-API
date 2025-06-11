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
        type: string,
        required: true
    },
    image: {
        type: String,
    },

    category: {
        type: String,
        enum: ["fiction", "history", "romance", "academic", "religious", "personal development"]
    },

}, {timestamps: true})

export const Book = model('Book', bookSchema)

