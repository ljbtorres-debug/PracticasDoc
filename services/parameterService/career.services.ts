import { CreateCareer } from "@/interfaces/careerInterface";

const url = 'http://localhost:8000/api'

export const getCarrers = async () => {
    try {
        const response = await fetch(`${url}/carrers`);
        return response.json();
    } catch (error) {
        console.error('Error fetching carrers:', error);
        throw error;
    }
}

export const createCareer = async (career: CreateCareer) => {
    try {
        const response = await fetch(`${url}/createCareer`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(career)
            }
        )
        return response.json();
    } catch (error) {
        console.error('Error creating career:', error);
    }
}

export const updateCareer = async (career:CreateCareer, id: number) => {
    try {
        const response = await fetch(`${url}/updateCareer/${id}`,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(career)
            }
        )
        return response.json();
    } catch (error) {
        console.error('Error updating career:', error);
    }
}

export const removeCareer = async (id: number) => {
    try {
        const response = await fetch(`${url}/deleteCareer/${id}`,
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