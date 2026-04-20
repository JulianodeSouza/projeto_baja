import { Welcome } from "../pages/welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projeto Baja" },
    { name: "description", content: "" },
  ];
}

export default function Home() {
  return <Welcome />;
}
