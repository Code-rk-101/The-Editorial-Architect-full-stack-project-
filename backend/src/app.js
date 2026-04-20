const express = require("express");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const authRouter = require("./routes/auth.Routes");
const interviewRouter = require("./routes/interview.Routes");

const cookiesParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Trust proxy required for cloud load balancers (Vercel, Render, Heroku) rate limiting
app.set("trust proxy", 1);

// Security Headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Important if serving images cross-origin

// HTTP Request Logging
app.use(morgan("common"));

// Rate Limiting (General)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use("/api", limiter);

app.use(express.json({ limit: "10mb" })); // Prevent large payload crash
app.use(cookiesParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error Details:", err);
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    message:
      process.env.NODE_ENV === "production" ? "Internal Server Error" : message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

module.exports = app;
