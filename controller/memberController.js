const {
  updateProflieModel,
  changePasswordModel,
} = require("../model/memberModel");

const updateProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await updateProflieModel({ id, obj: req.body });
    res.status(200).json({ mes: user.value });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const changePassword = async (req, res) => {
  const { id } = req.params;
  if (
    !req.body.password ||
    !req.body.newPassword ||
    !req.body.confirmPassword
  ) {
    return res.status(400).json({ mess: "Please fill all the field" });
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return res
      .status(400)
      .json({ mess: "New password and confirm password must be same" });
  }
  try {
    const user = await changePasswordModel({ id, obj: req.body });
    res.status(200).json({ mes: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { updateProfile, changePassword };
