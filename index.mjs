import express from 'express';
import cors from 'cors';
const app = express();
import router from './productroutes.mjs';

app.use(cors());
app.use(express.json());

app.use('/api/products', router);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the DressStore Application' });
    });

app.listen(8080, () => {
    console.log('Server started on port 8080');
    });
