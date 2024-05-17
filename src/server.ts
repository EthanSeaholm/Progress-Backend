import cors from "cors";
import { IncomingMessage, ServerResponse } from "http";
import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

/**
 * This file connects the application to its backend MongoDB database.
 * If an error occurs, it will be caught and logged to the console.
 */

const port = env.PORT;

app.use(cors());

// connects application to MongoDB database
mongoose.connect(env.MONGODB_URI)
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("Server running on port: " + port);
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database: ", error);
    });

export default (req: IncomingMessage, res: ServerResponse) => {
    if (!req.url || !req.url.startsWith('/api')) {
        res.writeHead(301, {
            Location: '/api',
        });
        res.end();
        return;
    }

    return app(req, res);
};