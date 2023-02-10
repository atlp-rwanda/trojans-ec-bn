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
    "/": {
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
    "/users": {
      get: {
        tags: ["User"],
        description: "Displays Account Users",
        parameters: [],
        responses: {
          200: {
            description: "successfully",
          },
        },
      },
    },
    "/users/signup": {
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
    "/users/login": {
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
    "/users/verify-email/{token}": {
      get: {
        tags: ["authentication"],
        description: "User verification",
        parameters: [     {
          name: 'token',
          in: 'path',
          type: 'string',
          description: 'verification token',
          required: true,
        },],
        responses: {
          201: {
            description: 'Email validated successfully.',

          },
          409:{
  description:'Sorry, your validation token is invalid or expired. ',

          }
        },
      },
    },
    "/users/{id}/role": {
      post: {
        tags: ["User"],
        description: "Assign user roles",
        parameters: [{ in: "path", name: "id", required: true }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Role",
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
    "/users/{id}/update-status": {
      post: {
        tags: ["User"],
        description: "Disable a user account",
        parameters: [{ in: "path", name: "id", required: true }],
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
        tags: ["User"],
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
    "/users/password-reset-request": {
      post: {
        tags: ["User"],
        description: "Reset user password",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    required: true,
                    description: "Email to send the link",
                  },
                },
                example: {
                  email: "janedoe@gmail.com",
                },
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
    "/users/password-reset/{token}": {
      post: {
        tags: ["User"],
        description: "Reset user password",
        parameters: [
          {
            in: "path",
            name: "token",
            description: "token of the user",
            required: true,
            schema: {
              type: "string",
              format: "token",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  newPassword: {
                    type: "string",
                    required: true,
                    description: "New password ",
                  },
                  confirmPassword: {
                    type: "string",
                    required: true,
                    description: "Confirm new password ",
                  },
                },
                example: {
                  newPassword: "janedoe123",
                  confirmPassword: "janedoe123",
                },
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
      Role: {
        type: "object",
        properties: {
          email: {
            type: "string",
            required: true,
            description: "email of user",
          },
          role: {
            type: "string",
            description: "role of user",
          },
        },
        example: {
          role: "seller",
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
