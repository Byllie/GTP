import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './CriteriaSquares.css';
import { Grid2 } from '@mui/material';

export default function CriteriaSquares({ isError, protocol, timestamp }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const allCriteria = ['Criteria 1', 'Criteria 2', 'Criteria 3', 'Criteria 4', 'Criteria 5'];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount(prev => prev >= allCriteria.length ? prev : prev + 1);
    }, 500);

    return () => clearInterval(interval);
  }, [allCriteria.length]);

  const getItemClass = (index) => {
    let baseClass = 'criteria-item';
    if (isError) return `${baseClass} error`;
    return index % 2 === 0 ? `${baseClass} even` : `${baseClass} odd`;
  };

  return (
    <Box className="criteria-container">
      <Typography 
        variant="subtitle1" 
        gutterBottom
        className="criteria-title"
      >
        {protocol} - {timestamp}
      </Typography>
      <Grid2 container spacing={2} className="criteria-grid">
        {allCriteria.map((criteria, index) => (
          <Grid2 item key={index}>
            <Paper
              className={getItemClass(index)}
              style={{ opacity: index < visibleCount ? 1 : 0 }}
            >
              {criteria}
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}