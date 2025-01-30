import React from 'react';
import { PopupBox } from '../../molecules';
import ReportDetails from './ReportDetails';
import { useModalContext } from '../../../contexts';
import { TReportResponseType } from '../../../constants/apiTypes';

interface ReportDetailsPopup {
    selectedReport: TReportResponseType;
}

const ReportDetailsPopup: React.FC<ReportDetailsPopup> = ({ selectedReport }) => {
    const { isReportDetailsOpen, handleClosePopups } = useModalContext();

    return (
        <PopupBox open={isReportDetailsOpen} onClose={handleClosePopups} isLogoNeeded={false} maxContent={true}>
            <ReportDetails
                report={selectedReport}
            />
        </PopupBox>
    );
};

export default ReportDetailsPopup;
