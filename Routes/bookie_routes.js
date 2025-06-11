import { Router } from "express";
import { getBook, postBooks, updateBooks, deleteBooks, getOneBook}  from "../Controllers/bookie_controllers.js";

export const bookRouter = Router();

bookRouter.get("/books", getBook)
bookRouter.get('/books/:id', getOneBook)
bookRouter.post('/books', postBooks)
bookRouter.put('/books/:id', updateBooks)
bookRouter.delete('/books/:id', deleteBooks)