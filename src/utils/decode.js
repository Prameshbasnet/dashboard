export const decodeBase64Data = (base64EncodedData) => {
  if (typeof base64EncodedData === 'string' && base64EncodedData.length > 0) {
    try {
      // Clean the Base64 encoded string
      const cleanedBase64 = base64EncodedData.replace(/[^A-Za-z0-9+/=]/g, '');
      // Add padding if necessary
      const paddedBase64 = cleanedBase64.padEnd(cleanedBase64.length + ((4 - (cleanedBase64.length % 4)) % 4), '=');

      // Decode the Base64 encoded string
      const decodedString = atob(paddedBase64);

      // Parse the decoded data as JSON
      const parsedData = JSON.parse(decodedString);

      // Check if required fields exist in the parsed data
      if (parsedData.token && parsedData.modulePermission) {
        const { token, modulePermission, userName, role } = parsedData;
        return { token, modulePermission, userName, role };
      } else {
        console.error('Required fields are missing in the parsed data.');
        return null;
      }
    } catch (error) {
      console.error('Error decoding or parsing base64 data:', error);
      return null;
    }
  }

  console.error('Invalid base64 encoded data.');
  return null;
};
