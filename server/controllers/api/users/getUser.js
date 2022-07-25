const db = require("../../../configs/db.config");

exports.getUser = async (req, res) => {
  const id = req.params.id;

  db.query(`SELECT * FROM users WHERE id = '${id}';`)
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
        message: "User details fetched successfully from the database",
        user: tableData[0],
      });
    })

    .catch((err) => {
      res.status(500).json({
        error: "Internal server error",
      });
    });
};
