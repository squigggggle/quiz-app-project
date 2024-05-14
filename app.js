// Import the Express module
import express from 'express';

// Import the CORS module
import cors from 'cors';

// Import the helmet module
import helmet from "helmet";

// Import the rateLimit module
import rateLimit from "express-rate-limit";

// Import authorization routes
import authRouteMiddleware from "./middleware/authRoute.js";
import authV1Routes from "./routes/v1/auth.js";

import userV1Routes from "./routes/v1/user.js";

// Create an Express application
const app = express();

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
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Use the routes module
app.use('/', indexRoutes);

app.use("/api/v1/auth", authV1Routes);

app.use("/api/v1/"/*endpoint goes here*/, authRouteMiddleware, /*route goes here*/); // Authenticated route

app.use("api/v1/user/", authRouteMiddleware, userV1Routes);

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});

// Export the Express application. May be used by other modules. For example, API testing
export default app;