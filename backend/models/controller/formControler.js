import Form from "../formModel.js";

// Create a new form
const createForm = async (req, res) => {
  console.log("Try to add new form");

  try {
    const { date, branch, seller, amount, description } = req.body;
    console.log(req.body);

    const newForm = new Form({
      date,
      branch,
      seller,
      amount,
      description,
    });

    const savedForm = await newForm.save();

    if (!savedForm) {
      return res.status(400).json({ message: "Can't save data" });
    }

    res.status(201).json({ message: "Form created successfully", form: savedForm });
    console.log(`Form created: ${JSON.stringify(savedForm)}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all forms
const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find({});
    res.json({ message: "Forms retrieved successfully", forms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a form by ID
const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (form) {
      res.json(form);
    } else {
      res.status(404).json({ message: "Form not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a form
const deleteForm = async (req, res) => {
  console.log("tty to delete")
  try {
    const deletedForm = await Form.findByIdAndDelete(req.params.id);
    if (deletedForm) {
      console.log(`deleted form : ${req.params.id}`)
      res.json({ message: "Form deleted successfully", form: deletedForm });
    } else {
      res.status(404).json({ message: "Form not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a form
const updateForm = async (req, res) => {
  try {
    const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedForm) {
      res.json({ message: "Form updated successfully", form: updatedForm });
    } else {
      res.status(404).json({ message: "Form not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createForm,
  getAllForms,
  getFormById,
  deleteForm,
  updateForm,
};
