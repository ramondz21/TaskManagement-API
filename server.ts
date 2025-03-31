import "dotenv/config";
import express from "express";
import taskRoutes from "./src/routes/taskRoutes";
import authRoutes from "./src/routes/authRoutes"
import errorHandler from "./src/middleware/errorHandler";

const app = express();
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);


app.use(errorHandler)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
