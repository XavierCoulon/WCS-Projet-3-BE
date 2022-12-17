import getAll from "./handlers/getAll";
import getOne from "./handlers/getOne";
import update from "./handlers/update";
import delete_ from "./handlers/delete";

const userController = {
  getAll,
  getOne,
  update,
  delete: delete_,
};

export default userController;
