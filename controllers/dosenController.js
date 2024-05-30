const Users = require("../models/UserModel.js");

exports.getNilai = async (req, res) => {
  try {
    // Assuming user ID is stored in req.userId (this would typically come from a middleware that verifies the JWT)
    const userId = req.userId;

    const user = await Users.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Render the profile page with user data
    res.render("dosen/nilai", {
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
