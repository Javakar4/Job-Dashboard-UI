import React from 'react';
import './Card.css';
import { FiUserPlus } from 'react-icons/fi';
import { FaBuilding } from 'react-icons/fa';
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";




const JobCard = ({ logo, title, time, experience, location, salary, description }) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <img src={logo} alt="company logo" className="company-logo" />
        <span className="posted-time">{time}</span>
      </div>

      <h3 className="job-title">{title}</h3>

      <div className="job-details">
        <span><FiUserPlus /> {experience}</span>
        <span><FaBuilding /> {location}</span>
        <span><HiOutlineSquare3Stack3D /> {salary}</span>
      </div>

      <ul className="job-description">
        {description.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>

      <button className="apply-btn">Apply Now</button>
    </div>
  );
};

export default JobCard;
