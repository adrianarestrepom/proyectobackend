const GET_ALL = `
    SELECT id, owneruserid, name, color 
    FROM GROUPS 
    ORDER BY createdat DESC
`;

const GET_BY_ID = `
    SELECT id, owneruserid, name, color 
    FROM GROUPS 
    WHERE id = $1
`;

const Repository = (dbClient) => {

    const getAll = async () => {
        const result = await dbClient.query(GET_ALL); // Esta consulta no necesita parámetros
        console.log(result);
        return result.rows;
    };

    const getById = async (id) => {
        if (!id) throw new Error("ID is required"); // Verifica que el ID no sea nulo o indefinido
        const result = await dbClient.query(GET_BY_ID, [id]); // Pasa el ID como parámetro
        return result.rows[0]; // Asume que siempre habrá un resultado
    };

    return {
        getAll,
        getById,
    };
};

export default Repository;

