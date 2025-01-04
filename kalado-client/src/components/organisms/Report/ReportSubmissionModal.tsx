import React from 'react';
import { Backdrop } from '../../../components/atoms';
import ReportSubmissionForm from './ReportSubmissionForm';
import { useModalContext } from '../../../contexts';

const ReportSubmissionModal: React.FC = () => {

    const {
        isReportSubmissionVisible,
        handleClosePopups,
    } = useModalContext();

    return (
        <Backdrop open={isReportSubmissionVisible} onClose={handleClosePopups}>
            <ReportSubmissionForm onClose={handleClosePopups} />
        </Backdrop>
    );
};

export default ReportSubmissionModal;
