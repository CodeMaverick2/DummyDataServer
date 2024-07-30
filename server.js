require('dotenv').config();
const express = require('express');
const dataRouter = require('./routes/data');
const { initializeData } = require('./initialize'); // Import the initializeData function

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route handler for API data
app.use('/api', dataRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Function to start the server and initialize data
async function startServer() {
    try {
        if (!process.env.API_KEY) {
            throw new Error('API_KEY is not defined in the environment variables');
        }

        await initializeData(); // Initialize data before starting the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server', error);
        process.exit(1);
    }
}

startServer();
