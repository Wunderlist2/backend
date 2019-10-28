const db = require('../dbConfig.js');

module.exports = {
    find,
    findById,
    create,
    remove,
    update
};

async function find() {
    const task = await db("tasks");
    return task;
}

async function findById(id) {
    const task = await db("tasks")
        .where({ id })
        .first();
    return task;
}

async function create(item) {
    const [id] = await db("tasks")
        .insert(item)
        .returning("id");
    if(id) {
        const task = await findById(id);
        return task;
    }
}

async function remove(id) {
    const task = await findById(id);
     if (task) {
         const deleted = await db("tasks")
            .where({ id })
            .del();
        if (deleted) {
          return task;
        }
     }
}

async function update(item, id) {
    const editedTask = await db("tasks")
        .where({ id })
        .update(item);
    if (editedTask) {
        const task = await findById(id);
        return task;
    }
}
