import { fetch } from 'expo/fetch';
// import geminiApi from "../gemini.api";
// Axios no retorna los datos en forma de stream
// por lo cual usaremos un fetch
const API_URL = process.env.EXPO_PUBLIC_GEMINI_API_URL;

export const getBasicPromptStream = async (prompt: string) => {
    const response = await fetch(`${API_URL}/basic-prompt-stream`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'plain/text'
        },
        body: JSON.stringify({ prompt })
    });

    if (!response.body) {
        console.error('No response body');
        throw new Error('No response body');
    }

    const reader = response.body.getReader(); // viene de un Uint8Array
    const decoder = new TextDecoder('utf-8');
    let result = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        const chunk = decoder.decode(value);
        result += chunk;
        console.log({result});
    }
};