const todo = require("../model/todoModel");

// CRUD

const todoAdd = async (req, res) => {
  const _todo = await todo.findOne({ name: req.body.name });
  try {
    // ayni to do bir daha girilmesin diye...asgidaki islem
    const todoAdd = new todo(req.body);
    console.log(_todo);
    if (_todo) {
      return res.status(400).json({
        success: false,
        message: "This Todo has already been registered!",
      });
    }

    await todoAdd
      .save()
      .then(() => {
        return res.status(201).json(todoAdd);
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: "Fail in todo!!!" + err,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "todo can not be created!!!",
    });
  }
};

const todoGetAll = async (req, res) => {
  // enson skip limit islemleri yapalim
  const { page } = req.query;
  const limit = 2; // 2 ser 2 ser kayitlari gostermek icin.
  const skip = Number(page - 1) * limit; //sayfanin 1 eksigini limitle carpacak tam biribiri arkasina dogru bicimde kayitlari getirsin.
  try {

    const todoGetAll = await todo.find({}).limit(limit).skip(skip);
    return res.status(200).json({
      success: true,
      data: todoGetAll,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Todo can not be fetched!",
    });
  }
};

const todoUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const todoUpdate = await todo.findByIdAndUpdate(id, req.body);
    if (todoUpdate) {
      return res.status(200).json({
        success: true,
        message: "Todo is updated successfully",
      });
    } else
      return res.status(400).json({
        success: false,
        message: "Todo could not be updated!",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Todo could not be updated!",
    });
  }
};

const todoDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const todoDelete = await todo.findByIdAndDelete(id);
    if (todoDelete) {
      return res.status(200).json({
        success: true,
        message: "Todo has been deleted successfully!",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Todo could not be deleted!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Todo could not be deleted!" + error,
    });
  }
};

// after all CRUD, focus on details
const todoGet = async (req, res) => {
  const { id } = req.params;
  // const todoGet=await todo.findOne({_id:id})
  const todoGet = await todo.findById(id);
  console.log(todoGet);
  if (todoGet) {
    return res.status(200).json(todoGet);
  } else {
    return res.status(404).json({
      success: false,
      message: "Todo could not be found!",
    });
  }
};

module.exports = {
  todoAdd,
  todoGetAll,
  todoUpdate,
  todoDelete,
  todoGet,
};
