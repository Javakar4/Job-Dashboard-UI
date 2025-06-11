import React from 'react';
import './Header.css';
import Navbar from './Navbar';
import { GrLocation } from "react-icons/gr";
import { BiUserVoice } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { Slider } from "@mui/material";

function Header({ filters, setFilters }) {
  const handleInputChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSalaryChange = (event, newValue) => {
    setFilters((prev) => ({ ...prev, salary: newValue }));
  };

  return (
    <div className="header">
      <Navbar />
      <div className="filters-container">
        <div className="filter-item">
          <IoSearchOutline className="icon" />
          <input
            type="text"
            name="title"
            placeholder="Search By Job Title, Role"
            className="input"
            value={filters.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="filter-item">
          <GrLocation className="icon" />
          <select
            name="location"
            className="select"
            value={filters.location}
            onChange={handleInputChange}
          >
            <option value="">Preferred Location</option>
            <option>Remote</option>
            <option>Bangalore</option>
            <option>Chennai</option>
            <option>Hyderabad</option>
          </select>
        </div>

        <div className="filter-item">
          <BiUserVoice className="icon" />
          <select
            name="type"
            className="select"
            value={filters.type}
            onChange={handleInputChange}
          >
            <option value="">Job type</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>
        </div>

        <div className="filter-item no-border salary-range">
          <div className="salary-header">
            <span>Salary per Year</span>
            <span>
              ₹{filters.salary[0]}LPA - ₹{filters.salary[1]}LPA
            </span>
          </div>
          <Slider
            value={filters.salary}
            onChange={handleSalaryChange}
            valueLabelDisplay="off"
            min={1}
            max={50}
            step={1}
            sx={{
              color: "#222222",
              height: 4,
              '& .MuiSlider-thumb': {
                height: 15,
                width: 15,
                border: '5px solid black',
                backgroundColor: 'white',
                boxShadow: 'none',
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: 'none',
                },
              },
              '& .MuiSlider-track': {
                height: 2,
                borderRadius: 2,
              },
              '& .MuiSlider-rail': {
                height: 2,
                borderRadius: 2,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
