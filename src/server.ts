import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client'; // Import Prisma Client
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const io = new Server(3100);

// Initialize Prisma Client
const prisma = new PrismaClient();

// Body-parser
app.use(bodyParser.json());

const initialiseDB = async () => {
    try {
        // Connect to PostgreSQL database using Prisma
        await prisma.$connect();
        console.log("PostgreSQL connected successfully with Prisma.");

        // Socket.io setup
        io.on('connection', (socket) => {
            console.log('User connected');
            socket.on('joinRoom', (data) => { // data looks like => {myID: "123123"}
                console.log('User joined room');
                socket.join(data.myID);
            });
        });

    } catch (err) {
        console.log('Error connecting to the database:', err);
    }
};
initialiseDB();


app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany(); // Assuming `User` model exists in Prisma schema
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching users");
    }
});

// Example API endpoint to create a user
app.post('/users', async (req, res) => {
    const { email, name } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
            },
        });
        res.json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
