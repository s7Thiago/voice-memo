import Controller from "./controller.mjs";
import Media from "./util/media.mjs";
import View from "./view.mjs";

const view = new View();
const media = new Media();

Controller.initialize({
    view,
    media,
});