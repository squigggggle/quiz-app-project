// Import the Express module
import express, { urlencoded, json } from "express";

// Import the CORS module
import cors from "cors";

// Import the helmet module
import helmet from "helmet";

// Import the rateLimit module
import rateLimit from "express-rate-limit";

import indexRoutes from "./routes/index.js";

// Import authorization routes
import authRouteMiddleware from "./middleware/authRoute.js";
import authV1Routes from "./routes/v1/auth.js";

import userV1Routes from "./routes/v1/user.js";

import quizV1Routes from "./routes/v1/quiz.js"
import { validatePostQuiz } from "./middleware/quizValidation.js";

import seedCategories from "./routes/v1/category.js";

import seedBasicUsers from "./routes/v1/seed.js";

// Create an Express application
const app = express();

app.use(urlencoded({ extended: false }));

app.use(json());

// Use the CORS module
app.use(cors());

// Use the helmet module
app.use(helmet());

const setXPoweredBy = helmet({
  hidePoweredBy: true,
});

const setXContentTypeOptions = helmet({
  contentTypes: {
    nosniff: true,
  },
});

const setXFrameOptions = helmet({
  frameguard: {
    action: "deny",
  },
});

const setContentSecurityPolicy = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'none'"],
    },
  },
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again in 15 minutes",
});

app.use(setXPoweredBy);
app.use(setXContentTypeOptions);
app.use(setXFrameOptions);
app.use(setContentSecurityPolicy);

app.use(limiter);

// Create a GET route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Use the routes module
app.use("/", indexRoutes);

app.use("/api/v1/auth", authV1Routes);

app.use("/api/v1/user/", authRouteMiddleware, userV1Routes);

app.use("/api/v1/user/seed/basic", seedBasicUsers);

app.use("/api/v1/quiz/", authRouteMiddleware, validatePostQuiz, quizV1Routes);

app.use("/api/v1/categories", seedCategories)

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});

// Export the Express application. May be used by other modules. For example, API testing
export default app;
