import { useEffect, useState } from "react"
import { getSemesters,updateSemesters,createSemesters,removeSemesters } from "@/services/parameterService/semester.service";
import { Semester,CreateSemester } from "@/interfaces/ParameterInterfaces/semesterInterface";


const useSemester = () => {
    const [semesters, setSemesters] = useState<Semester[]>();
    const [loading, setLoading] = useState(false);
    const [save, setSave] = useState(false);
    useEffect(() => {
        fetchSemester()
    }, [])

    const fetchSemester = async () => {
        try {
            setLoading(true)
            const response = await getSemesters()
            setSemesters(response)
        } catch (error) {
            console.error('Error al obtener los semestres', error)
            throw error
        } finally {
            setLoading(false)
        }
    }
    const deletedSemester = async (id: number) => {
        try {
            setSave(true)
            const response = await removeSemesters(id)
            return response
        } catch (error) {
            throw error
        } finally {
            setSave(false)
        }

    }
    const editSemester = async (semester: CreateSemester, id: number) => {
        try {
            setSave(true)
            const response = await updateSemesters(semester, id);
            return response
        } catch (error) {
            console.error('error al editar el semestre', error)
        } finally {
            setSave(false)
        }
    }
    const newSemester = async (semester: CreateSemester) => {
        try {
            setSave(true)
            const response = await createSemesters(semester);
            return response
        } catch (error) {
            console.error('error al crear la carrera ', error);
        } finally {
            setSave(false)
        }
    }

    return {
        semesters,
        save,
        loading,

        reload: fetchSemester,
        deletedSemester,
        editSemester,
        newSemester

    }
}
export default useSemester
