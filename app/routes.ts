import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/about", "routes/about.tsx"),
  route("/event", "routes/event.tsx"),
  route("/regulation", "routes/regulation.tsx"),//eu estou criando essa pagina ! coloquei esse codigo
  route("*", "routes/pageNotFound.tsx"),
] satisfies RouteConfig;
