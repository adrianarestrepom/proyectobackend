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

const postGroup = (req, res) => {
    const newGroupData = req.body; // Obtener los datos del cuerpo de la solicitud
    if (!newGroupData || !newGroupData.name || !newGroupData.color) {
        return res.status(400).json({ mensaje: 'Los datos del grupo son inválidos o están incompletos' });
    }

    groupServ.postGroup(newGroupData)
        .then(nuevoGrupo => {
            res.status(200).json({ mensaje: 'Grupo creado correctamente', nuevoGrupo });
        })
        .catch(error => {
            res.status(500).json({ mensaje: 'Error al crear el grupo', error });
        });
};



export default {getAll, getId, postGroup};