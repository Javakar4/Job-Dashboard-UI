import React, { useState, useEffect } from 'react';
import Header from './Header';
import JobCard from './Card';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import './Joblist.css';

function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    type: '',
    salary: [1, 30],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await axios.get('https://job-portal-backend-ajr3.onrender.com/api/jobs');
        setJobs(response.data);
      } catch (err) {
        setError('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // Filter jobs based on filters state
  const filteredJobs = jobs.filter((job) => {
    const matchesTitle = job.title.toLowerCase().includes(filters.title.toLowerCase());
    const matchesLocation = filters.location ? job.location === filters.location : true;
    const matchesType = filters.type ? job.type === filters.type : true;
    const salaryNum = Number(job.salary); // assuming job.salary is a number or string
    const matchesSalary = salaryNum >= filters.salary[0] && salaryNum <= filters.salary[1];
    return matchesTitle && matchesLocation && matchesType && matchesSalary;
  });

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header filters={filters} setFilters={setFilters} />
      <div className="cards-container">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              logo={`http://localhost:4000/uploads/${job.logo}`}
              title={job.title}
              time={formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
              experience={job.type}
              location={job.location}
              salary={`${job.salary} LPA`}
              description={[
                job.description?.substring(0, 80) + '...',
                'Click to see more details',
              ]}
            />
          ))
        ) : (
          <p>No jobs found matching your criteria.</p>
        )}
      </div>
    </>
  );
}

export default JobPage;
