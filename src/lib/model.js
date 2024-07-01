const Model = () => {
  const entities = [];

  const findUnique = (id) => {
    return entities.find((entity) => entity.id === id);
  };
  const findMany = () => {
    return entities;
  };

  const create = (entity) => {
    const maxId = entities.reduce((max, { id }) => Math.max(max, id), 0);
    const newId = (maxId + 1).toString();
    const newEntity = {
        ...entity,
        id: newId,
    };
    entities.push(newEntity);
  };

  const del = (id) => {
    const entityIndex = entities.findIndex((entity) => entity.id === id);

    if(entityIndex !== -1) {
        entities.splice(entityIndex, 1);

        return true;
    }

    return false;
  };

  const update = (id, newEntity) => {
    const entityIndex = entities.findIndex((entity) => entity.id === id);

    if (entityIndex !== -1) {
        entities[entityIndex] = newEntity;

        return true;
    }

    return false; 
  };

  return {
    findUnique,
    findMany,
    create,
    delete: del,
    update,
  };

};

export { Model };
