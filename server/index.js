require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth/auth");
const userRoutes = require("./routes/api/users/users");
const db = require("./configs/db.config");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connection established successfully");
  }
});

app.get("/", (req, res) => {
  res.status(200).send(`Server is up and running`);
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
