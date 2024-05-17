import Service from "../services/groups.service.js";

const Controller = () => {

    const getAll = async (req, res, next) => {

        const service = Service(req.dbClient);
        console.log("AQUI INGRESE")
        const groups = await service.getAll();
        res.status(200).json(groups); 
        
        next();
    }

    const getById = async (req, res, next) => {

        const service = Service(req.dbClient);
        const group = await service.getById(req.params.id);
        if (group) {
            res.status(200).json(group);
        } else {
            res.status(404).end();
        } 
        next();
        

    }

    return {
        getAll,
        getById
    }

}

export default Controller; 


// import groupServ  from "../services/group.service.js";

// const getAll = async (req, res) => {
//     const data = groupServ.data();
//     return res.status(200).json(data);
// };

// const getId = async (req, res) => {
//     const group = groupServ.getId(req.params.id);
//     console.log(req.params.id);

//     if (!group) {
//         return res.status(404).json({message:`Groups with id ${req.params.id} does not exist`});
//     }
//     return res.status(200).json(group);
// };

// const postGroup = async (req, res) => {
//     const newGroupData = req.body; // Obtener los datos del cuerpo de la solicitud
//     if (!newGroupData || !newGroupData.name) {
//         return res.status(400).json({ mensaje: 'Los datos del grupo son inválidos o están incompletos' });
//     }

//     groupServ.postGroup(newGroupData)
//         .then(nuevoGrupo => {
//             res.status(200).json({ mensaje: 'Grupo creado correctamente', nuevoGrupo });
//         })
//         .catch(error => {
//             res.status(error.codigo).json({ mensaje: error.mensaje });
//         });
// };


// export default {getAll, getId, postGroup};