import React from "react";
import AddForm from "./AddForm";
import UpdateForm from "./UpdateForm";
const MainForm = ({ formEvent, handleFormSubmit, events }) => {
  return (
    <div>
      {formEvent === "update" ? (
        <UpdateForm onSubmitSuccess={handleFormSubmit} events={events} />
      ) : (
        <AddForm onSubmitSuccess={handleFormSubmit} />
      )}
    </div>
  );
};

export default MainForm;
