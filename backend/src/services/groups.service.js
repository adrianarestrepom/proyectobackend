import Repository from "../repositories/groups.repository.js";

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

    return {
        getAll,
        getById,
        deleleById, 
    }

}

export default Service;











// import dataBase from "../database/database.js";

// const data = () => {
//     return dataBase;
// };

// const getId = (idGroup) => {
//     return dataBase.find((item) => item.id == idGroup)
// };

// const postGroup = (newGroupData) => {
//     if (typeof newGroupData.name !== 'string'){
//         return Promise.reject({
//             mensaje: 'El nombre debe ser un texto',
//             codigo: 400
//         });
//     }
//     const validName = newGroupData.name.trim().length;
//     if (validName <=0 || validName > 30){
//         return Promise.reject({
//             mensaje: 'Elige un nombre valido para continuar; debe tener menos de 30 caracteres',
//             codigo: 400
//         });
//     }
//     const nameExist = dataBase.find((item) => item.name == newGroupData.name)
//     if (nameExist){
//         return Promise.reject({
//                 mensaje: 'El nombre del grupo ya existe',
//                 codigo: 409
//             });
//     }
    
//     const maxId = dataBase.reduce((max, { id }) => Math.max(max, id), 0);
//     const newGroup = { id: maxId + 1, ...newGroupData };
//     if (!newGroup.color){
//         newGroup.color = "Default"
//     }
//     dataBase.push(newGroup); // Agregar el nuevo grupo al array
//     return Promise.resolve(newGroup); // Retorna una promesa resuelta con el nuevo grupo
// };


// export default {data, getId, postGroup};