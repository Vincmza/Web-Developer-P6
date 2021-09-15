const express = require("express");
const app = express();
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");
const path = require("path");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const nocache = require("nocache");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const mongoose = require("mongoose");

/*connection to MongoDB*/
mongoose
    .connect(process.env.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

/*Headers*/
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.clientUrl);
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

/*Declare package Rate Limit to avoid too many requests in a certain amount of time*/
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 50, // No of Requests
});

app.use(express.json());
app.use(mongoSanitize());
app.use(helmet());
app.use(limiter);

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", nocache(), userRoutes);

module.exports = app;
