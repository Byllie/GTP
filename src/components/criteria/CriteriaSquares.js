import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './CriteriaSquares.css';
import { Grid2 } from '@mui/material';

export default function CriteriaSquares({protocol, timestamp,response_data}) {
  console.log(response_data);
  const [visibleCount, setVisibleCount] = useState(0);
  const allCriteria = [response_data.reqName.name,response_data.reqName.layer,response_data.reqName.dateCreated,response_data.reqName.RFC,response_data.reqName.cours,response_data.reqName.wiki];
  const matches = [response_data.dic_comp.layer,response_data.dic_comp.dateCreated,response_data.dic_comp.RFC,response_data.dic_comp.cours,response_data.dic_comp.name,response_data.dic_comp.wiki]
  const color =[];
  for(const match of matches){
    if (match==="different" || match==="lower" || match==="higher"){
      color.push("#FF5252");

    }
    if (match==="equal"){
      color.push("#28fa6a");
    }
    if (match==="partial"){
      color.push("#FFC107")
    }

  }
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount(prev => prev >= allCriteria.length ? prev : prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [allCriteria.length]);

  const getItemClass = (index) => {
    let baseClass = 'criteria-item';
    return index % 2 === 0 ? `${baseClass} even` : `${baseClass} odd`;
  };

  return (
    <Box className="criteria-container">
      <Typography 
        variant="subtitle1" 
        gutterBottom
        className="criteria-title"
      >
      </Typography>
      <Grid2 container spacing={2} className="criteria-grid">
        {allCriteria.map((criteria, index) => (
          <Grid2 item key={index}>
            <Paper
              className={getItemClass(index)}
              style={{ opacity: index < visibleCount ? 1 : 0 , "background-color": color[index] }}
            >
              {matches[index] === "higher" ? "⬆️ " : matches[index] === "lower" ? "⬇️ " : ""}
              {criteria}
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
