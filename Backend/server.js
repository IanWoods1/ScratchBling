const express = require("express");
const app = express();
const pool = require("./db_connect")
const cors = require("cors");
const jwt = require("jsonwebtoken");
const auth = require("./auth");

app.use(cors());
app.use(express.json());

//**********Scratcher Routes**********/

//Get all backscratchers
app.get("/api/scratchers", auth, async (req, res) => {
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
app.get("/api/scratchers/:item_name", auth, async (req, res) => {
  try {

    const { item_name} = req.params;

    console.log(item_name);

    const scratcher = await pool.query(
      "SELECT * FROM scratchers WHERE item_name = ($1)", [item_name]
    );

    res.json(scratcher.rows);

  } catch (err) {
    console.log(err.message);
  }
});

//Create backscratcher. If a backscratcher with the same name
//already exists, update it. 
app.post("/api/scratchers", auth, async (req, res) => {
  try {

    const {item_name, item_description, item_size, item_cost} = req.body;

    const newScratcher = await pool.query(
      `INSERT INTO scratchers (item_name, item_description, item_size, item_cost)
      VALUES ($1, $2, $3, $4) 
      ON CONFLICT (item_name) DO UPDATE
      SET item_description = EXCLUDED.item_description,
      item_size = EXCLUDED.item_size,
      item_cost = EXCLUDED.item_cost
      RETURNING *`,
      [item_name, item_description, item_size, item_cost]
    );

    res.json(newScratcher.rows);

  } catch (err) {
    console.log(err.message);
  }
});

//Update backscratcher (Note: not currently using this route as the,
//POST route will update if the scratcher already exists.)
app.put("/api/scratchers/:item_name_param", auth, async (req, res) => {
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
app.delete("/api/scratchers/:item_name", auth, async (req, res) => {
  try {
    const { item_name } = req.params;

    const scratcher = pool.query(
      "DELETE FROM scratchers WHERE item_name = $1 RETURNING *",
      [item_name]
    );

    res.json(`${item_name} has been deleted.`);

  } catch (err) {
    console.log(err.message)
  }
});

//**********User Routes**********/

//Consumer login
app.post("/api/users/login", async (req, res) => {

  try {
    const { username, password } = req.body;

    console.log(username);
    console.log(password);

    //Validate user
    if (!username || !password)
      return res.status(400).json({ msg: "Not all fields have been entered."})

    const user = await pool.query(
      "SELECT * FROM users WHERE username = ($1)", [username]
    );
    console.log(user);
    if (user.rows.length<1)  
      return res.status(400).json({ msg: "No account with this username exists."})

    const isMatch = (password === user.rows[0].password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid password." })

    //Sign json web token
    const token = jwt.sign({ id: user.rows[0].username}, process.env.JWT_SECRET);

    res.json({ 
      token, 
      user: user.rows[0].username, 
      admin: false
    });

  } catch {
    res.status(500).json({ error: err.message });
  }
})

//Admin login
app.post("/api/users/adminlogin", async (req, res) => {

  try {
    const { username, password } = req.body;

    //Validate user
    if (!username || !password)
      return res.status(400).json({ msg: "Not all fields have been entered."})

    const user = await pool.query(
      "SELECT * FROM users WHERE username = ($1)", [username]
    );

    if (user.rows.length<1)  
      return res.status(400).json({ msg: "No account with this username exists."})

    const isMatch = (password === user.rows[0].password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid password." })

    const isAdmin = (user.rows[0].admin === true);
    if (!isAdmin)
      return res.status(400).json({ msg: "User does not have admin priviledges." })

    //Sign json web token
    const token = jwt.sign({ id: user.rows[0].username}, process.env.JWT_SECRET);

    res.json({ 
      token, 
      user: user.rows[0].username, 
      admin: user.rows[0].admin
    });

  } catch {
    res.status(500).json({ error: err.message });
  }
})

//Check if a user is logged in
app.post("/api/users/tokenIsValid", async (req, res) => {
  try {

    const token = req.header("x-auth-token");
    if (!token) 
      return res.json(false);
    
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res.json(false);

    const user = await pool.query(
      "SELECT * FROM users WHERE username = ($1)", [verified.id]
    );
    if (user.rows.length<1) 
      return res.json(false);

    return res.json(true);
    
  } catch (err) {
    res.json(false);
  }
});

//Get one user from username (This route is not currently
//used by the app.)
app.get("/api/users/:username", async (req, res) => {
  try {

    const { username } = req.params;

    const user = await pool.query(
      "SELECT * FROM users WHERE username = ($1)", [username]
    );

    res.json(user.rows);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get user from jwt token
app.get("/api/users/", auth, async (req, res) => {

  const user = await pool.query(
    "SELECT * FROM users WHERE username = ($1)", [req.user]
  );

  res.json({ 
    user: user.rows[0].username, 
    admin: user.rows[0].admin
  });

})


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

