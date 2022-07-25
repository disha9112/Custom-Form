const jwt = require("jsonwebtoken");
const db = require("../../configs/db.config");

exports.logIn = (req, res) => {
  const { name, email, status } = req.body;

  db.query(`SELECT * FROM users where email = '${email}';`)
    .then((data) => {
      if (data.rows.length === 0) {
        res.status(400).json({
          error:
            "The given credentials don't exist in the database, kindly sign up",
          userExists: false,
        });
      } else if (
        name !== data.rows[0].name ||
        email !== data.rows[0].email ||
        status !== data.rows[0].status
      ) {
        res.status(400).json({
          error: "Given credentials don't match, kindly try again",
        });
      } else {
        const token = jwt.sign(
          {
            email: email,
          },
          process.env.JWT_SECRET_KEY
        );

        res.status(200).json({
          message: "User has been logged in successfully",
          token: token,
        });
      }
    })

    .catch((err) => {
      res.status(500).json({
        error: "Internal server error",
      });
    });
};
