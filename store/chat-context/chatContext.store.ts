import * as GeminiActions from '@/actions/gemini'; // Tip de importación
import uuid from 'react-native-uuid';
import { create } from 'zustand';

interface ChatContextState {
    geminiWriting: boolean;
    chatId: string;
    messages: Message[];
    addMessage: (text: string, attachments: any[]) => void;
    clearChat: () => void;
    // setGeminiWriting: (isWriting: boolean) => void;
}
interface Message {
    id: string;
    text: string;
    createdAt: Date;
    sender: 'user' | 'gemini';
    type: 'text' | 'image';
    images?: any[];
}

// helper function
const createMessage = (
    text: string, 
    sender: 'user' | 'gemini', 
    type: 'text' | 'image', 
    attachments: any[] = []
): Message => {

    if(attachments?.length > 0) {
        return {
            id: uuid.v4(),
            text,
            createdAt: new Date(),
            sender,
            type: 'image',
            images: attachments.map((attachment) => attachment.uri),
        };
    }

    return {
        id: uuid.v4(),
        text,
        createdAt: new Date(),
        sender,
        type
    };
}


export const useChatContextStore = create<ChatContextState>()((set, get) => ({
    // State
    geminiWriting: false,
    chatId: uuid.v4(),
    messages:[],
    // Actions
    addMessage: async(prompt: string, attachments?: any[]) => {

        // Con stream 
        const userMessage = createMessage(prompt, 'user', 'text', attachments);
        const geminiMessage = createMessage('Generando Respuesta....', 'gemini', 'text');
        const chatId = get().chatId;
        
        set((state) => ({
            messages: [ geminiMessage, userMessage, ...state.messages] // invertimos intencionalmente el spread para que aparesca el mensaje primero
        }));

        // Peticion a la api y respuesta de Gemini
        GeminiActions.getChatStream(prompt, chatId, attachments || [], (text) => {
            set((state) => ({
                messages: state.messages.map( (msg) => 
                    msg.id === geminiMessage.id ? { ...msg, text } : msg
                )
            }));
        });
    },
    setGeminiWriting: (isWriting: boolean) => {
        set({ geminiWriting: isWriting });
    },
    clearChat: () => {
        set({ messages: [], chatId: uuid.v4() })
    },
}));