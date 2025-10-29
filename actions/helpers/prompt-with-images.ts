import geminiApi from "../gemini.api";

// con fetch
export interface FileType {
    uri: string;
    fileName?: string;
    type?: string;
}

export const promptWithFiles = async (
  endpoint: string,
  prompt: string,
  files: FileType[]
): Promise<string> => {

    try {
        const response = await uploadImage(files, prompt, endpoint);
        return response.data as string;
    } catch ( error ) {
        console.error( JSON.stringify( error, null, 2 ) );
        throw error;
    }

};

export const uploadImage = async ( files: any, prompt: string, endpoint: string ) => {

  const formData = new FormData();
  files.forEach((file: any)=> {
    formData.append("files", {
      uri: file.uri,
      name: file.fileName ?? "image.jpg",
      type: file.mimetype ?? "image/jpeg",
    } as unknown as Blob);
  });

  formData.append( "prompt", prompt );

  const response = await geminiApi.post(
    endpoint,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;

};



// export const promptWithImages = async (
//   endpoint: string,
//   prompt: string,
//   files: FileType[],
// ): Promise<string> => {
//   try {
//     const API_URL = process.env.EXPO_PUBLIC_GEMINI_API_URL;
//     console.log('API_URL:', API_URL);

//     const formData = new FormData();
//     formData.append('prompt', prompt);

//     files.forEach((file) => {
//         formData.append('files', {
//             uri: file.uri,
//             name: file.fileName || 'image.jpg',
//             type: file.type || 'image/jpeg',
//         } as any);
//     });

//     console.log(formData);

//     const response = await fetch(`${API_URL}${endpoint}`, {
//       method: 'POST',
//       headers: {
//         'Accept': 'text/plain',
//       },
//       body: formData,
//     });

//     const text = await response.text();
//     return text;

//   } catch (error) {
//     console.error('Error al enviar imagen:', error);
//     throw error;
//   }
// };

// con axios
// import geminiApi from "../gemini.api";

// export const promptWithImages = async (
//     endpoint: string, 
//     prompt: string, 
//     files: FileType[],
// ): Promise<string> => {
//     try {
//         const API_URL = process.env.EXPO_PUBLIC_GEMINI_API_URL;
//         const formData = new FormData();
//         formData.append('prompt', prompt);
        
//         files.forEach((file) => {
//             formData.append('files', {
//                 uri: file.uri,
//                 name: file.fileName ?? 'image.jpg',
//                 type: file.type ?? 'image/jpeg',
//             } as unknown as Blob);
//         });

//         const response = await geminiApi.post(endpoint, formData); 
//         // const response = await geminiApi.post(endpoint, formData); 
//         return response.data;

//     } catch (error) {
//         console.error('Error geminiApi:', error);
//         throw error; 
//     }
// };


// try {
//     const response = await geminiApi.post('/basic-prompt-stream', { prompt }, { responseType: 'text' });
//     console.log({data: response.data});
//     // return response.data;
//     onChunk(response.data);
// } catch (error) {
//     console.error('Error geminiApi:', error);
//     return '';
// }