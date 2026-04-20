import "./header.scss";
import type React from "react";
import { useLocation, Link } from "react-router";

// --- CONFIGURAÇÃO CENTRAL DO HEADER ---
const PAGE_CONFIG: Record<string, { linkLabel: string; pageTitle: string }> = {
  "/": {linkLabel: "Inicio", pageTitle: "Projeto Baja"},
  "/about": {linkLabel: "Sobre", pageTitle: "Sobre"},
  "/event": {linkLabel: "Competição", pageTitle: "Competição"},
  "/regulation": {linkLabel: "Oficina", pageTitle: "Oficina"},
};

export default function Header(props: {
  styleContainer?: React.CSSProperties;
  styleTitle?: React.CSSProperties;
}) {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentConfig = PAGE_CONFIG[currentPath];
  const displayTitle = currentConfig ? currentConfig.pageTitle : "Projeto Baja";

  return (
    <header className="container-header" style={props.styleContainer}>
      <div className="header-title">
        <h1 className="title" style={props.styleTitle}>
          {displayTitle}
        </h1>
      </div>
      <nav className="header-menu">
        {Object.entries(PAGE_CONFIG).map(([path, config]) => {
          const isActive = currentPath === path;
          return (
            <a key={path} href={path} className={`header-link ${isActive ? "active" : ""}`} aria-current={isActive ? "page" : undefined}>
              {config.linkLabel}
            </a>
          );
        })}
      </nav>
    </header>
  );
}