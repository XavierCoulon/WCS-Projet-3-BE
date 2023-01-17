import add from "./handlers/add";
import remove from "./handlers/remove";
import getAll from "./handlers/getAll";
import isFavorite from "./handlers/isFavorite";

import { FavoriteHandlers } from "./interface";

const favoriteController: FavoriteHandlers = {
  add,
  remove,
  getAll,
  isFavorite,
};

export default favoriteController;
