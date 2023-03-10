const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require('compression')
const os = require('os');
const cluster = require("cluster");

const { message } = require("./functions/message");
const { NOT_FOUND, OK } = require("./functions/messageType");


//environment variable or you can say constants
env.config();

//mongodb connection
mongoose.set("strictQuery", true);
mongoose.connect(
    `${process.env.MONGO_DB_URL}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => {
    console.log('Database connected')
});
mongoose.set('debug', false)

// cors
app.use(cors());


// parse requests 
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


// compress all responses
app.use(compression({
    level: 6,
    threshold: 10 * 1000,
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false
        }
        return compression.filter(req, res)
    }
}))


//routes

// default route
app.get("/", (req, res) => {
    message(res, OK, "Welcome to the Official SkillUp API");
});

// user CRUD routes

const userRoutes = require("./routes/user.routes");

app.use("/user", userRoutes);


// company CRUD routes

const companyRoutes = require("./routes/company.routes");

app.use("/company", companyRoutes);

// certificate routes

const certificateRoutes = require("./routes/certificate.routes");

app.use("/certificate", certificateRoutes);


// question routes

const questionRoutes = require("./routes/question.routes");

app.use("/question", questionRoutes);




// non existing routes
app.all("*", (req, res) => {
    message(res, NOT_FOUND, "Route does not exist");
});


// app listen 


//export app for vercel

module.exports = app;