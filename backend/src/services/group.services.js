import dataBase from "../database/database.js";

const data = () => {
    return dataBase;
};

const getId = (idGroup) => {
    return dataBase.find((item) => item.id == idGroup)
};

const postGroup = (newGroupData) => {
    const newId = dataBase.length + 1;
    const newGroup = { id: newId, ...newGroupData };
    dataBase.push(newGroup); // Agregar el nuevo grupo al array
    return Promise.resolve(newGroup); // Retorna una promesa resuelta con el nuevo grupo
};


export default {data, getId, postGroup};