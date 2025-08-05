import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const REGISTER_USER = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const newUser = {
      ...req.body,
      id: uuidv4(),
      createdAt: new Date(),
      password: [passwordHash],
      liked: [],
      disliked: [],
    };

    const response = new UserModel(newUser);
    const data = await response.save();

    return res.status(201).json({ message: "User was created", user: data });
  } catch (err) {
    const DUPLICATE_ERROR_CODE = 11000;
    if (err.code === DUPLICATE_ERROR_CODE) {
      return res
        .status(409)
        .json({ message: "User with this email already exist " });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const LOGIN_USER = async (req, res) => {
  try {
    const user = await UserModel.findOneI({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        message: "Wrong email",
      });
    }

    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      { userEmail: user.email, userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.status(200).json({
      message: "Logged in successfully",
      jwt: token,
    });
  } catch (err) {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
};
