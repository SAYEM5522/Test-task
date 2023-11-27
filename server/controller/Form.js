import { Form } from "../database/Form.js";
import { Sectors } from "../database/Sectors.js";

const createSectors = async (req, res) => {
  try {

    // For example, if you want to create sectors based on the request body:
    const { sectors } = req.body;

    const newSectors = await Sectors.create({ sectors });

    res.status(201).json({
      success: true,
      message: "Sectors created successfully",
      sectors: newSectors
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};
const createForm = async (req, res) => {
  try {
    // Assuming that the request body contains the necessary data for the form
    const { name, sectors, terms } = req.body;

    // Create a new form instance
    const newForm = await Form.create({
      name,
      sectors, // Assuming subtitles is an array in the request body
      terms
    });

    // Respond with a success message and the created form data
    res.status(201).json({
      success: true,
      message: "Form created successfully",
      form: newForm
    });
  } catch (error) {
    console.error(error);
    // Handle errors and respond with an error message
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};
const getSectors=async(req,res)=>{
  try {
    // Retrieve sectors from the database
    const sectors = await Sectors.find();

    // Respond with the retrieved sectors
    res.status(200).json({
      success: true,
      sectors: sectors
    });
  } catch (error) {
    console.error(error);
    // Handle errors and respond with an error message
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}
const getAllForms=async(req,res)=>{
  try {
    // Retrieve sectors from the database
    const form = await Form.find();

    // Respond with the retrieved sectors
    res.status(200).json({
      success: true,
      form: form
    });
  } catch (error) {
    console.error(error);
    // Handle errors and respond with an error message
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}

const updateForm = async (req, res) => {
  try {
    const { name, sectors, terms } = req.body;
    // Assuming you have a unique identifier for your form, replace 'uniqueField' with the actual field name
    const filter = { _id: req.params.id }; // Change 'uniqueField' as needed
    // Update the form with the new values
    const updatedForm = await Form.findOneAndUpdate(filter, { name, sectors, terms }, { new: true });

    if (!updatedForm) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Form updated successfully",
      form: updatedForm
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};
export {createSectors,createForm,
  getSectors,getAllForms,
    updateForm}