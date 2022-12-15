import getAll from "./handlers/getAll";
import getOne from "./handlers/getOne";
import create from "./handlers/create";
import update from "./handlers/update";
import delete_ from "./handlers/delete";

const advertisingController = {
  getAll,
  getOne,
  create,
  update,
  delete: delete_,
};

export default advertisingController;
