import React, { useState, useRef, useEffect } from "react";
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import axios from "axios";
import { parseISO, format, startOfWeek, addDays, subHours } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
const Calendar = ({ getevents }) => {
  const calendarRef = useRef();
  const [curevents, setCurEvents] = useState([]);
  const [config, setConfig] = useState({
    viewType: "Week",
    cellBorderColor: "#ff0000",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update the axios request URL to point to your proxy server
        const response = await axios.get("/api/readrecords");

        // Convert single quotes to double quotes
        let data = response.data.replace(/'/g, '"');

        // Replace 'ObjectId(' and ')' with an empty string
        data = data.replace(/ObjectId\(/g, "").replace(/\)/g, "");

        // Parse the modified JSON string into a JavaScript object
        const records = JSON.parse(data);

        const currentWeekStart = startOfWeek(new Date());
        const totalEvents = [];
        const events = records.map((record) => {
          // Assuming record.start and record.end are in 'HH:mm' format

          // Convert current day format from "mm/dd/yyyy" to "yyyy-MM-dd"
          const currentDayParts = record.dayOfWeek.split("/");
          const currentDay = `${currentDayParts[2]}-${currentDayParts[0]}-${currentDayParts[1]}`;

          // Calculate the start and end dates based on time and week in the format "yyyy-MM-dd'T'HH:mm:ss"
          const startDateString = `${currentDay}T${record.start}:00`;
          const endDateString = `${currentDay}T${record.end}:00`;

          // Parse dates using zonedTimeToUtc to ensure the correct time zone
          const startDate = subHours(parseISO(startDateString), 5);
          const endDate = subHours(parseISO(endDateString), 5);

          const text = record.text + " \nLocation: " + record.location;
          // Generate random color
          const randomColor = Math.floor(Math.random() * 16777215).toString(16);
          //add tot toal events but text shoudl be wiuhtoit loaction
          totalEvents.push({
            id: record._id,
            text: record.text,
            start: startDate,
            end: endDate,
            moveDisabled: true,
            backColor: "#" + randomColor,
          });
          return {
            id: record._id,
            text: text,
            start: startDate,
            end: endDate,
            moveDisabled: true,
            backColor: "#" + randomColor,
            // Additional properties based on your API response
          };
        });

        // Update the calendar with the fetched events
        calendarRef.current.control.update({
          startDate: currentWeekStart,
          events,
        });
        getevents(totalEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  const handleMouseEnter = () => {
    document.body.style.pointerEvents = "none";
  };

  const handleMouseLeave = () => {
    document.body.style.pointerEvents = "auto";
  };
  const eventCss = (args) => {
    return {
      backgroundColor: args.data.backColor,
      color: "white", // Text color is white
      fontSize: "48px", // Font size is 48px
    };
  };

  return (
    <div className="mx-[200px]">
      <DayPilotCalendar
        {...config}
        ref={calendarRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        eventCss={eventCss}
      />
    </div>
  );
};

export default Calendar;
