import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import InputTextField from '../inputsMode2/InputTextFieldMode2';
import InputValidateButtons from '../inputsMode2/InputValidateButtonsMode2';
import CriteriaProf from '../criteria2/CriteriaProf';
import axios from 'axios';

export default function GridArticles() {
    const [professors, setProfessors] = useState([]);
    const [articleTitle, setArticleTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedProfessor, setSelectedProfessor] = useState(null);
    const [validationResults, setValidationResults] = useState([]);
    const [remainingTries, setRemainingTries] = useState(6);
    const [lastWrongProf, setLastWrongProf] = useState(null);
    const [showClue, setShowClue] = useState(false); // State to control clue visibility
    const [showCongratulations, setShowCongratulations] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [titleRes, authorsRes, abstractRes] = await Promise.all([
                    axios.get('/api/title'),
                    axios.get('/api/authors'),
                    axios.get('/api/abstract')
                ]);

                setArticleTitle(titleRes.data?.title || 'Current Article');
                setProfessors(authorsRes.data?.listAuthors || []);
                setAbstract(abstractRes.data?.abstract || '');
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleValidate = async () => {
        if (!selectedProfessor) return;

        try {
            const response = await axios.get(`/api/guessauthor/${encodeURIComponent(selectedProfessor)}`);
            const isCorrect = response.data?.message === 'equal';

            const newResult = {
                id: Date.now(),
                professor: selectedProfessor,
                isCorrect,
                timestamp: new Date().toISOString()
            };

            setValidationResults(prev => [newResult, ...prev]);

            if (isCorrect) {
              setLastWrongProf(null);
              setShowClue(false); // Hide clue if the answer is correct
              setShowCongratulations(true);
          } else {
              // Ensure remainingTries does not go below 0
              if (remainingTries > 0) {
                  const newTries = remainingTries - 1;
                  setRemainingTries(newTries);
  
                  if (!showClue) {
                      setShowClue(true); // Show clue only when the first answer is wrong
                  }
  
                  setLastWrongProf(selectedProfessor);
              }
          }
      } catch (error) {
          console.error('Validation error:', error);
      }
  };

    return (
      <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
          <Grid container spacing={3}>
              <Grid item xs={12}>
                  <InputTextField
                      onProfessorSelect={setSelectedProfessor}
                      loading={loading}
                      professors={professors}
                      articleTitle={articleTitle}
                      remainingTries={remainingTries}
                      showClue = {showClue} // Pass the clue visibility state
                  />
              </Grid>

              <Grid item xs={12}>
                  {/* Center the Validate Button */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                      <InputValidateButtons
                          onValidate={handleValidate}
                          selectedProfessor={selectedProfessor}
                          isCorrect={validationResults.some(result => result.isCorrect)} // Check if any answer is correct
                      />
                  </Box>

                  {remainingTries === 0 && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column', // Ensure vertical alignment
                            backgroundColor: '#f9f9f9',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            textAlign: 'center',
                            width: '100%',
                            maxWidth: 600,
                            margin: '1.5rem auto', // Center horizontally
                            border: '1px solid #ddd',
                            overflow: 'auto', // Allow scrolling if content overflows
                            wordWrap: 'break-word', // Ensure long words or URLs wrap properly
                            marginTop: '1.5rem',
                        }}
                  >
                      {/* Show full abstract below the Validate button if remainingTries is 0 */}
                        {remainingTries === 0 && (
                              <Typography variant="body1" sx={{ mt: 2, color: "text.primary", textAlign: "center" }}>
                                  {abstract || "No abstract available."}
                              </Typography>
                      )}
                  </Box>
                  )}
              </Grid>

              <Grid item xs={12}>
                  {validationResults.map((result) => (
                      <CriteriaProf
                          key={result.id}
                          isCorrect={result.isCorrect}
                          professor={result.professor}
                          abstract={abstract}
                          showFullAbstract={remainingTries === 0 && !result.isCorrect}
                      />
                  ))}
              </Grid>
          </Grid>
          {/* Congratulations Modal */}
          <Modal
                open={showCongratulations}
                onClose={() => setShowCongratulations(false)} // Close the modal when clicked outside
                aria-labelledby="congratulations-title"
                aria-describedby="congratulations-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center',
                        borderRadius: '12px',
                    }}
                >
                    <Typography id="congratulations-title" variant="h5" component="h2" sx={{ mb: 2 }}>
                        🎉 Congratulations! 🎉
                    </Typography>
                    <Typography id="congratulations-description" sx={{ mb: 2 }}>
                        You selected the correct professor!
                    </Typography>
                    <Button variant="contained" onClick={() => setShowCongratulations(false)}>
                        Close
                    </Button>
                </Box>
            </Modal>
      </Box>
    );
}