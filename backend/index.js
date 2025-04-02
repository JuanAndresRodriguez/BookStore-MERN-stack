import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoutes.js';


const app = express();

// Middelware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow ALL Origins with default cors(*)
// app.use(cors(*));
// Option 2: Allow custom Origins
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send(`Server is up running on ${PORT}`)
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL).then(() => {
    console.log('Connected to Data Base');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});