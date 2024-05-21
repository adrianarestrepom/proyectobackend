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

const DELETE_BY_ID = `
    DELETE 
    FROM GROUPS 
    WHERE id = $1
`;

const CREATE = `
    INSERT 
    INTO GROUPS 
    (owneruserid, name, color) VALUES ($1,$2,$3)
    RETURNING id, owneruserid, name, color
`;

const COUNT_BY_NAME = `
    SELECT COUNT (*) 
    as count
    FROM GROUPS 
    WHERE name = $1
`;

const FULL_UPDATE_BY_ID = `
UPDATE GROUPS 
SET 
name = $1,
color = $2
WHERE id = $3
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

  const deleteById = async (id) => {
    if (!id) throw new Error("ID is required"); // Verifica que el ID no sea nulo o indefinido
    const result = await dbClient.query(DELETE_BY_ID, [id]); // Pasa el ID como parámetro
    return result.rowCount > 0;
  };

  const create = async ({ owneruserid, name, color }) => {
    // Construye la consulta con los parámetros
    const queryText = CREATE.replace("$1", `'${owneruserid}'`)
      .replace("$2", `'${name}'`)
      .replace("$3", `'${color}'`);

    const result = await dbClient.query(queryText);
    return result.rows[0];
  };

  const countByName = async (name) => {
  
    const result = await dbClient.query(COUNT_BY_NAME, [name]); 
    console.info(result);
    const count = parseInt(result.rows[0].count);
    if( isNaN(count)) {
      throw 'Invalid countByName result, is NaN';
    } 
    return count;
  };

  const fullUpdateById = async ({id, name, color}) => {
    const result = await dbClient.query(FULL_UPDATE_BY_ID,[name, color, id]);
    return result.rowCount > 0
        
  }

  return {
    getAll,
    getById,
    deleteById,
    create,
    countByName,
    fullUpdateById,
  };
};

export default Repository;
