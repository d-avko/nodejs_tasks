class Database{
    mysql = require('mysql');

    databaseConnection = this.mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password"
    });

    constructor() {
        this.databaseConnection.connect((err) => {
            if (err) throw err;
            console.log("Connected!");
            this.databaseConnection.query("CREATE DATABASE IF NOT EXISTS TodoList", function (err, result) {
                if (err) throw err;
                console.log("Database created");
            });

        setTimeout(async () => {
            await this.perform(`
                CREATE TABLE IF NOT EXISTS \`TodoList\`.\`users\` (
                  \`id\` INT NOT NULL AUTO_INCREMENT,
                  \`username\` VARCHAR(1024) NULL,
                  \`email\` VARCHAR(1024) NULL,
                  \`passwordhash\` VARCHAR(256),
                  PRIMARY KEY (\`id\`))
                  ENGINE = InnoDB;
                `);

            await this.perform(`       
                CREATE TABLE IF NOT EXISTS \`TodoList\`.\`thingstodo\` (
                  \`id\` INT NOT NULL AUTO_INCREMENT,
                  \`content\` VARCHAR(1024) NULL,
                  \`name\` VARCHAR(1024) NULL,
                  \`owner_id\` INT NOT NULL,
                  \`file_url\` VARCHAR(1024) NULL,
                  \`status\` INT NULL,
                  \`created_at\` DATETIME NOT NULL,
                  \`modified_at\` DATETIME NOT NULL,
                  FOREIGN KEY (owner_id) REFERENCES users(id),
                  PRIMARY KEY (\`id\`)
                  )
                  ENGINE = InnoDB;`
                );

        }, 2500);
        })
    }

    async perform(sql, ...params) {
        return new Promise(((resolve, reject) => {
            this.databaseConnection.query(sql, params, function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
            });
        }))
    }
}

let database = new Database();
exports.databaseConnection = database;
