const db = require("../../../configs/db.config");

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email, status } = req.body;

  db.query(
    `UPDATE users SET name = '${name}', email = '${email}', status = '${status}' WHERE id = '${id}';`
  )

    .then((data) => {
      res.status(200).json({
        message:
          "User credentials have been updated successfully in the database",
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Internal server error",
      });
    });
};
