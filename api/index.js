import { app } from "./app.js";
import connectDB from "./src/db/index.js";
const port = process.env.PORT || 8000;
connectDB()
  .then(() => {
    app.on("error", () => process.exit(0));
    app.listen(port, () => console.log(`Server listening at port: ${port}`));
  })
  .catch((err) => console.log(`MongoDB connection failed, ${err}`));
