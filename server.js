require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const adminRoute = require("./routes/adminRoute");
const comaplainRoute = require("./routes/complainRoute");
const accidentRoute = require("./routes/AccidentRoute");
const driverRoute = require("./routes/driverRoute");
const expenseRoute = require("./routes/expenseRouter");
const financeRoute = require("./routes/financeRoute");
const fineRoute = require("./routes/fineRoute");
const incomeRoute = require("./routes/incomeRoute");
const maintenceActivityRoute = require("./routes/maintenanceActiviyRoute");
const maintenceRoute = require("./routes/maintenanceRoute");
const operationalRoute = require("./routes/operationalRoute");
const profitRoute = require("./routes/profitRoute");
const rentalRoute = require("./routes/rentalRoute");
const vehicleRoute = require("./routes/VehicleRoute");
connectDB();
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: `${process.env.FRNT_URL}`, // Corrected: Removed the curly braces
    credentials: true,
  })
);

app.use("/api/v1", accidentRoute);
app.use("/api/v1", adminRoute);
app.use("/api/v1", comaplainRoute);
app.use("/api/v1", driverRoute);
app.use("/api/v1", expenseRoute);
app.use("/api/v1", financeRoute);
app.use("/api/v1", fineRoute);
app.use("/api/v1", incomeRoute);
app.use("/api/v1", maintenceActivityRoute);
app.use("/api/v1", maintenceRoute);
app.use("/api/v1", operationalRoute);
app.use("/api/v1", profitRoute);
app.use("/api/v1", rentalRoute);
app.use("/api/v1", vehicleRoute);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`);
});
