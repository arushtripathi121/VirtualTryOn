const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectToDb } = require('./config/database');
const router = require('./routers/router');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());

connectToDb();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
)
app.use("/", router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`The app is running on port: ${PORT}`);
});
