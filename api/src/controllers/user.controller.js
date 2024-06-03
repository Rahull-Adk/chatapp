import { User } from "../models/user.model.js";
const register = async (req, res) => {
  const { username, email, password, conformPassword } = req.body;
  if (
    [username, email, password, conformPassword].some(
      (field) => field.trim() === ""
    )
  ) {
    return res.json({ errorMessage: "All fields are required" });
  }
  if (password.length < 6) {
    return res.json({ errorMessage: "Password must be atlest 6 character" });
  }
  if (password !== conformPassword) {
    return res.json({
      errorMessage: "Passwords didn't  match",
    });
  }
  if (!email.includes("@")) {
    return res.json({ errorMessage: "Invalid email" });
  }
  const userCheck = await User.findOne({ $or: [{ username }, { email }] });
  if (userCheck) {
    return res.json({ errorMessage: "Username or email already exists" });
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const responseUser = await User.findById(user._id).select(
    "-password -conformPassword"
  );
  res
    .status(200)
    .json({ message: "User successfully registered!", responseUser });
};

export { register };
