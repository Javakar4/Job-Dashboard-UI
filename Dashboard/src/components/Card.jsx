import React, { useState } from 'react';
import './Card.css';
import { FiUserPlus } from 'react-icons/fi';
import { FaBuilding } from 'react-icons/fa';
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import amazon from '../assets/amazon.png';
// import google from '../assets/google.webp';
import netflix from '../assets/netflix.png';
import swiggy from '../assets/swiggy.png';
import tesla from '../assets/tesla.png';

const fallbackImages = [amazon, google, netflix, swiggy, tesla];

const JobCard = ({ logo, title, time, experience, location, salary, description }) => {
  const [imgSrc, setImgSrc] = useState(logo);

  const handleImageError = () => {
    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    setImgSrc(fallbackImages[randomIndex]);
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <img
          src={imgSrc}
          alt="company logo"
          className="company-logo"
          onError={handleImageError}
        />
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
