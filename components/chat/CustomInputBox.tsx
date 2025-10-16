import { Button, Input, Layout } from '@ui-kitten/components';
import { ImagePickerAsset } from 'expo-image-picker';
import { Image, KeyboardAvoidingView, Platform } from 'react-native';

import { getGalleryImages } from '@/actions/image-picker/get-gallery-images';
import { useThemeColor } from '@/hooks/useThemeColor';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
interface Props {
  // attachments?: any[];
  onSendMessage: (message: string, attachments?: ImagePickerAsset[]) => void;
}

const CustomInputBox = ({ onSendMessage }: Props ) => {
  const isAndroid = Platform.OS === 'android';
  const iconColor = useThemeColor({}, 'icon');

  // Uso de forma tradicional
  const [text, setText] = useState('');
  const [images, setImages] = useState<ImagePickerAsset[]>([]); //por defecto es un array vacio

  // Handle para el input
  const handleSendMessage = () => {
    if (text.trim() !== '') {
      
      console.log(text);

      // todo: validations
      onSendMessage(text.trim(), images);
      setText(''); // Limpiar el campo de texto
      setImages([]);
      
    }
  };

  const handlePickImage = async() => {
    console.log('handlePickImage');

    const selectedImages = await getGalleryImages();
    if (selectedImages.length <= 0 || selectedImages.length > 4) return;

    const availableSlots = 3 - images.length;
    const imagesToAdd = selectedImages.slice(0, availableSlots);
    if(imagesToAdd.length > 0) {
      setImages([...images, ...imagesToAdd]);
    }

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

        {
          images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.uri }}
              style={{ width: 50, height: 50, marginTop: 5, borderRadius: 5 }}
            />
          ))
        }
        
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
