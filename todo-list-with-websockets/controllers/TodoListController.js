class TodoListController{
    todoListRepository = require("../models/TodoListRepository").todoListRepository;

    index(req, res){
        this.todoListRepository.findAll(req.decodedJwt.id)
            .then(todolist => {
                res.json({
                    data: { todolist },
                });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ message: "400", err });
            });
    }

    create(req, res){
        this.todoListRepository.create({
            content: req.body.content,
            name: req.body.name
        }, req.decodedJwt.id)
            .then(todolist => {
                res.json({ data: { todolist } });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ message: "400", err });
            });
    }

    update(req, res){
        this.todoListRepository.update(
            {
                content: req.body.content,
                status: req.body.status,
                name: req.body.name
            },
            req.params.id,
            req.decodedJwt.id
        )
            .then(todolist => {
                res.json({
                    data: { todolist },
                });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }

    delete(req, res){
        this.todoListRepository.delete(req.params.id, req.decodedJwt.id)
            .then(() => {
                res.json({ message: "To Do Deleted" });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
}

let todolistController = new TodoListController();
exports.todoListController = todolistController;
