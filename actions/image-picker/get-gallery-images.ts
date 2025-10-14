import * as ImagePicker from 'expo-image-picker';

export const getGalleryImages = async(): Promise<ImagePicker.ImagePickerAsset[]> => {

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
        return [];
    }

    const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            aspect: [4, 3],
            allowsMultipleSelection: false,
            quality: 0.7,
            selectionLimit: 1
    });

    if (result.canceled) {
        return [];
    }

    console.log(result.assets);

    return result.assets;
};