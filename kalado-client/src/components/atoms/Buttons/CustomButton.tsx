import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

interface CustomButtonProps extends Omit<MuiButtonProps, 'color'> {
    text?: string;
    shape?: 'rounded' | 'square';
    width?: string;
    borderRadius?: string;
    backgroundColor?: string;
    color?: OverridableStringUnion<'inherit' | 'primary' | 'secondary' | 'success' | 'error',
        React.ElementType>; // Use OverridableStringUnion for color
    padding?: string;
    margin?: string;
    type?: 'button' | 'submit' | 'reset';
}

const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    text,
    shape = 'rounded',
    width = 'auto',
    borderRadius,
    backgroundColor = '#D74101',
    color = '#FFFFFF',
    padding = '5px 15px',
    margin = '20px 0px',
    type = 'button',
    ...props
}) => {

    const buttonStyles = {
        borderRadius: borderRadius || (shape === 'square' ? '0px' : '30px'),
        width: width,
        backgroundColor: backgroundColor,
        padding: padding,
        margin: margin,
        color: color,
        '&:active': {
            transform: 'scale(0.95)',
            transition: 'all 0.2s ease',
        },
        '&:hover': {
            backgroundColor: '#C85A01',
        },
    };

    return (
        <MuiButton style={buttonStyles} {...props}>
            {text || children}
        </MuiButton>
    );
};

export default CustomButton;
