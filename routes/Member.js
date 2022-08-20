const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);
router.get("/", (req, res) => {
  res.status(200).json({ msg: req.user });
});
module.exports = router;
