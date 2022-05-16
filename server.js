require("dotenv").config();
const express = require("express");
const upload = require("express-fileupload");
const s3 = require("../../config/aws_s3");

const path = require("path");
const bucket_params = {
  Bucket: "trendy.blinklinksolutions.com",
  ACL: "public-read",
};

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: true, limit: "300mb" }));

//files
app.use(upload({}));
app.get("/", (req, res) => res.send("upload server running"));
app.post("/", async (req, res) => {
  try {
    let photo = files[`file`];
    const ext = path.extname(photo.name);
    const params = {
      ...bucket_params,
      Key: `${req.body.name}${ext}`,
      Body: photo.data,
    };
    const result = await s3.upload(params).promise();
    res.json({ url: result.location });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
app.listen(8080, () => {
  console.log("server running at 8080");
});
