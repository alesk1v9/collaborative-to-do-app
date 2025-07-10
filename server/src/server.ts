import express from 'express';
import sequelize from './config/connection';
import routes from './routes/index';
import dotenv from 'dotenv';
import { corsMiddleware } from './middleware/corsMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle CORS
app.use(corsMiddleware);

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false, alter: true }).then(() => { 
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});