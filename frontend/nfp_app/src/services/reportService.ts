import { BASE_URL } from '../constants';
import { loginRequest } from "../authConfig";

export const generateMonthlyReport = async (
  instance: any, 
  options?: {
    mode: 'month' | 'custom';
    dateRange?: {
      start: Date | null;
      end: Date | null;
    };
  }
) => {
  try {
    const tokenResponse = await instance.acquireTokenSilent(loginRequest);
    console.log('Making request with:', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenResponse.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mode: options?.mode || 'month',
        dateRange: options?.dateRange
      })
    });

    const response = await fetch(`${BASE_URL}api/generate-monthly-report/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenResponse.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mode: options?.mode || 'month',
        dateRange: options?.dateRange
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error || response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
};

export const getEmailReports = async (instance: any) => {
    try {
        const tokenResponse = await instance.acquireTokenSilent(loginRequest);
        const response = await fetch(`${BASE_URL}api/reports/emails/`, {
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