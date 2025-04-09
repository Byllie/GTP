import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputTextField from '../inputsMode2/InputTextFieldMode2';
import InputValidateButtons from '../inputsMode2/InputValidateButtonsMode2';
import CriteriaProf from '../criteria2/CriteriaProf';
import axios from 'axios';
import VictoryPopup from './../popup/VictoryPopup';
import Confetti from 'react-confetti';

export default function GridArticles() {
    const [professors, setProfessors] = useState([]);
    const [articleTitle, setArticleTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedProfessor, setSelectedProfessor] = useState(null);
    const [validationResults, setValidationResults] = useState([]);
    const [remainingTries, setRemainingTries] = useState(6);
    const [lastWrongProf, setLastWrongProf] = useState(null);
    const [showClue, setShowClue] = useState(false);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false); // 🎉

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [titleRes, authorsRes, abstractRes] = await Promise.all([
                    axios.get('/api/title'),
                    axios.get('/api/authors'),
                    axios.get('/api/abstract')
                ]);

                setArticleTitle(titleRes.data?.title || 'Article actuel');
                setProfessors(authorsRes.data?.listAuthors || []);
                setAbstract(abstractRes.data?.abstract || '');
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
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
                setShowClue(false);
                setShowCongratulations(true);
            } else {
                if (remainingTries > 0) {
                    const newTries = remainingTries - 1;
                    setRemainingTries(newTries);

                    if (!showClue) {
                        setShowClue(true);
                    }

                    setLastWrongProf(selectedProfessor);
                }
            }
        } catch (error) {
            console.error('Erreur lors de la validation :', error);
        }
    };

    const handlePopupClose = () => {
        setShowCongratulations(false);
        setShowConfetti(true);
    };

    return (
        <Box sx={{ p: 3, maxWidth: 800, mx: 'auto', position: 'relative' }}>
        {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}

        <Grid container spacing={3}>
        <Grid item xs={12}>
        <InputTextField
        onProfessorSelect={setSelectedProfessor}
        loading={loading}
        professors={professors}
        articleTitle={articleTitle}
        remainingTries={remainingTries}
        showClue={showClue}
        />
        </Grid>

        <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <InputValidateButtons
        onValidate={handleValidate}
        selectedProfessor={selectedProfessor}
        isCorrect={validationResults.some(result => result.isCorrect)}
        />
        </Box>

        {remainingTries === 0 && (
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                  textAlign: 'center',
                                  width: '100%',
                                  maxWidth: 600,
                                  margin: '1.5rem auto',
                                  border: '1px solid #ddd',
                                  overflow: 'auto',
                                  wordWrap: 'break-word',
                                  marginTop: '1.5rem',
            }}
            >
            <Typography variant="body1" sx={{ mt: 2, color: "text.primary", textAlign: "center", fontSize:"3vmin" }}>
            {abstract || "Aucun résumé disponible."}
            </Typography>
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

        <VictoryPopup
        open={showCongratulations}
        message="Vous avez sélectionné le bon professeur !"
        onClose={handlePopupClose}
        />
        </Box>
    );
}
