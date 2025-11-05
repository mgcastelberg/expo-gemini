import { Layout } from '@ui-kitten/components';
// import uuid from 'react-native-uuid';

import { ChatMessages } from '@/components/chat/ChatMessages';
import CustomInputBox from '@/components/chat/CustomInputBox';
import { useChatContextStore } from '@/store/chat-context/chatContext.store';
// import { Message } from '@/interfaces/chat.interfaces';

// const messages: Message[] = [
//   {
//     id: uuid.v4(),
//     text: 'Hola Gemini!, ¿cómo estás?',
//     createdAt: new Date(),
//     sender: 'user',
//     type: 'text',
//   },
//   {
//     id: uuid.v4(),
//     text: 'Estoy bien, gracias por preguntar.',
//     createdAt: new Date(),
//     sender: 'gemini',
//     type: 'text',
//   },
//   {
//     id: uuid.v4(),
//     images: ['https://picsum.photos/400/300', 'https://picsum.photos/400/300'],
//     createdAt: new Date(),
//     sender: 'gemini',
//     type: 'image',
//     text: 'Qué logras con esta imagen?',
//   },
// ];

const ChatHistoryScreen = () => {

  const messages = useChatContextStore((state) => state.messages);
  const isGeminiWriting = useChatContextStore((state) => state.geminiWriting);
  const { addMessage } = useChatContextStore();

  return (
    <Layout style={{ flex: 1 }}>
      <ChatMessages messages={messages} isGeminiWriting={isGeminiWriting} />

      <CustomInputBox onSendMessage={(message, attachments) => {
          console.log({message, attachments});
          addMessage(message, attachments || []);
      }} />
    </Layout>
  );
};

export default ChatHistoryScreen;
