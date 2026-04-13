import User from "../models/User.js";
import Product from "../models/Product.js";

export const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    res.json({
      totalUsers,
      totalProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};