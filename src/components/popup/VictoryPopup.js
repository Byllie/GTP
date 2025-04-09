import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './VictoryPopup.css';

const VictoryPopup = ({ open, message, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle className="victory-popup-title">
        Victoire !
        <IconButton
        aria-label="close"
        onClick={onClose}
        className="victory-popup-close"
        >
        <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent dividers>
        <DialogContentText>
        {message}
        </DialogContentText>
        </DialogContent>
        </Dialog>
    );
};

export default VictoryPopup;
