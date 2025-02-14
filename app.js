const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");

const app = express();
const contactsRouter = require("./app/routes/contact.route");

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

//handle 404 response
app.use((req,res, next) => {
    //code se chay khi khong route duoc dinh nghia nao
    //khop voi yeu cau. Goi next() de chuyen sang middleware xu ly loi
    return next(new ApiError(404, "Resource not found"));
});
//define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    //Middleware xu ly loi tap trung
    //trong doan code xu ly o cac route, goi next(error) se chuyen ve middleware xu ly loi nay
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application."});
});
module.exports = app;
