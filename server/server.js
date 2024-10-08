require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./utils/db");
const errorMiddleWare = require('./middlewares/error-middleware');
const authRouter = require("./router/auth-router");
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const adminRoute = require("./router/admin-router");
const adminContactRoute = require("./router/contact-admin-router");
const webdevFormRoute = require("./router/webdevform-router");
const resumeReviewFormRoute = require("./router/resume-review-router");
const resumeBuildFormRoute = require("./router/resume-build-router");
const mockInterviewFormRoute = require("./router/mockInterview-router");
const newsLetterRoute = require("./router/newsLetter-router");
const forgotPasswordRoute = require('./router/forgotPassword-router');

const PORT = process.env.PORT || 5000; // Use the provided port or 5000 as a default

const corsOptions = {
    origin: "*", // Allow requests from any origin
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

app.use("/api/service", webdevFormRoute);
app.use("/api/service", resumeReviewFormRoute);
app.use("/api/service", resumeBuildFormRoute);
app.use("/api/service", mockInterviewFormRoute);

app.use("/api/admin", adminRoute);
app.use("/api/admin", adminContactRoute);

app.use("/api/newsletter", newsLetterRoute);

// Add the route for forgot password
app.use("/api/forgotpassword", forgotPasswordRoute);

app.use(errorMiddleWare);

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
