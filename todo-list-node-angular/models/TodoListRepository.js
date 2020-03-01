function twoDigits(d) {
  if(0 <= d && d < 10) return "0" + d.toString();
  if(-10 < d && d < 0) return "-0" + (-1*d).toString();
  return d.toString();
}

Date.prototype.toMysqlFormat = function() {
  return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

class TodoListRepository {
  db = require("../db/config").databaseConnection;

  findAll(userId){
    return this.db.perform("SELECT * FROM  \`TodoList\`.\`thingstodo\` WHERE owner_id = ? ORDER BY created_at DESC", userId);
  }


  create(item, userId){
    return this.db.perform(
        `insert into \`TodoList\`.\`thingstodo\` (\`name\`, content, \`status\`, owner_id, created_at, modified_at) values (?) `,
        [item.name, item.content, 0, userId, new Date().toMysqlFormat(), new Date().toMysqlFormat()]
    );
  }

  update(item, id, userId){
    return this.db.perform(
        `update \`TodoList\`.\`thingstodo\` set content = ?, status = ?, modified_at = ?, name = ? where id = ? and owner_id = ?`,
        item.content, item.status, new Date().toMysqlFormat(), item.name, id, userId
    );
  }

  delete(id, userId){
   return this.db.perform(
        `
        delete from \`TodoList\`.\`thingstodo\`
        where id = ? and owner_id = ?
        `,
        id, userId
    );
  }
}

let todoListRepository = new TodoListRepository();
exports.todoListRepository = todoListRepository;
