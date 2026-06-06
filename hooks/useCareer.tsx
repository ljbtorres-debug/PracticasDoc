import { Career, CreateCareer } from "@/interfaces/careerInterface"
import { createCareer, getCarrers, removeCareer, updateCareer } from "@/services/parameterService/career.services";
import { useEffect, useState } from "react"


const useCareer = () => {
    const [careers, setCareers] = useState<Career[]>();
    const [loading,setLoading]=useState(false);
    const [save,setSave]=useState(false);


    useEffect(() => {
        fetchCarrers()
    }, [])
    const fetchCarrers = async () => {
        try {
            setLoading(true)
            const response = await getCarrers();
            setCareers(response);
        } catch (error) {
            console.error('Error al traer carreras', error)
            throw error
        }finally{
            setLoading(false)
        }
    }

    const deletedCareer = async (id: number) => {
        try {
            setSave(true)
            const response = await removeCareer(id)
            return response
        } catch (error) {
            throw error
        }finally{
            setSave(false)
        }

    }
    const editCareer=async(career:CreateCareer,id:number)=>{
        try {
            setSave(true)
            const response=await updateCareer(career,id);
            return response
        } catch (error) {
            console.error('error al editar career', error)            
        }finally{
            setSave(false)
        }
    }
    const newCareer=async(career:CreateCareer)=>{
        try {
            setSave(true)
            const response = await createCareer(career);
            return response
        } catch (error) {
            console.error('error al crear la carrera ',error);
        }finally{
            setSave(false)
        }
    }


    return {
        careers,
        loading,
        save,

        reload:fetchCarrers,
        deletedCareer,
        editCareer,
        newCareer

    }
}
export default useCareer
