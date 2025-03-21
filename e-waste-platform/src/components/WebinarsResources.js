import React, { useEffect, useState } from 'react';
import { getResources } from '../api';

const WebinarsResources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      const response = await getResources();
      setResources(response.data);
    };
    fetchResources();
  }, []);

  return (
    <div>
      <h2>Webinars and Resources</h2>
      <ul>
        {resources.map((resource) => (
          <li key={resource.id}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <a href={resource.file_path} target="_blank" rel="noopener noreferrer">View Resource</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebinarsResources;