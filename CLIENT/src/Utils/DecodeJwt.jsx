import { jwtDecode } from "jwt-decode"

export const decodeToken = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        const { userId, username, email, userRole, cart, favourites, myOrders, store } = decodedToken;  
        
        return {
            userId, 
            username,
            email,
            userRole,
            cart,
            favourites, 
            myOrders, 
            store
        }
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
};
