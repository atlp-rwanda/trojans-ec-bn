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
          401: {
            description: "Unauthorized",
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
    "/users/logout": {
      get: {
        tags: ["User"],
        description: "User Logout",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Successfully",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
    "/users/profile": {
      patch: {
        tags: ["User"],
        summary: "Profile update",
        description:
          "You can choose application/json if you do not need to update a profile picture",
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  profilePic: {
                    type: "string",
                    required: true,
                    format: "binary",
                    description: "A profile picture",
                  },
                  preferredLanguage: {
                    type: "string",
                    required: true,
                    description: "prefered language of the user",
                  },
                  preferredCurrency: {
                    type: "string",
                    required: true,
                    description: "prefered currency of the user",
                  },
                  province: {
                    type: "string",
                    required: true,
                    description:
                      "province/state depending on the country's system",
                  },
                  city: {
                    type: "string",
                    required: true,
                    description: "The current living city",
                  },
                  postalCode: {
                    type: "string",
                    required: true,
                    description:
                      "postal/zip code depending on the country's system",
                  },
                  street: {
                    type: "string",
                    required: true,
                    description: "Street address/number",
                  },
                  country: {
                    type: "string",
                    required: true,
                    description: "The country of living",
                  },
                },
              },
            },
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateProfile",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Updated successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Not logged in",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/users/verify-email/{token}": {
      get: {
        tags: ["authentication"],
        description: "User verification",
        parameters: [
          {
            name: "token",
            in: "path",
            type: "string",
            description: "verification token",
            required: true,
          },
        ],
        responses: {
          201: {
            description: "Email validated successfully.",
          },
          409: {
            description: "Sorry, your validation token is invalid or expired. ",
          },
        },
      },
    },
    "/users/{id}/role": {
      patch: {
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
    "/users/{Token}/auth/validate": {
      post: {
        tags: ["User"],
        description: "authentication a user using a two factor authenticator",
        parameters: [
          {
            in: "path",
            name: "Token",
            description: "id for the User",
            required: true,
            schema: {
              type: "string",
              format: "id",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Authentication",
              },
            },
          },
        },
        responses: {
          200: {
            description: "successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/products": {
      post: {
        tags: ["Product"],
        description: "creating/adding an item to sell",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "internal server error",
          },
        },
      },
      get: {
        tags: ["Product"],
        description: "Viewing all items/products",
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "internal server error",
          },
        },
      },
    },
    "/products/{id}": {
      get: {
        tags: ["Product"],
        description: "Viewing a single item/product",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "id of the product",
            required: true,
            schema: {
              type: "number",
              format: "number",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "internal server error",
          },
        },
      },
      patch: {
        tags: ["Product"],
        description: "Marking item/product as available",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "id of the product",
            required: true,
            schema: {
              type: "number",
              format: "number",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "internal server error",
          },
        },
      },
      delete: {
        tags: ["Product"],
        description: "Deleting item/product",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "id of the product",
            required: true,
            schema: {
              type: "number",
              format: "number",
            },
          },
        ],
        responses: {
          204: {
            description: "Success",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "internal server error",
          },
        },
      },
      put: {
        tags: ["Product"],
        description: "Updating a product/item",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "id of the product",
            required: true,
            schema: {
              type: "number",
              format: "number",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "internal server error",
          },
        },
      },
    },
    "/categories": {
      post: {
        tags: ["Product"],
        description: "Adding a category",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "Name of the category",
                    example: "retail",
                  },
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
            description: "Bad Request",
          },
          500: {
            description: "Internal server error",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
      get: {
        tags: ["Product"],
        description: "Viewing categories",
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/categories/{id}": {
      delete: {
        tags: ["Product"],
        description: "Adding a category",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "id of the product",
            required: true,
            schema: {
              type: "number",
              format: "number",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal server error",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
    "/productWishes": {
      post: {
        tags: ["WishList"],
        description: "add/remove product to wishList",
        parameters: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  product_id: {
                    type: "number",
                    required: true,
                    description: "product id ",
                  },
                },
                example: {
                  product_id: 1,
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "internal server error",
          },
        },
      },
      get: {
        tags: ["WishList"],
        description: "get products in wishList",
        parameters: [],
        requestBody: {},
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "internal server error",
          },
        },
      },
    },

    "/users/{id}/productWishes": {
      get: {
        tags: ["WishList"],
        description: "get product from wishList by UserId",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "id for the User",
            required: true,
            schema: {
              type: "number",
              format: "id",
            },
          },
        ],
        requestBody: {},
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "internal server error",
          },
        },
      },
    },

    "/products/{id}/productWishes": {
      get: {
        tags: ["WishList"],
        description: "get product from wishList by UserId",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "id for the User",
            required: true,
            schema: {
              type: "number",
              format: "id",
            },
          },
        ],
        requestBody: {},
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "internal server error",
          },
        },
      },
    },
    "/products/search": {
      get: {
        tags: ["Product"],
        description: "searching a product",
        parameters: [
          {
            in: "query",
            name: "sellerId",
            description: "a seller you want to search for",
            required: false,
            schema: {
              type: "number",
              format: "number",
            },
          },
          {
            in: "query",
            name: "categoryId",
            description: "a category you want to search for",
            required: false,
            schema: {
              type: "number",
              format: "number",
            },
          },
          {
            in: "query",
            name: "price",
            description: "a seller you want to search for",
            required: false,
            schema: {
              type: "string",
              format: "string",
            },
          },
          {
            in: "query",
            name: "product",
            description: "a product you want to search for",
            required: false,
            schema: {
              type: "string",
              format: "string",
            },
          },
          {
            in: "query",
            name: "expiryDate",
            description: "product that will expire on the specify date",
            required: false,
            schema: {
              type: "string",
              format: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "internal server error",
          },
        },
      },
    },
    "/products/{id}/expired": {
      patch: {
        tags: ["Product"],
        description: "Mark product as expired",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "id for the product",
            required: true,
            schema: {
              type: "number",
              format: "id",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          404: {
            description: "Product not found",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "internal server error",
          },
        },
      },
    },
    "/Carts": {
      get: {
        tags: ["Cart"],
        description: "View cart",
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
      delete: {
        tags: ["Cart"],
        description: "Clear cart",
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal server error",
          },
          401: {
            description: "Unathorized",
          },
        },
      },
    },
    "/Carts/{id}": {
      post: {
        tags: ["Cart"],
        description: "Update Item in Cart",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Id of a product",
            required: true,
            schema: {
              type: "number",
              format: "number",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal server error",
          },
          401: {
            description: "Unathorized",
          },
        },
      },
      put: {
        tags: ["Cart"],
        description: "Update Item in Cart",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Id of an item in Cart",
            required: true,
            schema: {
              type: "number",
              format: "number",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Quantity",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal server error",
          },
          401: {
            description: "Unathorized",
          },
        },
      },
    },
  },

  securityDefinitions: {
    google_oautho2: {
      type: "oauth2",
      flow: "accessCode",
      authorizationUrl: "https://accounts.google.com/o/oauth2/auth",
      scopes: {
        read: "Read access to API",
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
          gender: {
            type: "string",
            required: true,
            description: "gender of the user",
          },
          preferredLanguage: {
            type: "string",
            required: true,
            description: "prefered language of the user",
          },
          preferredCurrency: {
            type: "string",
            required: true,
            description: "prefered currency of the user",
          },
          birthdate: {
            type: "date",
            required: true,
            description: "The birthdate of the user",
          },
          province: {
            type: "string",
            required: true,
            description: "province/state depending on the country's system",
          },
          city: {
            type: "string",
            required: true,
            description: "Current city",
          },
          postalCode: {
            type: "string",
            required: true,
            description: "postal/zip code depending on the country's system",
          },
          street: {
            type: "string",
            required: true,
            description: "Street address/number",
          },
          country: {
            type: "string",
            required: true,
            description: "The country",
          },
        },
        example: {
          name: "Jane Doe",
          email: "janedoe@gmail.com",
          password: "janedoel250",
          gender: "Male",
          preferredLanguage: "English",
          preferredCurrency: "RWF",
          birthdate: "01/01/2000",
          city: "Kigali",
          province: "Kigali",
          postalCode: "90231",
          street: "KG 305 ST",
          country: "Rwanda",
        },
      },
      UpdateProfile: {
        type: "object",
        properties: {
          preferredLanguage: {
            type: "string",
            required: true,
            description: "prefered language of the user",
          },
          preferredCurrency: {
            type: "string",
            required: true,
            description: "prefered currency of the user",
          },
          province: {
            type: "string",
            required: true,
            description: "province/state depending on the country's system",
          },
          city: {
            type: "string",
            required: true,
            description: "The current city",
          },
          postalCode: {
            type: "string",
            required: true,
            description: "postal/zip code depending on the country's system",
          },
          street: {
            type: "string",
            required: true,
            description: "Street address/number",
          },
          country: {
            type: "string",
            required: true,
            description: "Your country",
          },
        },
        example: {
          preferredLanguage: "English",
          preferredCurrency: "RWF",
          city: "Kigali",
          province: "Kigali",
          postalCode: "90231",
          street: "KG 305 ST",
          country: "Rwanda",
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
      Authentication: {
        type: "object",
        properties: {
          token: {
            type: "string",
            required: true,
            description: "token obtained by the user",
          },
        },
        example: {
          token: "123456",
        },
      },
      Quantity: {
        type: "object",
        properties: {
          quantity: {
            type: "integer",
            required: true,
            description: "quantity of item in cart",
          },
        },
        example: {
          quantity: 13,
        },
      },
      Product: {
        type: "object",
        properties: {
          name: {
            type: "string",
            required: true,
            description: "Name of the item",
          },
          price: {
            type: "number",
            required: true,
            description: "Price of the item",
          },
          categoryId: {
            type: "integer",
            required: true,
            description: "Category of the item",
          },
          quantity: {
            type: "integer",
            required: true,
            description: "Number of the items",
          },
          expiryDate: {
            type: "date",
            required: true,
            description: "Expiry Date of the item",
            example: "2023-02-30",
          },
          bonus: {
            type: "number",
            required: true,
            description: "Bonus section",
          },
          image: {
            type: "array",
            items: {
              type: "string",
              format: "binary",
              required: true,
              minItems: 4,
            },
          },
        },
      },
      ProductWishes: {
        type: "object",
        properties: {
          product_id: {
            type: "number",
            required: true,
            description: "product id",
          },
        },
      },
    },
  },
};
docrouter.use("/", serve, setup(options));
export default docrouter;
