import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Backdrop as MuiBackdrop } from '@mui/material';
import Logo from '../../atoms/Logo/Logo';
import { FaTimes } from 'react-icons/fa';
import { CustomButton } from '../../atoms';


interface PopupBoxProps {
    onOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

const PopupBox: React.FC<PopupBoxProps> = ({ onOpen, children, onClose }) => {
    const theme = useTheme();

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('MuiBackdrop-root')) {
            onClose();
        }
    };

    return (
        <MuiBackdrop
            open={onOpen}
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
                <CustomButton
                    onClick={onClose}
                    style={{
                        // color: theme.palette.primary.main,
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        padding: '0',
                    }}
                >
                    <FaTimes size={24} />
                </CustomButton>
                {children}
            </Box>
        </MuiBackdrop>

    );
};

export default PopupBox;
