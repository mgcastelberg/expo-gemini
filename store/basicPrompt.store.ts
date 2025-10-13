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
    addMessage: async(prompt: string) => {

        // Con stream 
        const userMessage = createMessage(prompt, 'user', 'text');
        const geminiMessage = createMessage('Generando Respuesta....', 'gemini', 'text');
        
        set((state) => ({
            messages: [ geminiMessage, userMessage, ...state.messages] // invertimos intencionalmente el spread para que aparesca el mensaje primero
        }));

        // Peticion a la api y respuesta de Gemini
        GeminiActions.getBasicPromptStream(prompt, (text) => {
            set((state) => ({
                messages: state.messages.map( (msg) => 
                    msg.id === geminiMessage.id ? { ...msg, text } : msg
                )
            }));
        });
    },
    setGeminiWriting: (isWriting: boolean) => {
        set({ geminiWriting: isWriting });
    }
}));