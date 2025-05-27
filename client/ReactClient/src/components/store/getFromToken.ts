import { jwtDecode } from "jwt-decode";

export const getUserIdByToken = () => {
    const token = sessionStorage.getItem('token');
    if (!token) return -1; 

    try {
        const decodedToken:any = jwtDecode(token);
        return decodedToken.nameid; 
    } catch (error) {
        console.error('שגיאה בפענוח ה-Token:', error);
        return -1;
    }
};
export const getUserNameByToken = () => {
    const token = sessionStorage.getItem('token');
    if (!token) return -1; 

    try {
        const decodedToken:any = jwtDecode(token); 
        return decodedToken.unique_name;
    } catch (error) {
        console.error('שגיאה בפענוח ה-Token:', error);
        return -1; 
    }
};
export const getEmailByToken = () => {
    const token = sessionStorage.getItem('token');
    if (!token) return -1;

    try {
        const decodedToken:any = jwtDecode(token); 
        console.log(decodedToken);
        console.log(decodedToken.email);
        
        return decodedToken.email; 
    } catch (error) {
        console.error('שגיאה בפענוח ה-Token:', error);
        return -1; 
    }
};




