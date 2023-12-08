import React, { useState, useRef, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Calendar from "./Components/Calendar";
import AddForm from "./Components/AddForm";
import MainForm from "./Components/MainForm";
// ... (your imports)

function App() {
  const [isFormVisible, setFormVisibility] = useState(false);
  const [events, setEvents] = useState([]);
  const [curForm, setCurForm] = useState("");
  const toggleFormVisibility = () => {
    setFormVisibility(!isFormVisible);
  };

  const handleFormSubmit = () => {
    // Reset the visibility state to hide the form
    setFormVisibility(false);
  };

  const formRef = useRef(null);

  const handleClickOutsideForm = (event) => {
    // Close the form if the click is outside the form
    if (formRef.current && !formRef.current.contains(event.target)) {
      setFormVisibility(false);
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutsideForm);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutsideForm);
    };
  }, []);

  const handleAddEventClick = (event) => {
    // Prevent the click event from propagating to the document body
    event.stopPropagation();
    toggleFormVisibility();
    setCurForm("add");
  };
  const handleUpdateEventClick = (event) => {
    setCurForm("update");
    event.stopPropagation();
    toggleFormVisibility();
  };

  const getEvents = (event) => {
    setEvents(event);
    //consoel.log
    console.log(events);
  };

  useEffect(() => {
    console.log(curForm);
  }, [curForm]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-center p-[50px] text-white font-bold text-[48px]">
        EZScheduler
      </h1>
      <Calendar getevents={getEvents} />
      <div className="text-center pt-[50px]">
        <button
          //clcik effect scale-95
          className="w-[200px] h-[40px] rounded-[10px] bg-[#FF6000] text-white font-bold text-[18px] hover:bg-[#FF6000] hover:opacity-80 transform scale-100 transition-transform duration-200 active:scale-95"
          onClick={handleAddEventClick}
        >
          Add event
        </button>
        <button
          className="ml-4 w-[200px] h-[40px] rounded-[10px] bg-[#4CAF50] text-white font-bold text-[18px] hover:bg-[#45a049] hover:opacity-80 transform scale-100 transition-transform duration-200 active:scale-95"
          onClick={handleUpdateEventClick}
        >
          Update event
        </button>
      </div>
      {isFormVisible && (
        <div className="absolute top-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-75">
          <div ref={formRef}>
            {/* <AddForm onSubmitSuccess={handleFormSubmit} /> */}
            <MainForm
              formEvent={curForm}
              onSubmitSuccess={handleFormSubmit}
              events={events}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
