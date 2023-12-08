import React, { useState, useEffect } from "react";
import axios from "axios";
import { parseISO, format, startOfWeek, addDays } from "date-fns";
const UpdateForm = ({ onSubmitSuccess, events }) => {
  const [formData, setFormData] = useState({
    name: "",
    eventName: "", // changed "name" to "eventName" to avoid conflicts
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

    const filteredNewValues = Object.fromEntries(
      Object.entries({
        text: formData.name.length > 0 ? formData.name : formData.eventName,
        start: formData.startTime.length > 0 ? formData.startTime : null,
        end: formData.endTime.length > 0 ? formData.endTime : null,
        location: formData.location.length > 0 ? formData.location : null,
        dayOfWeek: formData.dayOfWeek.length > 0 ? formData.dayOfWeek : null,
      }).filter(([key, value]) => value !== null)
    );

    const data = {
      query: { text: formData.eventName },
      new_values: filteredNewValues,
    };
    axios
      .put("https://groupa-project.azurewebsites.net/api/updaterecord", data)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        onSubmitSuccess();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      })
      .finally(() => {});
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
  //useefect to see passed evnets
  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <div className="add-form w-[600px] h-[600px] bg-[#FFA559] rounded-[15px]">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <p className="text-white text-[24px] font-bold">Choose event</p>
        <select
          className="w-[90%] px-[10px] h-[50px] bg-[#FFD3A1] rounded-[10px] border-[none] outline-none text-[24px] font-bold"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Event
          </option>
          {events.map((event) => (
            <option key={event.id} value={event.text}>
              {event.text}
            </option>
          ))}
        </select>
        <p className="text-white text-[24px] font-bold">New Name</p>
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

export default UpdateForm;
