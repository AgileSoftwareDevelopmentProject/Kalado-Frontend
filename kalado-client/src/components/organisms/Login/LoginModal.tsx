import React from 'react';
import { Backdrop } from '../../../components/atoms';
import LoginForm from './LoginForm';

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    onOpenSignup: () => void;
    onLoginSuccess: (role: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onOpenSignup, onLoginSuccess }) => {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('backdrop')) {
            onClose();
        }
    };

    return (
        <Backdrop open={open} onClick={handleBackdropClick}>
            <LoginForm
                onClose={onClose}
                onOpenSignup={onOpenSignup}
                onLoginSuccess={onLoginSuccess}
            />
        </Backdrop>
    );
};

export default LoginModal;
