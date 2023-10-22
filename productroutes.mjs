import express from 'express';
import db from './dbconn.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();

const getProductCollection = () => db.collection('product');
const toObjectId = id => new ObjectId(id);

const sendError = (res, statusCode, message) => {
    res.status(statusCode).send(message);
};


router.get('/', async (req, res) => {
    let collection = await db.collection('product').find({}).toArray();
    res.send(collection);
});

router.get('/', async (req, res) => {
    if (req.query.name) {
        const query = {
            name: { $regex: new RegExp(req.query.name, 'i') } // case-insensitive search
        };
        const products = await getProductCollection().find(query).toArray();
        if (!products.length) return sendError(res, 404, 'No products found with the given name keyword');
        res.send(products);
    } else {
        const allProducts = await getProductCollection().find({}).toArray();
        res.send(allProducts);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const product = await getProductCollection().findOne({ _id: toObjectId(id) });
    product ? res.send(product) : sendError(res, 404, "Product not found");
});

router.post('/', async (req, res) => {
    const { body } = req;
    const result = await getProductCollection().insertOne(body);
    result ? res.send(result) : sendError(res, 500, 'Insert not successful');
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const result = await getProductCollection().updateOne({ _id: toObjectId(id) }, { $set: body });
    result ? res.send(result) : sendError(res, 500, 'Update not successful');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await getProductCollection().deleteOne({ _id: toObjectId(id) });
    result ? res.send(result) : sendError(res, 500, 'Delete not successful');
});

router.delete('/', async (req, res) => {
    const result = await getProductCollection().deleteMany({});
    result ? res.send(result) : sendError(res, 500, 'Delete not successful');
});

export default router;
