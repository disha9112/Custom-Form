const jwt = require("jsonwebtoken");
const db = require("../../configs/db.config");

exports.signUp = (req, res) => {
  const { name, email, status } = req.body;

  db.query(`SELECT * FROM users WHERE email = '${email}';`)
    .then((data) => {
      if (data.rows.length !== 0) {
        res.status(400).json({
          error: "The given credentials already exist in the database",
          userExists: true,
        });
      } else if (!name || !email || !status) {
        res.status(400).json({
          error: "All fields are mandatory",
        });
      } else {
        const user = {
          name,
          email,
          status,
        };

        db.query(
          `INSERT INTO users (name, email, status) VALUES ('${user.name}', '${user.email}', '${user.status}');`
        )

          .then((data) => {
            const token = jwt.sign(
              {
                email: email,
              },
              process.env.JWT_SECRET_KEY
            );

            res.status(200).json({
              message:
                "Credentials of the new user have been added successfully",
              token: token,
            });
          })

          .catch((err) => {
            res.status(500).json({
              error: "Internal server error",
            });
          });
      }
    })

    .catch((err) => {
      res.status(500).json({
        error: "Internal server error",
      });
    });
};
