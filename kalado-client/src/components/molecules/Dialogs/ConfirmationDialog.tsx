import React from 'react';
import { useTranslation } from "react-i18next";
import { useTheme, useMediaQuery } from '@mui/material';
import {
    Box, Typography, Card, CardContent, Select, MenuItem, Grid, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle, Button
} from "@mui/material";

interface ConfirmationDialogProps {
    open: boolean;
    children: React.ReactNode;
    confirmStatusChange: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ confirmStatusChange }) => {
    const { t } = useTranslation();

    return (
        <Dialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
        >
            <DialogTitle id="confirmation-dialog-title">
                {t("report.user_management.confirmation_title")}
            </DialogTitle>
            {/* <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            {t("report.user_management.confirmation_message", {
              email: selectedUser?.email,
              status: t(
                `report.user_management.${newStatus?.toLowerCase()}`,
                newStatus
              ),
            })}
          </DialogContentText>
        </DialogContent> */}
            <DialogActions>
                <Button onClick={() => setIsDialogOpen(false)} color="secondary">
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
