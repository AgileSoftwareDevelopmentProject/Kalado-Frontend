import React from 'react';
import { Backdrop } from '../../../components/atoms';
import LoginForm from './LoginForm';
import { useModalContext } from '../../../contexts';

const LoginModal: React.FC = () => {

    const {
        isLoginVisible,
        handleClosePopups,
        handleOpenSignup
    } = useModalContext();

    return (
        <Backdrop open={isLoginVisible} onClose={handleClosePopups}>
            <LoginForm
                onClose={handleClosePopups}
                onOpenSignup={handleOpenSignup}
            />
        </Backdrop>
    );
};

export default LoginModal;
