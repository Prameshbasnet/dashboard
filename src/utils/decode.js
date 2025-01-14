import {jwtDecode} from "jwt-decode";

export const decodeJwtToken = (jwtToken) => {
  if (typeof jwtToken === 'string' && jwtToken.length > 0) {
    try {
      // Decode the JWT token using jwt-decode
      const decodedPayload = jwtDecode(jwtToken);

      // Check if required fields exist in the decoded payload
      if (decodedPayload.token && decodedPayload.modulePermission) {
        const { token, modulePermission, userName, role } = decodedPayload;
        return { token, modulePermission, userName, role };
      } else {
        console.error('Required fields are missing in the decoded payload.');
        return null;
      }
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  console.error('Invalid JWT token.');
  return null;
};
