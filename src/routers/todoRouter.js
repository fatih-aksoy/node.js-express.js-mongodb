const router = require("express").Router();
const todoController = require("../controllers/todoController");

// yeni todo eklemek icin
router.post("/todo", todoController.todoAdd);

// tum kayitlari getiren islem
router.get("/todo", todoController.todoGetAll);

// todo update etmek icin rota belirleme
router.put("/todo/:id", todoController.todoUpdate);

// todo silmek icin rota berlirleme
router.delete("/todo/:id", todoController.todoDelete);

// to focus on details. secilmis olan todo id sini yakala ve detail getir.
router.get("/todo/:id", todoController.todoGet);

module.exports = router;
