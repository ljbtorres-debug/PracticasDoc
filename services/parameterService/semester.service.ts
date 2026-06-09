import { CreateSemester } from "@/interfaces/ParameterInterfaces/semesterInterface";

const url = 'http://localhost:8000/api'

export const getSemesters = async () => {
    try {
        const response = await fetch(`${url}/semesters`);
        return response.json();
    } catch (error) {
        console.error('Error fetching carrers:', error);
        throw error;
    }
}

export const createSemesters = async (semester: CreateSemester) => {
    try {
        const response = await fetch(`${url}/createSemester`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(semester)
            }
        )
        return response.json();
    } catch (error) {
        console.error('Error creating semester:', error);
    }
}

export const updateSemesters = async (semester:CreateSemester, id: number) => {
    try {
        const response = await fetch(`${url}/updateSemester/${id}`,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(semester)
            }
        )
        return response.json();
    } catch (error) {
        console.error('Error updating semester:', error);
    }
}

export const removeSemesters = async (id: number) => {
    try {
        const response = await fetch(`${url}/deleteSemester/${id}`,
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