import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid2 } from '@mui/material';
import './CriteriaSquares.css';
import VictoryPopup from './../popup/VictoryPopup';
import Confetti from 'react-confetti';

export default function CriteriaSquares({ protocol, timestamp, response_data, onPopupClose, attempts }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showVictoryTitle, setShowVictoryTitle] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
    if (onPopupClose) onPopupClose();
  };

    useEffect(() => {
      const interval = setInterval(() => {
        setVisibleCount(prev => (prev >= 5 ? prev : prev + 1));
      }, 500);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      if (response_data?.dic_comp?.name === "equal" && visibleCount === 5) {
        setShowPopup(true);
        setShowVictoryTitle(true);
      }
    }, [visibleCount, response_data]);

    if (!response_data || !response_data.reqName || !response_data.dic_comp) {
      return null;
    }




  const allCriteria = [
    response_data.reqName.name,
    response_data.reqName.layer,
    response_data.reqName.dateCreated,
    response_data.reqName.RFC,
    response_data.reqName.cours
  ];

  const matches = [
    response_data.dic_comp.name,
    response_data.dic_comp.layer,
    response_data.dic_comp.dateCreated,
    response_data.dic_comp.RFC,
    response_data.dic_comp.cours,
    response_data.dic_comp.wiki
  ];

  const color = matches.map(match => {
    if (["different", "lower", "higher"].includes(match)) return "#FF5252";
    if (match === "equal") return "#28fa6a";
    if (match === "partial") return "#FFC107";
    return "#E0E0E0";
  });

  const getItemClass = (index) => (index % 2 === 0 ? "criteria-item even" : "criteria-item odd");

  const cours = response_data.reqName.cours;
  const coursDisplay = Array.isArray(cours) ? cours.join(" ") : cours;

  const handleNameClick = () => {
    window.open(response_data.reqName.wiki, "_blank");
  };

  return (
    <Box className="criteria-container">
      {showVictoryTitle && <Confetti className="confetti" />}
      <Typography variant="subtitle1" gutterBottom className="criteria-title" />
      <Grid2 container spacing={2} className="criteria-grid">
        {allCriteria.map((criteria, index) => (
          <Grid2 item key={index} sx={{ width: "13vmin", height: "13vmin", marginRight: "2vmin" }}>
            <Paper
              className={getItemClass(index)}
              style={{
                opacity: index < visibleCount ? 1 : 0,
                backgroundColor: color[index],
                cursor: index === 0 ? "pointer" : "default",
                fontSize: "3vmin",
                width: "15vmin",
                height: "15vmin",
                color: "#f4f6fb"
              }}
              onClick={index === 0 ? handleNameClick : undefined}
            >
              {matches[index] === "higher" ? "⬆️ " : matches[index] === "lower" ? "⬇️ " : ""}
              {index === 4 ? coursDisplay : criteria}
            </Paper>
          </Grid2>
        ))}
      </Grid2>

      <VictoryPopup
        open={showPopup}
        message={`Le nom du protocole correspond parfaitement !\nNombre de tentatives : ${attempts}`}
        onClose={handleClosePopup}
      />
    </Box>
  );
}
