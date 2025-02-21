import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const EditList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(null); // Hold the fetched data

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch the data for the specific ID when the component loads
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/form/list/${id}`);
        setFormData(response.data);

        // Pre-fill the form fields with the fetched data
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

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/form/edit/${id}`,
        data
      );
      console.log(response.data);
      navigate("/all/list"); // Navigate to the list page after successful edit
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
              {...register("description", { required: "Description is required" })}
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
              {...register("amount", { required: "Amount is required", min: 0 })}
              placeholder="Enter amount"
            />
            {errors.amount && (
              <p className="bg-red-600">{errors.amount.message}</p>
            )}
          </div>

          <button type="submit">Edit & Save</button>
        </form>
      ) : (
        <p>Loading form data...</p> // Show a loading message while data is being fetched
      )}
    </div>
  );
};

export default EditList;
