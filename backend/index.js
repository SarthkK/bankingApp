const express = require("express");
const cors = require("cors");
const apiRroutes = require("./routes/index");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", apiRroutes);

app.listen(3000, () => {
  console.log("backend server running on port 3000");
});
