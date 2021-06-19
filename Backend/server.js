const express = require("express");
const app = express();
const pool = require("./db_connect")

app.use(express.json());

//Get all backscratchers
app.get("/scratchers", async (req, res) => {
  try {

    const allScratchers = await pool.query(
      "SELECT * FROM scratchers"
    );

    res.json(allScratchers.rows);

  } catch (err) {
    console.log(err.message);
  }
});

//Get one backscratcher
app.get("/scratchers/:item_name", async (req, res) => {
  try {

    const { item_name} = req.params;

    const scratcher = await pool.query(
      "SELECT * FROM scratchers WHERE item_name = ($1)", [item_name]
    );

    res.json(scratcher.rows);

  } catch (err) {
    console.log(err.message);
  }
});

//Create backscratcher
app.post("/scratchers", async (req, res) => {
  try {

    const {item_name, item_description, item_size, item_cost} = req.body;
    
    const newScratcher = await pool.query(
      "INSERT INTO scratchers VALUES ($1, $2, $3, $4) RETURNING *",
      [item_name, item_description, item_size, item_cost]
    );

    res.json(newScratcher.rows);

  } catch (err) {
    console.log(err.message);
  }
});

//Update backscratcher
app.put("/scratchers/:item_name_param", async (req, res) => {
  try {

    const { item_name_param } = req.params;
    const { item_name, item_description, item_size, item_cost } = req.body;

    const scratcher = await pool.query(
      `UPDATE scratchers 
      SET item_name = $1, 
      item_description = $2, 
      item_size = $3, 
      item_cost = $4 
      WHERE item_name = $5
      RETURNING *`,
      [item_name, item_description, item_size, item_cost, item_name_param]
    );

    res.json(scratcher.rows);

  } catch (err) {
    console.log(err.message);
  }
});

//Delete backscratcher
app.delete("/scratchers/:item_name", async (req, res) => {
  try {
    const { item_name } = req.params;

    const scratcher = pool.query(
      "DELETE FROM scratchers WHERE item_name = $1 RETURNING *",
      [item_name]
    );

    res.json(scratcher);

  } catch (err) {
    console.log(err.message)
  }
});

// app.listen(3001, () => console.log("Listening on port 3001."));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

