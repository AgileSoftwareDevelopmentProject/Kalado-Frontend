import { sendRequest } from './axiosInstance';
import { REPORT } from './urls';
import { ReportData, ReportStatusUpdateData } from '../../utils/apiTypes';


export async function createReport(reportData: ReportData) {
    return sendRequest(
        REPORT.CREATE,
        'POST',
        reportData, 
        undefined, 
        {
            'Content-Type': 'application/json', 
        }
    );
}

export async function updateReportStatus(token: string, reportId: number, reportStatusData: ReportStatusUpdateData) {
    return sendRequest(
        REPORT.UPDATE_STATUS(reportId),
        'POST',
        reportStatusData, 
        undefined, 
        {
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}`, 
        }
    );
}

export async function getAllReports(token: string) {
    return sendRequest(
        REPORT.GET_ALL_REPORTS,
        'GET',
        undefined, 
        undefined, 
        {
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}`, 
        }
    );
}

export async function getMyReports(token: string) {
    return sendRequest(
        REPORT.GET_MY_REPORTS,
        'GET',
        undefined, 
        undefined, 
        {
            Authorization: `Bearer ${token}`, 
        }
    );
}

export async function getReportStatistics(token: string, startDate: string, endData: string) {
    return sendRequest(
        REPORT.GET_REPORT_STATISTICS(startDate, endData),
        'GET',
        undefined, 
        undefined, 
        {
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}`, 
        }
    );
}