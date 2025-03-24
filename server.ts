import express from "express";
import bodyParser from "body-parser";
import router from "./src/routes/userRoutes";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
