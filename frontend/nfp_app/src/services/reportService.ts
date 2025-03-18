import { BASE_URL } from '../constants';
import { loginRequest } from "../authConfig";

export const generateMonthlyReport = async (instance: any) => {
    try {
        const tokenResponse = await instance.acquireTokenSilent(loginRequest);
        const response = await fetch(`${BASE_URL}api/generate-monthly-report/`, {
            headers: {
                'Authorization': `Bearer ${tokenResponse.accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.error || response.statusText}`);
        }

        const data = await response.json();
        console.log('Generated report data:', data);
        return data;
    } catch (error) {
        console.error('Error generating report:', error);
        throw error;
    }
};

export const getEmailReports = async (instance: any) => {
    try {
        const tokenResponse = await instance.acquireTokenSilent(loginRequest);
        const response = await fetch(`${BASE_URL}api/reports/`, {
            headers: {
                'Authorization': `Bearer ${tokenResponse.accessToken}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.error || response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched reports:', data);
        return data;
    } catch (error) {
        console.error('Error fetching reports:', error);
        throw error;
    }
}; 