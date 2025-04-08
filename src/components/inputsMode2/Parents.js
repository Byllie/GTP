import React, { useState } from 'react';
import InputTextField from './InputTextField';
import InputValidateButtons from './InputValidateButtons';

export default function ProfessorGame() {
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [showClue, setShowClue] = useState(false);
  const [remainingTries, setRemainingTries] = useState(5);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleValidation = (isCorrect, triesLeft) => {
    setIsCorrect(isCorrect);
    setShowClue(!isCorrect);
    setRemainingTries(triesLeft);
  };

  return (
    <div>
      <InputTextField 
        onProfessorSelect={setSelectedProfessor}
        showClue={showClue}
        remainingTries={remainingTries}
      />
      
      <InputValidateButtons 
        professor={selectedProfessor}
        onValidation={handleValidation}  // Make sure this is passed
      />

      {isCorrect === true && (
        <Typography variant="body1" sx={{ color: 'green', mt: 2, textAlign: 'center' }}>
          Correct! Well done!
        </Typography>
      )}
    </div>
  );
}