import React from 'react';
import { Box, Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

interface CustomButtonProps extends Omit<MuiButtonProps, 'color'> {
    text?: string;
    icon?: React.ReactNode;
    shape?: 'rounded' | 'square';
    borderRadius?: string;
    backgroundColor?: string;
    color?: OverridableStringUnion<'inherit' | 'primary' | 'secondary' | 'success' | 'error',
        React.ElementType>;
    padding?: string;
    margin?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    text,
    icon,
    shape = 'rounded',
    borderRadius,
    backgroundColor = '#D74101',
    color = '#FFFFFF',
    padding = '5px 15px',
    margin = '20px 0px',
    type = 'button',
    onClick,
    ...props
}) => {

    const buttonStyles = {
        borderRadius: borderRadius || (shape === 'square' ? '0px' : '30px'),
        width: 'auto',
        backgroundColor: backgroundColor,
        padding: padding,
        margin: margin,
        color: color,
        transition: 'all 0.3s ease', // Smooth transition for hover effects
        '&:active': {
            transform: 'scale(0.95)',
            transition: 'all 0.2s ease',
        },
        '&:hover': {
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
            fontWeight: 600,
            backgroundColor: '#C85A01',
        },
    };

    return (
        <Box>
            <MuiButton
                style={buttonStyles}
                onClick={onClick}
                type={type}
                {...props}
            >
                {icon && <Box sx={{ mr: 1 }}>{icon}</Box>}
                {text || children}
            </MuiButton>
        </Box>
    );
};

export default CustomButton;
