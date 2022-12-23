const typeorm = require('typeorm');

module.exports = new typeorm.EntitySchema({
    name: "Users", 
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
    },
})