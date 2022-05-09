import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyparser from 'body-parser'

const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(bodyparser.json());

export default app;