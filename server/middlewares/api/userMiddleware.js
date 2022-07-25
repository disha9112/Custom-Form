const jwt = require("jsonwebtoken");
const db = require("../../configs/db.config");

exports.verifiedToken = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    }

    const userEmail = decoded.email;

    db.query(`SELECT * FROM users WHERE email = '${userEmail}';`)

      .then((data) => {
        if (!data.rows.length) {
          res.status(400).json({
            message: "Error while verifiying given credentials",
          });
        } else {
          req.email = userEmail;
          req.name = data.rows[0].name;
          next();
        }
      })

      .catch((err) => {
        res.status(500).json({
          message: "Internal server error",
        });
      });
  });
};
