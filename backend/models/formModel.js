import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  date: {
    type: Date,
    // required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
});

const Form = mongoose.model("Form", formSchema);

export default Form;
