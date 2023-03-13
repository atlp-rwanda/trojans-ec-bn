/* eslint-disable no-else-return, require-jsdoc */
import UserServices from "../services/userService";
import TwoFactorAuthenticator from "../utils/send2FA";
import generateRandom from "../utils/generateRandom";
import SendEmail from "../utils/email";
import JwtUtil from "../utils/generateToken";
import checkPasswordExpired from "../utils/isPasswordExpired";

class UserController {
  static async register(req, res) {
    try {
      const {
        name,
        email,
        password,
        gender,
        birthdate,
        preferredLanguage,
        preferredCurrency,
        street,
        city,
        province,
        postalCode,
        country,
      } = req.body;
      const billingAddress = JSON.stringify({
        street,
        city,
        province,
        postalCode,
        country,
      });
      const userData = {
        name,
        email,
        password,
        gender,
        birthdate,
        preferredLanguage,
        preferredCurrency,
        billingAddress,
      };
      const response = await UserServices.register(userData);
      return res.status(201).json({ status: 201, user: response });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async login(req, res) {
    try {
      const {
        name,
        email,
        role,
        status,
        id,
        profilePic,
        lastTimePasswordUpdated,
      } = req.user;

      const expiredPassword = checkPasswordExpired(lastTimePasswordUpdated);
      if (expiredPassword) {
        if (role === "seller" || role === "admin") {
          const randomAuth = generateRandom();
          const Options = { expiresIn: "120000" };
          const token = JwtUtil.generate(
            {
              name,
              email,
              role,
              status,
              id,
              profilePic,
              randomAuth,
              lastTimePasswordUpdated,
            },
            Options
          );
          await new SendEmail(req.user, null, randomAuth).twoFactorAuth();
          return res.status(200).json({
            name,
            message:
              "Your password is expired, Please update it first to have full access!",
            token,
            randomAuth,
          });
        } else {
          const token = JwtUtil.generate({
            name,
            email,
            id,
            role,
            status,
            profilePic,
            lastTimePasswordUpdated,
          });
          return res.status(200).json({
            name,
            message:
              "Your password is expired, Please update it first to have full access!",
            token,
          });
        }
      }
      if (!expiredPassword) {
        if (role === "seller" || role === "admin") {
          const randomAuth = generateRandom();
          const Options = {
            expiresIn: "120000",
          };
          const token = JwtUtil.generate(
            {
              name,
              email,
              role,
              status,
              id,
              profilePic,
              randomAuth,
              lastTimePasswordUpdated,
            },
            Options
          );
          await new SendEmail(req.user, null, randomAuth).twoFactorAuth();
          return res.status(200).json({ name, token, randomAuth });
        } else {
          const token = JwtUtil.generate({
            name,
            email,
            id,
            role,
            status,
            profilePic,
            lastTimePasswordUpdated,
          });
          return res.status(200).json({ name, token });
        }
      }
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, message: error });
    }
  }

  // eslint-disable-next-line camelcase
  static async verify_email(req, res) {
    const { token } = req.params;

    const response = await UserServices.updateUserStatus(token);
    return res.status(200).json({ status: 200, response });
  }

  static async logout(req, res) {
    try {
      await UserServices.logout(req.headers.authorization);
      return res
        .status(200)
        .json({ status: 200, message: "You are logged out" });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error });
    }
  }

  static async updatePassword(req, res) {
    try {
      await UserServices.updatePassword(req.user);
      return res.status(200).json({ status: 200, message: "Password updated" });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server Error" });
    }
  }

  static async resetRequest(req, res) {
    try {
      const { email } = req.body;
      const response = await UserServices.resetRequest(email);
      if (!response) {
        return res
          .status(403)
          .json({ status: 403, message: "Email couldn't be verified" });
      }
      return res.status(200).json({
        status: 200,
        message: "Request complete",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 500, error: "server error" });
    }
  }

  static async getReset(req, res) {
    try {
      return res.status(200).json({ details: req.user });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, error: "server error" });
    }
  }

  static async resetpassword(req, res) {
    try {
      const data = {
        password: req.body.newPassword,
        email: req.user.email,
      };
      await UserServices.resetpassword(data);
      return res.status(200).json({ status: 200, message: "Password updated" });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "server error" });
    }
  }

  static async getUsers(req, res) {
    try {
      const response = await UserServices.getUsers();
      return res.status(200).json({ status: 200, users: response });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async assignRole(req, res) {
    try {
      const { role } = req.body;
      const { id } = req.params;
      await UserServices.assignRole(role, id);
      return res.status(200).json({
        message: "role assigned",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "server error",
      });
    }
  }

  static async disableAccount(req, res) {
    try {
      const response = await UserServices.disableAccount(req.params.id);
      return res.status(200).json({
        status: 200,
        message: `User was successfully ${response}`,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "server error",
      });
    }
  }

  static async Validate(req, res) {
    try {
      const response = await TwoFactorAuthenticator.validateTwoFacor(req);
      if (response.value) {
        return res.status(200).json({
          status: 200,
          token: response.newToken,
          message: "authentication was successful",
        });
      } else {
        return res.status(400).json({ status: 400, data: response.message });
      }
    } catch (err) {
      res.status(500).json({ status: 500, message: err.message });
    }
  }

  static async googleAuth(req, res) {
    try {
      const response = await UserServices.googleAuth(req.user);
      if (response === "not verified") {
        return res.status(401).json({
          status: 401,
          message: "User not verified",
        });
      } else {
        return res.status(200).json({
          status: 200,
          name: response.name,
          token: response.token,
        });
      }
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async updateProfile(req, res) {
    try {
      const data = {};
      data.email = req.user.email;
      if (req.file) {
        data.profilePic = req.file.path;
      }
      const {
        preferredCurrency,
        preferredLanguage,
        street,
        city,
        province,
        postalCode,
        country,
      } = req.body;
      const billingAddress = JSON.stringify({
        street,
        city,
        province,
        postalCode,
        country,
      });
      data.preferredCurrency = preferredCurrency;
      data.preferredLanguage = preferredLanguage;
      data.billingAddress = billingAddress;

      await UserServices.updateProfile(data);
      return res
        .status(200)
        .json({ status: 200, message: "Updated successfully" });
    } catch (error) {
      return res.status(500).json({ status: 500, message: "Server error" });
    }
  }
}

export default UserController;
