import React, { useEffect, useState } from 'react';
import JobCard from './Card';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import './Joblist.css';

const JobList = ({ filters }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://job-portal-backend-ajr3.onrender.com/api/jobs')
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load jobs");
        setLoading(false);
      });
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesTitle = job.title.toLowerCase().includes(filters.title.toLowerCase());
    const matchesLocation = filters.location === '' || job.location === filters.location;
    const matchesType = filters.type === '' || job.type === filters.type;
    const matchesSalary =
      job.salary * 1000 >= filters.salary[0] &&
      job.salary * 1000 <= filters.salary[1];

    return matchesTitle && matchesLocation && matchesType && matchesSalary;
  });

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cards-container">
      {filteredJobs.map((job) => (
        <JobCard
          key={job._id}
          logo={`http://localhost:4000/uploads/${job.logo}`}
          title={job.title}
          time={formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
          experience={job.type}
          location={job.location}
          salary={`${job.salary} LPA`}
          description={[
            job.description?.split(' ').slice(0, 12).join(' ') + '...',
            'Click to see more details',
          ]}
        />
      ))}
    </div>
  );
};


export default JobList;
