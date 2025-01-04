import React from 'react';
import { Backdrop } from '../../../components/atoms';
import CodeVerificationForm from './CodeVerificationForm';
import { useModalContext } from '../../../contexts';


const CodeVerificationModal: React.FC = () => {

    const {
        isCodeVerificationVisible,
        handleClosePopups
    } = useModalContext();

    return (
        <Backdrop open={isCodeVerificationVisible} onClose={handleClosePopups}>
            <CodeVerificationForm onClose={handleClosePopups} />
        </Backdrop>
    );
};

export default CodeVerificationModal;
