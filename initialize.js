const { MongoClient } = require('mongodb');
const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const mongoURI = process.env.MONGODB_URI;
const dbName = 'dummyDataDB';
const collectionName = 'dummyData';

const initializeData = async () => {
    let client;
    try {
        if (!apiKey) {
            throw new Error('API_KEY is not defined in the environment variables');
        }

        if (!mongoURI) {
            throw new Error('MONGODB_URI is not defined in the environment variables');
        }

        client = new MongoClient(mongoURI, {
            tls: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const count = await collection.countDocuments();
        if (count > 0) {
            console.log('Data already exists in the database. Skipping initialization.');
            return;
        }

        console.log('Fetching data from API...');
        const response = await axios.get(apiKey);
        const dummyData = response.data;

        await collection.insertMany(dummyData);
        console.log('Data fetched and stored successfully');
    } catch (error) {
        console.error('Error initializing data:', error.message);
        throw error;
    } finally {
        if (client) {
            await client.close();
            console.log('Disconnected from MongoDB');
        }
    }
};

// Exporting the initializeData function for use in other files
module.exports = { initializeData };
