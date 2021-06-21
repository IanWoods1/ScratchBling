import React, { useState, useEffect } from 'react';
import Axios from "axios";

const CreateScratcher = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sizeSmall, setSizeSmall] = useState(false);
  const [sizeMedium, setSizeMedium] = useState(false);
  const [sizeLarge, setSizeLarge] = useState(false);
  const [sizeXLarge, setSizeXLarge] = useState(false);
  const [cost, setCost] = useState("");
 
  const handleSubmit = async () => {
    try {

      //Create size arry:
      var sizes = [];

      if(sizeSmall)
        sizes.push("S");
      if(sizeMedium)
        sizes.push("M");
      if(sizeLarge)
        sizes.push("L");
      if(sizeXLarge)
        sizes.push("XL");

      const item = {
        item_name: name,
        item_description: description,
        item_size: sizes,
        item_cost: cost
      }

      console.log(item);

      const data = await Axios.post(
        `http://localhost:3001/api/scratchers`,
        item
      );
      console.log(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h2>Create Scratcher</h2>
      <form onSubmit={handleSubmit}>

        <label>Name</label>
        <input type="text" name="name" value={name} required
         onChange={e => setName(e.target.value)}/>
        <br />
        <br />

        <label>Description</label>
        <input type="text" name="description" value={description} required
         onChange={e => setDescription(e.target.value)}/>
        <br /><br />
        
        <label>Size</label><br />
        <input type="checkbox" name="S" value="S"
          onChange={e => setSizeSmall(e.target.type === "checkbox" ? e.target.checked : e.target.value)}/>
        <label for="S">S</label><br />
        <input type="checkbox" name="M" value="M"
         onChange={e => setSizeMedium(e.target.type === "checkbox" ? e.target.checked : e.target.value)}/>
        <label for="M">M</label><br />
        <input type="checkbox" name="L" value="L"
         onChange={e => setSizeLarge(e.target.type === "checkbox" ? e.target.checked : e.target.value)}/>
        <label for="L">L</label><br />
        <input type="checkbox" name="X" value="XL"
         onChange={e => setSizeXLarge(e.target.type === "checkbox" ? e.target.checked : e.target.value)}/>
        <label for="XL">XL</label><br />
        <br />
  
        <label>Cost</label>
        <input type="number" name="cost" value={cost} required
          onChange={e => setCost(e.target.value)} />
        <br /><br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default CreateScratcher