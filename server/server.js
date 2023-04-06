import express from 'express';
import cors from 'cors'
import morgan from 'morgan';

const app = express();

/** Middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');


const port = 8080;

/*HTTP GET REQUEST*/
app.get('/', (req, res) => {
    return res.status(201).json("Home GET Request")
})

/** Start Server */
app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`);
})