import { fetch } from 'expo/fetch';
import { FileType, promptWithFiles } from '../helpers/prompt-with-images';
// Axios no retorna los datos en forma de stream
// por lo cual usaremos un fetch
const API_URL = process.env.EXPO_PUBLIC_GEMINI_API_URL;

export const getBasicPromptStream = async (
  prompt: string,
  files: FileType[],
  onChunk: (text: string) => void
) => {

    if(files.length > 0) {
        try {
            const response = await promptWithFiles('/basic-prompt-stream-v2', prompt, files);
            onChunk(response);
            return;
        } catch ( error ) {
            console.error( error );
            throw error;
        }
    }

    try {
        const formData = new FormData();
        formData.append('prompt', prompt);

        const response = await fetch(`${API_URL}/basic-prompt-stream`, {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
            },
            body: formData
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
            onChunk(result);
        }
    } catch (error) {
        console.log(error);
        throw 'Unexpected error happend';
    }
};