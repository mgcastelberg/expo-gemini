import { Button, Input, Layout } from '@ui-kitten/components';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { getGalleryImages } from '@/actions/image-picker/get-gallery-images';
import { useThemeColor } from '@/hooks/useThemeColor';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
interface Props {
  attachments?: any[];
  onSendMessage: (message: string, attachments?: any[]) => void;
}

const CustomInputBox = ({ attachments = [], onSendMessage }: Props) => {
  const isAndroid = Platform.OS === 'android';
  const iconColor = useThemeColor({}, 'icon');

  // Uso de forma tradicional
  const [text, setText] = useState('');

  // Handle para el input
  const handleSendMessage = () => {
    if (text.trim() !== '') {
      
      console.log(text);

      // todo: validations
      onSendMessage(text.trim());
      setText(''); // Limpiar el campo de texto
      
    }
  };

  const handlePickImage = async() => {
    console.log('handlePickImage');
    const selectedImages = await getGalleryImages();
  };

  return (
    <KeyboardAvoidingView
      behavior={isAndroid ? 'height' : 'padding'}
      keyboardVerticalOffset={isAndroid ? 0 : 85}
    >
      {/* Imágenes */}
      <Layout
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        {/* <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={{ width: 50, height: 50, marginTop: 5 }}
        /> */}
      </Layout>

      {/* Espacio para escribir y enviar mensaje */}
      <Layout
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: isAndroid ? 10 : 20,
        }}
      >
        <Button
          appearance="ghost"
          onPress={handlePickImage}
          accessoryRight={
            <Ionicons name="attach-outline" size={22} color={iconColor} />
          }
        />
        <Input
          placeholder="Escribe tu mensaje"
          multiline
          numberOfLines={4}
          style={{ flex: 1 }}
          value={text}
          onChangeText={setText} // reduced
          // onChangeText={(text) =>setText(text)}
        />
        <Button
          // onPress={() => onSendMessage(text, attachments)}
          onPress={handleSendMessage}
          appearance="ghost"
          accessoryRight={
            <Ionicons name="paper-plane-outline" size={22} color={iconColor} />
          }
        />
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default CustomInputBox;
