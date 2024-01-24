import { jwtDecode } from "jwt-decode"

export const decodeToken = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        const { userId, username, email, userRole } = decodedToken;  
        
        return {
            userId, 
            username,
            email,
            userRole
        }
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
};
