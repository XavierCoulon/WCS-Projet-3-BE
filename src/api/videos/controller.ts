import getAll from "./handlers/getAll";
import getAllFavorites from "./handlers/getAllFavorites";
import getOne from "./handlers/getOne";
import create from "./handlers/create";
import update from "./handlers/update";
import delete_ from "./handlers/delete";

const videoController = {
  getAll,
  getAllFavorites,
  getOne,
  update,
  create,
  delete: delete_,
};

export default videoController;
