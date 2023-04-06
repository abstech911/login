import mongoose from "mongoose";
import {MongoMemoryServer} from 'mongodb-memory-server'
const connect = async ()=>{
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();

    mongoose.set('strictQuery', true);
    const db = await  mongoose.connect(getUri);
    console.log("Database Connected")
    return db;
}
export  default connect;