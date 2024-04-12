import groupServ from "../services/group.services.js";



const getAll = (req, res) => {
    const data = groupServ.data();
    return res.status(200).json(data);
};

const getId = (req, res) => {
    const data = groupServ.getId(req.params.id);
    console.log(req.params.id);
    return res.status(200).json(data);
};


export default {getAll, getId};