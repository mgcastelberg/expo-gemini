import * as GeminiActions from '@/actions/gemini'; // Tip de importación
// import * as GeminiActions from '@/actions/gemini/basic-prompt.action'; // Tip de importación
// import { getBasicPrompt } from '@/actions/gemini/basic-prompt.action'; // import the action
import uuid from 'react-native-uuid';
import { create } from 'zustand';

interface BasicPrompState {
    geminiWriting: boolean;
    messages: Message[];
    addMessage: (text: string) => void;
    setGeminiWriting: (isWriting: boolean) => void;
}
interface Message {
    id: string;
    text: string;
    createdAt: Date;
    sender: 'user' | 'gemini';
    type: 'text' | 'image';
}

// helper function
const createMessage = (text: string, sender: 'user' | 'gemini', type: 'text' | 'image'): Message => {
    return {
        id: uuid.v4(),
        text,
        createdAt: new Date(),
        sender,
        type
    };
}


export const useBasicPromptStore = create<BasicPrompState>()((set) => ({
    // State
    geminiWriting: false,
    messages:[],
    // Actions
    addMessage: async(text: string) => {
        const userMessage = createMessage(text, 'user', 'text');
        set(state => ({
            geminiWriting: true,
            messages: [ userMessage, ...state.messages] // invertimos intencionalmente el spread para que aparesca el mensaje primero
        }));

        // Peticion a la api y respuesta de Gemini
        GeminiActions.getBasicPromptStream(text);

        // // Peticion a la api y respuesta de Gemini
        // const geminiResponseText = await GeminiActions.getBasicPrompt(text);
        // const geminiMessage = createMessage(geminiResponseText, 'gemini', 'text');

        // set(state => ({
        //     geminiWriting: false,
        //     messages: [ geminiMessage, ...state.messages]
        // }));

        // console.log(geminiResponseText);
    },
    setGeminiWriting: (isWriting: boolean) => {
        set({ geminiWriting: isWriting });
    }
}));