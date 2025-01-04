import React from 'react';
import { Backdrop } from '../../../components/atoms';
import CreateAdForm from './CreateAdForm';
import { useModalContext } from '../../../contexts';

const CreateAdModal: React.FC = () => {

    const {
        isCreateAdVisible,
        handleClosePopups
    } = useModalContext();

    return (
        <Backdrop open={isCreateAdVisible} onClose={handleClosePopups}>
            <CreateAdForm onClose={handleClosePopups} />
        </Backdrop>
    );
};

export default CreateAdModal;
