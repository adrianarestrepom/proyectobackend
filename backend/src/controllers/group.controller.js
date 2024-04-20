import groupServ from "../services/group.services.js";

const getAll = async (req, res) => {
    const data = groupServ.data();
    return res.status(200).json(data);
};

const getId = async (req, res) => {
    const data = groupServ.getId(req.params.id);
    console.log(req.params.id);
    return res.status(200).json(data);
};

const postGroup = async (req, res) => {
    const newGroupData = req.body; // Obtener los datos del cuerpo de la solicitud
    if (!newGroupData || !newGroupData.name) {
        return res.status(400).json({ mensaje: 'Los datos del grupo son inválidos o están incompletos' });
    }

    groupServ.postGroup(newGroupData)
        .then(nuevoGrupo => {
            res.status(200).json({ mensaje: 'Grupo creado correctamente', nuevoGrupo });
        })
        .catch(error => {
            res.status(error.codigo).json({ mensaje: error.mensaje });
        });
};


export default {getAll, getId, postGroup};