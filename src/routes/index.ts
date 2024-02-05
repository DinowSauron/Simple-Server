import express, { Request, Response } from "express";
import { playlistModule } from "../modules/playlist/playlist.route";
import { middlewareInterface } from "../modules/types/systemTypes";
import { AudioModule } from "../modules/audio/audio.route";
import { musicModule } from "../modules/musics/musics.route";
const { version } = require("../../package.json");
const routes = express.Router();

routes.get("/", (req, res) => res.status(200).json({ status: "OK", version }));

const appRoutes = [
  ...playlistModule,
  ...AudioModule,
  ...musicModule
];

appRoutes.forEach((route) => {
  let middlewares: middlewareInterface[] = [];

  if (!!route.middlewares === true) {
    middlewares = [...middlewares, ...route.middlewares];
  }

  routes[route.verb](route.url, ...middlewares, route.method);
});

export default routes;
