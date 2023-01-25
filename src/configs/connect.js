const typeorm = require('typeorm');
const dataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "garner-api",
    synchronize: true,
    entities: [
        require("../entities/Users"), 
        require("../entities/Refresh")
        
    ],
});

module.exports = dataSource;