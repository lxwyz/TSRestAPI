let API_URL = "http://localhost:8080"; // Default fallback

if (import.meta.env.VITE_MODE === "development") {
    API_URL = import.meta.env.VITE_LOCAL_URL || API_URL;
}

console.log('Environment:', import.meta.env.VITE_MODE);
console.log('API URL:', API_URL);

export const getTodos = async () => {
    try {
        const url = `${API_URL}/api/todos`;
        console.log('Fetching from:', url);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
}

export const addTodo = async(title: string) => {
    try {
        const response = await fetch(`${API_URL}/api/todos/create`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title})
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.newTodo;
    } catch (error) {
        console.error('Error adding todo:', error);
        throw error;
    }
}

//update Todo
export const updateTodos = async(id: string, title: string) => {
    try {
        const response = await fetch(`${API_URL}/api/todos/update/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title})
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
}


//delete Todo 
export const deleteTodo = async(id: string) => {
    try {
        const response = await fetch(`${API_URL}/api/todos/delete/${id}`,{
            method: 'DELETE'
        })
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.log('Error deleting todo:', error);
        throw error;
    }
}