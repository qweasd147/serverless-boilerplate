import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

//handle error. 라우터에서 throw err이 실행되면 이 코드가 실행됨
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;