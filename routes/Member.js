const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  updateProfile,
  changePassword,
} = require("../controller/memberController");
router.use(requireAuth);
router.get("/", (req, res) => {
  res.status(200).json({ msg: req.user });
});
router.put("/update-profile/:id", updateProfile);
router.put("/change-password/:id", changePassword);

module.exports = router;
