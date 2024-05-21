import Repository from "../repositories/groups.repository.js";
import AppError from "../lib/application.error.js";

const Service = (dbClient) => {

    const repository = Repository(dbClient);

    const getAll = async () => {
        return await repository.getAll();
    }

    const getById = async (id) => {
        return await repository.getById(id);
    }

    const deleleById= async (id) => {
        return await repository.deleteById(id);
    }

    const create = async (group) => {
        
        // Limpiar los datos 
        const name = (group.name || '').trim(); 
        if (name.length === 0) {
            // Nombre invalido
            throw AppError('El nombre es requerido', 400)
        }
        if (name.length > 30) {
            // Nombre invalido
            throw AppError('El nombre debe ser menor de 30 caracteres ', 400)
        }        
        const groupCount = await repository.countByName(name);
        if (groupCount > 0) {
            throw AppError('Ya existe un grupo con ese nombre ', 409)
        }
        return await repository.create(group);
    }

    const fullUpdateById = async(group) => {
        return await repository.fullUpdateById(group);
    }

    
    return {
        getAll,
        getById,
        deleleById, 
        create,
        fullUpdateById
    }

}

export default Service;
