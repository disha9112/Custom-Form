const express = require("express");
const router = express.Router();
const { getUsers } = require("../../../controllers/api/users/getUsers");
const { deleteUser } = require("../../../controllers/api/users/deleteUser");
const { updateUser } = require("../../../controllers/api/users/updateUser");
const { getUser } = require("../../../controllers/api/users/getUser");

const { verifiedToken } = require("../../../middlewares/api/userMiddleware");

router.get("/getUsers", getUsers);
router.get("/getUser/:id", verifiedToken, getUser);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateUser/:id", updateUser);

module.exports = router;
