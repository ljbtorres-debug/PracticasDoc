import { CreateRole } from "@/interfaces/roleInterface";

const url = 'http://localhost:8000/api'

export const getRoles =async()=>{
    try{
        const response = await fetch(`${url}/roles`);
        return response.json();
    }catch(error){
        console.error('Error fetching roles:', error);
        throw error;
    }
}


export const createRol = async (rol: CreateRole) => {
    try {
        const response = await fetch(`${url}/createRol`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rol)
            }
        )
        return response.json();
    } catch (error) {
        console.error('Error creating career:', error);
    }
}

export const updateRol = async (rol:CreateRole, id: number) => {
    try {
        const response = await fetch(`${url}/updateRol/${id}`,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rol)
            }
        )
        return response.json();
    } catch (error) {
        console.error('Error updating career:', error);
    }
}

export const removeRole = async (id: number) => {
    try {
        const response = await fetch(`${url}/deleteRol/${id}`,
            {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        return response.json();
    }
    catch (error) {
        throw error;
    }
}