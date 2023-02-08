import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import dotenv from "dotenv";

const docrouter = Router();
dotenv.config();
const host = process.env.SWAGGER_SERVER;
const options = {
  openapi: "3.0.1",
  info: {
    title: "TROJAN-EC-BN",
    version: "1.0.0",
    description: "atlp rwanda - Trojan team",
  },
  servers: [
    {
      url: host,
    },
  ],
  basePath: "/",
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [],
  paths: {
    "/home": {
      get: {
        tags: ["homepage"],
        description: "Welcome message",
        parameters: [],
        responses: {
          200: {
            description: "successfully",
          },
        },
      },
    },
    "/signup": {
      post: {
        tags: ["User"],
        description: "User Signup",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Signup",
              },
            },
          },
        },
        responses: {
          201: {
            description: "successfully",
          },
          400: {
            description: "Bad request",
          },
          409: {
            description: "email already exists",
          },
        },
      },
    },
    "/login": {
      post: {
        tags: ["User"],
        description: "User Login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Login",
              },
            },
          },
        },
        responses: {
          200: {
            description: "successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
    "/users/password-update": {
      put: {
        tags: ["Profile"],
        description: "Update user password",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PasswordUpdate",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Signup: {
        type: "object",
        properties: {
          name: {
            type: "string",
            required: true,
            description: "name of user",
          },
          email: {
            type: "string",
            required: true,
            description: "email of user",
          },
          password: {
            type: "string",
            required: true,
            description: "password of user",
          },
        },
        example: {
          name: "Jane Doe",
          email: "janedoe@gmail.com",
          password: "janedoel250",
        },
      },
      Login: {
        type: "object",
        properties: {
          email: {
            type: "string",
            required: true,
            description: "email of user",
          },
          password: {
            type: "string",
            description: "password of user",
          },
        },
        example: {
          email: "janedoe@gmail.com",
          password: "janedoel250",
        },
      },
      PasswordUpdate: {
        type: "object",
        properties: {
          oldPassword: {
            type: "string",
            required: true,
            description: "Old user password",
          },
          newPassword: {
            type: "string",
            required: true,
            description: "New user password",
          },
          confirmPassword: {
            type: "string",
            required: true,
            description: "Confirm new user password",
          },
        },
        example: {
          oldPassword: "janedoel250",
          newPassword: "update1234",
          confirmPassword: "update1234",
        },
      },
    },
  },
};
docrouter.use("/", serve, setup(options));
export default docrouter;
