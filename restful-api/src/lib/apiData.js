export const apiData = [
    // {
    //     title: "",
    //     description: "",
    //     method: "",
    //     url: "",
    //     requestBody: {},
    //     responseBody: {},
    //   }
  {
    title: "Register Basic User",
    description: "Register a new user.",
    method: "POST",
    url: "/api/v1/auth/register",
    requestBody: {
      firstName: "string",
      lastName: "string",
      email: "string",
      username: "string",
      password: "string",
      confirmPassword: "string",
    },
    responseBody: {
      msg: "User successfully registered",
      data: "object",
    },
  },
  {
    title: "Login User",
    description: "Login a user.",
    method: "POST",
    url: "/api/v1/auth/login",
    requestBody: {
      email: "string",
      username: "string",
      password: "string",
    },
    responseBody: {
      msg: "User successfully logged in",
      token: "string",
    },
  },
  {
    title: "Creating A Quiz",
    description: "Creating a quiz using an admin account",
    method: "POST",
    url: "/api/v1/quiz/",
    requestBody: {
        categoryId: "integer",
        name: "string",
        difficulty: "difficulty",
        type: "type",
        startDate: "YYYY-MM-DDThh:mm:ss.sssZ"
    },
    responseBody: {
        msg: "Quiz successfully created",
        data: "object"
    },
  }
];
