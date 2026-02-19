import express from 'express';
import cors from 'cors';
import rootRouter from './router/root.route.js';
import dotenv from 'dotenv';

import connectDB from './DB/config.js';



dotenv.config();
connectDB();

const app = express();


const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v6", rootRouter);


app.get('/', (req, res) => {
    res.send('server is running');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
