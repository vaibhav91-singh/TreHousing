import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const JobNotificationListener = () => {
  const lastJobIdRef = useRef(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    let isMounted = true;

    // Polling function
    const checkNewJobs = async () => {
      try {
        const response = await axios.get('/api/job/');
        if (!isMounted) return;
        const jobs = response.data;
        
        if (Array.isArray(jobs) && jobs.length > 0) {
          const maxId = Math.max(...jobs.map(job => job.id));
          const newestJob = jobs.find(job => job.id === maxId);
          
          if (isFirstLoad.current) {
            // First load, just record the max ID, don't show notification
            lastJobIdRef.current = maxId;
            isFirstLoad.current = false;
          } else if (lastJobIdRef.current !== null && maxId > lastJobIdRef.current) {
            // New job detected!
            toast.success(
              <div>
                <strong>New Job Alert!</strong><br />
                Admin just posted: <em>{newestJob.title}</em>
              </div>, 
              { duration: 5000, position: 'top-right' }
            );
            lastJobIdRef.current = maxId;
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error checking for new jobs", error);
        }
      }
    };

    // Check immediately on mount
    checkNewJobs();

    // Then poll every 15 seconds
    const interval = setInterval(checkNewJobs, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return <Toaster />;
};

export default JobNotificationListener;
