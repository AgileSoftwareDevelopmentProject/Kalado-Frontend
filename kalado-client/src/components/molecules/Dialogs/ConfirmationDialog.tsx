import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';

interface ConfirmationDialogProps {
    isDialogOpen: boolean;
    onClose: () => void;
    onCheck: () => void;
    title: string;
    message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isDialogOpen, onClose, onCheck, title, message }) => {
    return (
        <Dialog
            open={isDialogOpen}
            onClose={onClose}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
        >
            <DialogTitle id="confirmation-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="confirmation-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <IconButton onClick={onCheck} sx={{ backgroundColor: 'green' }}>
                    <CheckIcon />
                </IconButton>
                <IconButton onClick={onClose} sx={{ backgroundColor: 'red' }}>
                    <CloseIcon />
                </IconButton>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
