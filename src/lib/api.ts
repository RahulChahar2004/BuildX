import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const buildxApi = {
    // Users
    syncUser: async (clerkUserData: any) => {
        const res = await axios.post(`${API_URL}/users/sync`, { data: clerkUserData });
        return res.data;
    },

    // Interviews
    setupInterview: async (formData: FormData) => {
        // FormData should contain: clerkId, resume (file), jobDescription, roleLevel
        const res = await axios.post(`${API_URL}/interviews/setup`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return res.data;
    },

    getInterview: async (interviewId: string) => {
        const res = await axios.get(`${API_URL}/interviews/${interviewId}`);
        return res.data;
    },

    sendChatMessage: async (interviewId: string, text: string) => {
        const res = await axios.post(`${API_URL}/interviews/${interviewId}/message`, { text });
        return res.data;
    },

    finalizeInterview: async (interviewId: string) => {
        const res = await axios.post(`${API_URL}/interviews/${interviewId}/finalize`);
        return res.data;
    },

    // Reports
    getReport: async (interviewId: string) => {
        const res = await axios.get(`${API_URL}/reports/interview/${interviewId}`);
        return res.data;
    }
};
