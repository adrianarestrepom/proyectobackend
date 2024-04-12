import dataBase from "../database/database.js";

const data = () => {
    return dataBase;
};

const getId = (idGroup) => {
    return dataBase.find((item) => item.id == idGroup)
}


export default {data, getId};