import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const From = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    alert(data.branch +" from " +data.seller);
    console.log(data);
    try {
     await axios.post("http://localhost:3000/form/create", data);
      navigate("/all/list");
    } catch (error) {
      console.log("Error: ", error);
      alert(error.response.data.message)
    }
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <section>

    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Add list</h1>
      <div className="col">
        <label htmlFor="seller">Seller</label>
        <input {...register("seller", { required: true })} />
      </div>
      <div className="col">
        <label htmlFor="branch">branch</label>
        <input {...register("branch", { required: true })} />
      </div>
      <div className="col">
        <label htmlFor="description">description</label>
        <textarea {...register("description", { required: true })} />
      </div>
      <div className="col">
        <label htmlFor="amount">amount</label>
        <input type="number" {...register("amount", { required: true })} />
      </div>
      <div className="col">
        <label htmlFor="date">Date</label>
        <input type="date" {...register("date", { required: true })} />
      </div>

      <button type="submit">Add</button>
    </form>
    <button onClick={()=> navigate("/all/list")}>View Forms</button>
    </section>
  );
};

export default From;
