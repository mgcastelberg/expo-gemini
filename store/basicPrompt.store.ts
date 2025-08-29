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

const useBasicPromptStore = create<BasicPrompState>()((set) => ({
    // State
    geminiWriting: false,
    messages:[],
    // Actions
    addMessage: (text: string) => {
        // todo
    },
    setGeminiWriting: (isWriting: boolean) => {
        set({ geminiWriting: isWriting });
    }
}));