import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Backdrop as MuiBackdrop } from '@mui/material';
import Logo from '../../atoms/Logo/Logo';
import CloseButton from '../../atoms/Buttons/CloseButton';
import { useModalContext } from '../../../contexts';

interface PopupBoxProps {
    open: boolean;
    children: React.ReactNode;
}

const PopupBox: React.FC<PopupBoxProps> = ({ open, children }) => {
    const theme = useTheme();

    const {
        handleClosePopups,
    } = useModalContext();

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('MuiBackdrop-root')) {
            handleClosePopups();
        }
    };

    return (
        <MuiBackdrop
            open={open}
            onClick={handleBackdropClick}
            sx={{
                zIndex: 1200,
            }}
        >
            <Box sx={{
                width: "25vw",
                padding: "50px 0px",
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: theme.palette.background.default,
                borderRadius: 10,
                border: '2px solid rgba(255, 255, 255, 0.5)',
            }}>
                <Logo />
                <CloseButton onClose={handleClosePopups} />
                {children}
            </Box>
        </MuiBackdrop>

    );
};

export default PopupBox;
