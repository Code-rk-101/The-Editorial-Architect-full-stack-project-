require("@dotenvx/dotenvx").config();
const app = require("./src/app");
const ConnectToDB = require("./src/config/database");
const PORT = process.env.PORT || 3000;

ConnectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(
      "Failed to start server due to database connection issue",
      err,
    );
  });
