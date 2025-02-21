import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllList = () => {
  const [forms, setForms] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/form/all")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        setForms(data.forms);
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  const deleteForm = async (id) => {
    alert("try to delete");
    const response = await fetch(`http://localhost:3000/form/dlt/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("Form deleted successfully");
    setForms(forms.filter((form) => form._id !== id));
  };
  const navigationEdit = (id) => {
    navigate(`/edit/list/${id}`);
  };

  return (
    <div>
      <h1>AllList</h1>
      <table>
        <thead>
          <tr>
            <th>Branch</th>
            <th>Seller</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(forms) &&
            forms.map((item) => (
              <tr key={item._id}>
                <td>{item.branch}</td>
                <td>{item.seller}</td>
                <td>{item.description}</td>
                <td>{item.amount}</td>
                <td>
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="dltedt">
                  <span onClick={() => deleteForm(item._id)}>dlt</span>
                  <span onClick={() => navigationEdit(item._id)}>edit</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={() => navigate("/")}>Add Form</button>
    </div>
  );
};

export default AllList;
