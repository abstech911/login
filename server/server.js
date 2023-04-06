import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import connect from "./database/conn.js";

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

/** Start Server only when we have valid DB connection */
connect()
    .then(() => {
        try {
            app.listen(port, () => {
                console.log(`Server connected to http://localhost:${port}`);
            })
        } catch (e) {
            console.log(`Cannot connect to the server ${e}`);
        }
    })
    .catch((e) => {
        console.log(`(Invalid database connection) ${e}`);

    })
