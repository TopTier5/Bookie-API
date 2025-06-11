import { Router } from "express";
import { getBook, postBook, updateBook, deleteBook, getOneBook}  from "../Controllers/bookie_controllers.js";

export const bookRouter = Router();

bookRouter.get("/books", getBook)
bookRouter.get('/books/:id', getOneBook)
bookRouter.post('/books', postBook)
bookRouter.put('/books/:id', updateBook)
bookRouter.delete('/books/:id', deleteBook)