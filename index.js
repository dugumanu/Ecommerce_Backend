const express = require("express");


require("dotenv").config();

const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const db = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary");
const categoryRoute = require("./route/Category");
const authRoute = require("./route/Auth");
const productRoute = require("./route/Product");
const searchRoute = require("./route/Search");
const ratingAndReview = require("./route/RatingAndReview")

const app = express();


db.connect();
app.use(express.json());
app.use(cookieParser())



app.use(
    cors({
        origin: [process.env.localhost, process.env.originUrl],
        credentials: true,
    })
);

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

app.use("/api/v1/category", categoryRoute );
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/search", searchRoute)
app.use("/api/v1/ratingandreview", ratingAndReview)




cloudinaryConnect();

app.listen(PORT, () => {
    console.log(`server started running in port number ${PORT}`)
})