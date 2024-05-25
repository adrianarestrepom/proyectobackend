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
        
        const name = validateName(group.name);

        const groupCount = await repository.countByName(name);
        if (groupCount > 0) {
            throw AppError('Ya existe un grupo con ese nombre ', 409)
        }
        return await repository.create(group);
    }

    const fullUpdateById = async(group) => {

        const name = validateName(group.name);
        const existingGroup = await repository.getById(group.id);
        if (!existingGroup) {
            throw AppError('El grupo a modificar no existe ', 404)
        }

        const groupCount = await repository.countByNameNotId(name, group.id);
        if (groupCount > 0) {
            throw AppError('Ya existe otro grupo con ese nombre ', 409)
        }

        return await repository.fullUpdateById({
            ...group,
            name
        });
    }

    const validateName = (newName) => {

     // Limpiar los datos 
         const name = (newName || '').trim(); 
         if (name.length === 0) {
             // Nombre invalido
             throw AppError('El nombre es requerido', 400)
         }
         if (name.length > 30) {
             // Nombre invalido
             throw AppError('El nombre debe ser menor de 30 caracteres ', 400)
         } 

         return name;
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
