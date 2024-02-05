import { routerInterface } from "../types/systemTypes";
import MusicsController from "./musics.controller";


const musicModule: routerInterface = [
  {
    verb: "get",
    url: "/music/getall",
    method: MusicsController.getAll,
  },
  {
    verb: "get",
    url: "/music/playlist/:playlistId",
    method: MusicsController.getMusicsByPlaylistId,
  },
  {
    verb: "post",
    url: "/music/create",
    method: MusicsController.createMusic,
  },
  {
    verb: "get",
    url: "/music/:id",
    method: MusicsController.getById
  },
  {
    verb: "put",
    url: "/music/:id",
    method: MusicsController.updateById
  }
];

export { musicModule };
