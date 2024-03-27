export const fetchServer = async () => {
    try {
        const response = await fetch('http://localhost:8000/favorites');
        if (!response.ok) {
        throw new Error(`Error: Status Code ${response.status}. Failed to get repositories.`)
        }
        const data = response.json();
        return data;
    } catch (error) {
        console.log(error);
        return;
    }
}