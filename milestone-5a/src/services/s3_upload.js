import axios from 'axios';

export const uploadToS3 = async (file) => {
  try {
    // Convert file to base64
    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        // Remove the data URL prefix to get just the base64 data
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });

    // Upload to your API - match the expected format
    const response = await axios.post('', {
      fileName: file.name,
      contentType: file.type,
      fileData: base64Data
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Return the image URL from your API response
    return response.data.url;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Failed to upload file');
  }
};