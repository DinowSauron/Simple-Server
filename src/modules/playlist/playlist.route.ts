import { routerInterface } from "../types/systemTypes";
import PlaylistController from "./playlist.controller";


const playlistModule: routerInterface = [
  {
    verb: "get",
    url: "/playlist/getall",
    method: PlaylistController.getAll,
  },
  {
    verb: "post",
    url: "/playlist/create",
    method: PlaylistController.createPlaylist,
  },
  {
    verb: "get",
    url: "/playlist/:id",
    method: PlaylistController.getById
  },
  {
    verb: "put",
    url: "/playlist/:id",
    method: PlaylistController.updateById
  }
];

export { playlistModule };
