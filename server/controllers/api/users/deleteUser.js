const db = require("../../../configs/db.config");

exports.deleteUser = (req, res) => {
  const id = req.params.id;

  db.query(`DELETE FROM  users WHERE id ='${id}';`)
    .then((data) => {
      res.status(200).json({
        message: "User credentials removed from database successfully",
      });
    })

    .catch((err) => {
      res.status(500).json({
        error: "Internal server error",
      });
    });
};
