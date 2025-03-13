import { jwtDecode } from "jwt-decode";

export const getUserIdByToken = () => {
    const token = sessionStorage.getItem('token');
    if (!token) return -1; // אם הטוקן לא קיים, מחזיר -1

    try {
        const decodedToken:any = jwtDecode(token); // פענוח הטוקן
        console.log(decodedToken);
        console.log(decodedToken.nameid);
        
        return decodedToken.nameid; // מחזיר את ה-ID של המשתמש
    } catch (error) {
        console.error('שגיאה בפענוח ה-Token:', error);
        return -1; // במקרה של שגיאה, מחזיר -1
    }
};
export const getUserNameByToken = () => {
    const token = sessionStorage.getItem('token');
    if (!token) return -1; // אם הטוקן לא קיים, מחזיר -1

    try {
        const decodedToken:any = jwtDecode(token); // פענוח הטוקן
        console.log(decodedToken);
        console.log(decodedToken.unique_name);
        
        return decodedToken.unique_name; // מחזיר את ה-ID של המשתמש
    } catch (error) {
        console.error('שגיאה בפענוח ה-Token:', error);
        return -1; // במקרה של שגיאה, מחזיר -1
    }
};





