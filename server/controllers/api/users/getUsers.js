const jwt = require("jsonwebtoken");
const db = require("../../../configs/db.config");

exports.getUsers = (req, res) => {
  db.query(`SELECT * FROM users;`)
    .then((data) => {
      const userDataArray = data.rows;

      const tableData = userDataArray.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          status: user.status,
        };
      });

      res.status(200).json({
        message: "All users retrieved successfully from the database",
        users: tableData,
      });
    })

    .catch((err) => {
      res.status(500).json({
        message: "Internal server error",
      });
    });
};
