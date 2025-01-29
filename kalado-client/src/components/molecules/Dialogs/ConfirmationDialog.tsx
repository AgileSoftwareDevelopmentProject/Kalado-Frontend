import React from 'react';
import { useTranslation } from "react-i18next";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { TUserProfileResponse } from '../../../constants/apiTypes';

interface ConfirmationDialogProps {
    isDialogOpen: boolean;
    onClose: () => void;
    confirmStatusChange: () => void;
    selectedUser: TUserProfileResponse;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isDialogOpen, onClose, confirmStatusChange, selectedUser }) => {
    const { t } = useTranslation();

    return (
        <Dialog
            open={isDialogOpen}
            onClose={onClose}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
        >
            <DialogTitle id="confirmation-dialog-title">
                {t("report.user_management.confirmation_title")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="confirmation-dialog-description">
                    {t("report.user_management.confirmation_message", {
                        email: selectedUser?.username,
                        //   status: t(
                        //     `report.user_management.${newStatus?.toLowerCase()}`,
                        //     newStatus
                        //   ),
                    })}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    {t("report.user_management.cancel")}
                </Button>
                <Button onClick={confirmStatusChange} color="primary">
                    {t("report.user_management.confirm")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
