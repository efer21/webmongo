import {MongoClient} from 'mongodb';

const connection = MongoClient.connect('mongodb+srv://espy9511:Lolcito1623@cluster0.qlqnqys.mongodb.net/');

let dbtry
try {
    dbtry=await connection;
    console.log('DB is connected');
} catch (error) {
    console.log(error);
}
const db = dbtry.db('Marketplace');

export default db;

