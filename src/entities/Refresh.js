const typeorm = require('typeorm');
module.exports = new typeorm.EntitySchema({
    name: "RefreshToken", 
    tableName: "refresh",
    columns: {
        id: {
            type: "uuid",
            generated: "uuid",
            unique: true
        },
        userId: {
            type: "int",
            unique: true,
            primary:true,
            generated: true
        },
    },
});