let sha256 = require('js-sha256').sha256;
let jwt = require('jsonwebtoken');

class IdentityRepository {
    db = require("../db/config").databaseConnection;

    login(login, password){
        return this.db.perform(
            `select * from \`TodoList\`.\`users\` where username = ? and passwordhash = ?`,
            login, sha256(password)
        ).then(result => {
            if(!result || !result.length){
                throw new Error("Incorrect login or password.")
            }

            return jwt.sign({id: result[0].id},
                'examplesecret',
                { expiresIn: '24h' // expires in 24 hours
                }
            );
        });
    }

    register(login, email, password){
        let users = this.db.perform(
            `select * from \`TodoList\`.\`users\` where username = ?`,
            login
        );

        if(users && users.length){
            throw new Error("User already exists.")
        }

        return this.db.perform(
            `insert into \`TodoList\`.\`users\` (username, email, passwordhash) values (?) `,
            [login, email, sha256(password)]
        );
    }
}

let identityRepository = new IdentityRepository();
exports.identityRepository = identityRepository;