import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const EditList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(null); 

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/form/list/${id}`
        );
        setFormData(response.data);

      
        setValue("seller", response.data.seller);
        setValue("branch", response.data.branch);
        setValue("description", response.data.description);
        setValue("amount", response.data.amount);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchItem();
  }, [id, setValue]);


  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/form/edit/${id}`,
        data
      );
      console.log(response.data);
      navigate("/all/list"); 
    } catch (error) {
      console.error("Error updating data", error.response?.data);
    }
  };

  return (
    <div>
      <h3>Edit List</h3>
      {formData ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col">
            <label htmlFor="seller">Seller</label>
            <input
              {...register("seller", { required: "Seller is required" })}
              placeholder="Enter seller name"
            />
            {errors.seller && (
              <p className="bg-red-600">{errors.seller.message}</p>
            )}
          </div>

          <div className="col">
            <label htmlFor="branch">Branch</label>
            <input
              {...register("branch", { required: "Branch is required" })}
              placeholder="Enter branch name"
            />
            {errors.branch && (
              <p className="bg-red-600">{errors.branch.message}</p>
            )}
          </div>

          <div className="col">
            <label htmlFor="description">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="bg-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="col">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              {...register("amount", {
                required: "Amount is required",
                min: 0,
              })}
              placeholder="Enter amount"
            />
            {errors.amount && (
              <p className="bg-red-600">{errors.amount.message}</p>
            )}
          </div>

          <button type="submit">Edit & Save</button>
        </form>
      ) : (
        <p>Loading form data...</p> 
      )}
    </div>
  );
};

export default EditList;
