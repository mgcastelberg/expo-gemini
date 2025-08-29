import geminiApi from "../gemini.api";

export const basicPromptAction = async (prompt: string) => {
    try {
        const response = await geminiApi.post('/basic-prompt', { prompt }, { responseType: 'text' });
        console.log({data: response.data});
        return response.data;
    } catch (error) {
        console.error('Error geminiApi:', error);
        return '';
    }
};