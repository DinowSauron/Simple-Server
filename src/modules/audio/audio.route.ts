import { routerInterface } from "../types/systemTypes";
import AudioController from "./audio.controller";


const AudioModule: routerInterface = [
  {
    verb: "get",
    url: "/audio/:id",
    method: AudioController.getById
  },
];

export { AudioModule };
