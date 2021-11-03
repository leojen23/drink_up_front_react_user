

export default function tokenParser(token: string | null) {
    try {
        if(token){
            return JSON.parse(atob(token.split('.')[1])); 
        }
    } catch (error) {
            return null;     
    }
}