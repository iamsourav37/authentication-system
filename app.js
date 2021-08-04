require("dotenv").config();
require("./helpers/initDb"); //! db configuration file importing

const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");

//! routes importing
const AuthRoutes = require("./routes/Auth.routes");
const TestingRoutes = require("./routes/Testing.routes");

const app = express();

//! build-in middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));

//! setting the x-powered-by
app.use(function (req, res, next) {
  res.setHeader("X-Powered-By", "a-self-learner-developer-guy");
  next();
});

//! all the routes
app.get("/", (req, res) => {
  res.json({
    message: "auth-project home route",
  });
});

app.use("/auth", AuthRoutes);
app.use("/test", TestingRoutes);

//! 404 route
app.use((req, res, next) => {
  next(createError.NotFound("Sorry, page not found"));
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

//! server configuration
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
