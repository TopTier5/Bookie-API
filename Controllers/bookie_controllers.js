import mongoose from "mongoose";
import { Book } from "../models/bookie_models.js";
import { bookSchema } from "../schemas/bookie_schema.js";


export const getBook = async (req, res) => {
    try {
        const book = await Book.find();
        //  no books found
        if (!books) {
            return res.status(404).json({
                success: false,
                message: 'No bboks found!'
            })
        }

        //  if succeeded
        return res.status(200).json({
            success: true,
            data: books,
            message: 'Books retrieved Succesfully.'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'failed to retrieve books. An unexpected error occured'
        })
    }
}


    // const book = await Book.find();
    // res.send(book);

export const getOneBook = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid book ID format."
            });
        }

        const book = await Book.findById(id);

        if (!book) {
            return res.status(400).json({
                success: false,
                message: "Book not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: book,
            message: "Book reterieved Sucesfully."
        });



        // const book = await Book.findById(req.params.id);
        // res.send(book);
    } catch (error) {
         return res.status(500).json({
                success: false,
                message: "Failed to retrieve book. An unexpected error occurred.",
                error: error.message
            });
    }
}

export const postBooks = async(req, res) => {
    try {
        const {error, value} = bookSchema.validate(req.body);
        if (error) {

            return res.status(400).json({
                success: false,
                error: error.details[0].message
            })
        }

        const addBook = await Book.create(value);
        return res.status(201).json({
            sucess: true,
            data: addBook,
            message: "Book added successfully"
        })
    } catch (error) {
        

        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to create event. An unexpected error occured"
        })
    }
}

export const updateBooks = async (req, res) => {
     try {
        const { id } = req.params;
        const updateData = req.body; // Data from the request body to update with

        // validate mongoose id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            
            return res.status(400).json({
                success: false,
                message: "Invalid book ID format."
            });
        }

        // Validate the incoming update data against your bookschema
        
        const { error, value } = bookSchema.validate(updateData); //

        if (error) {
           
            return res.status(400).json({
                success: false,
                message: error.details[0].message // Sending only the first error message
            });
        }
        // --- End of Request Body Validation ---

        // Find the event by ID and update it with the validated data
        // { new: true } option tells Mongoose to return the *updated* document
        // { runValidators: true } ensures that any Mongoose schema validators (e.g., minLength)
        // on your model run during the update operation.
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            value, // Use the validated 'value' here
            { new: true, runValidators: true }
        );

        // Check if book was not found for the given ID
        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found."
            });
        }

        // Success response
        return res.status(200).json({
            success: true,
            data: updatedBook,
            message: "Book updated successfully."
        });

    } catch (error) {
        // Log the full error object for server-side debugging
        console.error("Error updating event:", error);
        

        // Send user-friendly message to the client
        return res.status(500).json({
            success: false,
            message: "Failed to update book. An unexpected error occurred.",
            error: error
        });
    }
  
}

export const deleteBooks = async (req, res) => {
     try {
        const { id } = req.params;
        // Check if the provided 'id' is a valid MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid book ID format."
            });
        }

        const book = await Book.findByIdAndDelete(id);

        // Check if book was not found (and thus, not deleted)
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found."
            });
        }

        return res.status(200).json({ // 200 OK is fine for delete
            success: true,
            message: "Book deleted successfully."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete book. An unexpected error occurred.",
        });
    }
}




// export const postBook = async (req, res) => {

//     try {

//     }

    //     // create data in database using create method or save method
    //     const addBook = await Book.create(req.body);

    //     res.send(addBook)
    // }

    // export const updateBook = async (req, res) => {
    //     // Get the event ID from the URL parameters
    //     const { id } = req.params;
    //     const book = await Book.findByIdAndUpdate(id, req.body)
    //     if (!book) {
    //         return res.send("Book Not Found");
    //     }
    //     const updatedBook = await Book.findById(id);
    //     res.json(updatedBook);


    // }

    // export const deleteBook = async (req, res) => {
    //     const id = req.params.id;
    //     // console.log(id);
    //     const book = await Book.findByIdAndDelete(id);

    //     res.send(book)
    // }