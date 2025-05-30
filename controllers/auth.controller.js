const { sendErrorResponse } = require("../helpers/send.error.response");
const Role = require("../models/role.model");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { authorJwtService } = require("../services/jwt.service");
const config = require("config");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Role,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    if (!user) {
      return sendErrorResponse({ message: "Email or password incorrect" }, res);
    }

    const verifiedPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );
    if (!verifiedPassword) {
      return sendErrorResponse({ message: "Email or password incorrect" }, res);
    }

    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    const tokens = authorJwtService.generateTokens(payload);

    const hashed_token = await bcrypt.hash(tokens.accessToken, 7);

    user.hashed_token = hashed_token;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time_author"),
    });

    res
      .status(200)
      .send({ message: "User logged in", accessToken: tokens.accessToken });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }

    const decodedToken = await authorJwtService.verifyRefreshToken(
      refreshToken
    );
    const user = await User.update(
      { hashed_token: null },
      { where: { id: decodedToken.id }, returning: true }
    );
    if(!user){
      return sendErrorResponse({ message: "Token noto'g'ri" }, res);
    }
    const auth = await User.findOne(
      {
        refresh_token: refreshToken,
      },
      {
        refresh_token: "",
      },
      { new: true }
    );

    if (!auth) {
      return res.status(400).send({ message: "Token noto'g'ri" });
    }

    res.clearCookie("refreshToken");
    res.send({ auth });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }

    await authorJwtService.verifyRefreshToken(refreshToken);

    const user = await User.findOne({
      refresh_token: refreshToken,
      include: [
        {
          model: Role,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    if (!user) {
      return res.status(401).send({ message: "Refresh token not found" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      roles: user.roles,
    };

    const tokens = authorJwtService.generateTokens(payload);
    user.refresh_token = tokens.refreshToken;
    await user.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time_author"),
    });
    return res.status(201).send({
      message: "Tokens updated",
      id: user.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res)
  }
};

module.exports = {
  login,
  logout,
  refreshToken,
};
