import React, { useState } from "react";
import axios from "axios";
import { parseISO, format, startOfWeek, addDays } from "date-fns";
const AddForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    startTime: "",
    endTime: "",
    location: "",
    dayOfWeek: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if any required field is empty
    if (
      !formData.name ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.location ||
      !formData.dayOfWeek
    ) {
      alert("Please fill in all required fields."); // You can use a more sophisticated validation and display a proper error message
      return;
    }

    const data = {
      documents: [
        {
          text: formData.name,
          start: formData.startTime,
          end: formData.endTime,
          location: formData.location,
          dayOfWeek: formData.dayOfWeek,
        },
      ],
    };

    axios
      .post("/api/createrecord", data)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        onSubmitSuccess();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      })
      .finally(() => {
        //reload the page
        window.location.reload();
      });
  };
  const generateDayOptions = () => {
    const today = new Date();
    const dayOptions = [];

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const dayFormatted = format(nextDay, "MM/dd/yyyy"); // Format the date
      const dayOfWeek = format(nextDay, "EEEE");
      dayOptions.push(
        <option key={i} value={dayFormatted}>
          {`${dayOfWeek} (${dayFormatted})`}
        </option>
      );
    }

    return dayOptions;
  };

  return (
    <div className="add-form w-[600px] h-[600px] bg-[#FFA559] rounded-[15px]">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <p className="text-white text-[24px] font-bold">Name</p>
        <input
          className="w-[90%] px-[10px] h-[50px] bg-[#FFD3A1] rounded-[10px] border-[none] outline-none text-[24px] font-bold"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <p className="text-white text-[24px] font-bold">Start Time</p>
        <input
          className="w-[90%] px-[10px] h-[50px] bg-[#FFD3A1] rounded-[10px] border-[none] outline-none text-[24px] font-bold"
          type="time" // Change to time
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
        />
        <p className="text-white text-[24px] font-bold">End Time</p>
        <input
          className="w-[90%] px-[10px] h-[50px] bg-[#FFD3A1] rounded-[10px] border-[none] outline-none text-[24px] font-bold"
          type="time" // Change to time
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
        />
        <p className="text-white text-[24px] font-bold">Location</p>
        <input
          className="w-[90%] px-[10px] h-[50px] bg-[#FFD3A1] rounded-[10px] border-[none] outline-none text-[24px] font-bold"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <p className="text-white text-[24px] font-bold">Day of the Week</p>
        <select
          className="w-[90%] px-[10px] h-[50px] bg-[#FFD3A1] rounded-[10px] border-[none] outline-none text-[24px] font-bold"
          name="dayOfWeek"
          value={formData.dayOfWeek}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Day
          </option>
          {generateDayOptions()}
        </select>
        <button
          type="submit"
          className="mt-[30px] w-[200px] h-[40px] rounded-[10px] bg-[#FF6000] text-white font-bold text-[18px] hover:opacity-80 transform scale-100 transition-transform duration-200 active:scale-95"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddForm;
