import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const JobNotificationListener = () => {
  const [lastJobId, setLastJobId] = useState(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // Polling function
    const checkNewJobs = async () => {
      try {
        const response = await axios.get('/api/job/');
        const jobs = response.data;
        
        if (jobs && jobs.length > 0) {
          // Assuming the last job in the array or the one with highest ID is the newest
          // Backend returns filter(status=True). Let's find max ID.
          const maxId = Math.max(...jobs.map(job => job.id));
          const newestJob = jobs.find(job => job.id === maxId);
          
          if (isFirstLoad.current) {
            // First load, just record the max ID, don't show notification
            setLastJobId(maxId);
            isFirstLoad.current = false;
          } else if (lastJobId !== null && maxId > lastJobId) {
            // New job detected!
            toast.success(
              <div>
                <strong>New Job Alert!</strong><br />
                Admin just posted: <em>{newestJob.title}</em>
              </div>, 
              { duration: 5000, position: 'top-right' }
            );
            setLastJobId(maxId);
          }
        }
      } catch (error) {
        console.error("Error checking for new jobs", error);
      }
    };

    // Check immediately on mount
    checkNewJobs();

    // Then poll every 15 seconds
    const interval = setInterval(checkNewJobs, 15000);
    return () => clearInterval(interval);
  }, [lastJobId]);

  return <Toaster />;
};

export default JobNotificationListener;
