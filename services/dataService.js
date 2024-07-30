const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;
const dbName = 'dummyDataDB';
const collectionName = 'dummyData';

let client;

exports.getData = async () => {
    try {
        // Ensure the MongoDB client is connected
        if (!client || !client.topology.isConnected()) {
            client = new MongoClient(mongoURI, {
                tls: true,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });
            await client.connect();
        }
        
        // Access the specified database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        // Fetch all documents from the collection
        const data = await collection.find({}).toArray();
        return data;
    } catch (error) {
        console.error('Error reading data from database:', error.message);
        throw new Error('Failed to read data');
    }
};

// Close the MongoDB connection
exports.closeConnection = async () => {
    if (client) {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
};
