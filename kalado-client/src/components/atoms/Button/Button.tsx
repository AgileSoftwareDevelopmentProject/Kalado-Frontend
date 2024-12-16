import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends MuiButtonProps {
    text?: string;
    shape?: string,
    width?: string;
    borderRadius?: string;
    backgroundColor?: string;
    color?: string;
    padding?: string;
    margin?: string;
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
    children,
    text,
    shape = 'rounded',
    width = 'auto',
    borderRadius,
    backgroundColor = '#D74101',
    color = '#FFFFFF',
    padding = '6px 16px',
    margin = '0',
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
            {text == undefined ? children : text}
        </MuiButton>
    );
};

export default Button;
