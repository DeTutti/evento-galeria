const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.post("/upload", upload.single("foto"), (req, res) => {
  const ext = path.extname(req.file.originalname);
  const newPath = path.join("uploads", req.file.filename + ext);
  fs.renameSync(req.file.path, newPath);
  res.redirect("/");
});

app.get("/fotos", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) return res.json([]);
    res.json(files);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Servidor funcionando en puerto", port));
