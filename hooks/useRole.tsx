import { CreateRole, Role } from "@/interfaces/roleInterface"
import { createRol, getRoles, removeRole, updateRol } from "@/services/parameterService/role.services";
import { useEffect, useState } from "react"


const useRole = () => {
    const [roles, setRoles] = useState<Role[]>();
    const [loading, setLoading] = useState(false);
    const [save, setSave] = useState(false);
    useEffect(() => {
        fetchRoles()
    }, [])

    const fetchRoles = async () => {
        try {
            setLoading(true)
            const response = await getRoles()
            setRoles(response)
        } catch (error) {
            console.error('Error al obtener roles', error)
            throw error
        } finally {
            setLoading(false)
        }
    }
    const deletedRole = async (id: number) => {
        try {
            setSave(true)
            const response = await removeRole(id)
            return response
        } catch (error) {
            throw error
        } finally {
            setSave(false)
        }

    }
    const editRol = async (rol: CreateRole, id: number) => {
        try {
            setSave(true)
            const response = await updateRol(rol, id);
            return response
        } catch (error) {
            console.error('error al editar career', error)
        } finally {
            setSave(false)
        }
    }
    const newRol = async (rol: CreateRole) => {
        try {
            setSave(true)
            const response = await createRol(rol);
            return response
        } catch (error) {
            console.error('error al crear la carrera ', error);
        } finally {
            setSave(false)
        }
    }

    return {
        roles,
        save,
        loading,

        reload: fetchRoles,
        deletedRole,
        editRol,
        newRol

    }
}
export default useRole
