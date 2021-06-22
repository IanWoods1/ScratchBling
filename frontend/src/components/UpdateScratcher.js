import React, { useState } from 'react';
import Axios from "axios";

const UpdateScratcher = () => {
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

      const data = await Axios.put(
        `http://localhost:3001/api/scratchers/${name}`,
        item,
        {headers: {"x-auth-token": localStorage.getItem("auth-token")}}
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h2>Update Scratcher</h2>
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
        
        <label>Size</label>
        <label htmlFor="S" className="size-label">S</label>
        <input type="checkbox" name="S" value="S"
          onChange={e => setSizeSmall(e.target.type === "checkbox" ? e.target.checked : e.target.value)}/>
        <label htmlFor="M" className="size-label">M</label>
        <input type="checkbox" name="M" value="M"
         onChange={e => setSizeMedium(e.target.type === "checkbox" ? e.target.checked : e.target.value)}/>
        <label htmlFor="L" className="size-label">L</label>
        <input type="checkbox" name="L" value="L"
         onChange={e => setSizeLarge(e.target.type === "checkbox" ? e.target.checked : e.target.value)}/>
        <label htmlFor="XL" className="size-label">XL</label>
        <input type="checkbox" name="X" value="XL"
         onChange={e => setSizeXLarge(e.target.type === "checkbox" ? e.target.checked : e.target.value)}/>
        <br /><br />
  
        <label>Cost</label>
        <input type="number" name="cost" value={cost} required
          onChange={e => setCost(e.target.value)} />
        <br /><br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default UpdateScratcher