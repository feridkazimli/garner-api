const typeorm = require('typeorm');

module.exports = new typeorm.EntitySchema({
    name: "Users",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            unique: true,
            type: 'int',
            generated: true
        },
        email: {
            unique: true,
            type: "varchar"
        },
        password: {
            type: 'varchar'
        }
    },
});
