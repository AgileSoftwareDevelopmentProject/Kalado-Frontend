import React from 'react';
import { Backdrop } from '../../../components/atoms';
import SignupForm from './SignupForm';
import { useModalContext } from '../../../contexts';


const SignupModal: React.FC = () => {

    const {
        isSignupVisible,
        handleClosePopups,
        handleOpenLogin,
        handleOpenCodeVerification
    } = useModalContext();

    return (
        <Backdrop open={isSignupVisible} onClose={handleClosePopups}>
            <SignupForm
                onClose={handleClosePopups}
                onOpenLogin={handleOpenLogin}
                onSignUpSuccess={handleOpenCodeVerification}
            />
        </Backdrop>
    );
};

export default SignupModal;
