const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const Leader = require("./model/Leader");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Databse Connected");
  })
  .catch((err) => console.log("Databse Connection Error", err));

app.post("/leader", async (req, res) => {
  const { name, email, number } = req.body;

  try {
    const leader = new Leader({
      name,
      email,
      number,
    });

    await leader.save();

    console.log("Leader Saved in Databse", leader);

    res.json({ message: "Leader has been saved in databse" });
  } catch (error) {
    console.log(error);
    res.status(400).send("All Field is Required!");
  }
});

app.get("/leaders", async (req, res) => {
  try {
    const data = await Leader.find().exec();

    res.json({ result: data });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something Went Wrong");
  }
});

app.delete("/leader/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const result = await Leader.findOneAndDelete({ email: email }).exec();

    if (!result) return res.status(400).send("Leader not Found");

    res.json({ message: "Leader has been Deleted" });
  } catch (error) {
    console.log(error.message);

    res.status(400).send(error.message);
  }
});

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
