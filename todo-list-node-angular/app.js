const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const identityController = require("./controllers/IdentityController").identityController;
const middleware = require("./middleware/jwt-middleware");

const identityRoutes = express.Router(null);
const todoRoutes = require("./routes/todoRoutes");
const multer  = require("multer");

const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, "uploads");
  },
  filename: (req, file, cb) =>{
    cb(null, file.originalname);
  }
});

let files = [];

app.use(multer({storage:storageConfig}).single("ffile"));

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/upload", (req, res) => {
  files.push(req.file);
  return res.status(200).json("/" + req.file.originalname)
});

app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "client/dist/todolist-angular")));

identityRoutes.post("/login", (req, res) => identityController.login(req, res));
identityRoutes.post("/register", (req, res) => identityController.register(req, res));

app.use('/api/identity', identityRoutes);

app.use('/', middleware.checkToken);

app.use("/api/todolist", todoRoutes);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/dist/todolist-angular", "index.html"));
});
