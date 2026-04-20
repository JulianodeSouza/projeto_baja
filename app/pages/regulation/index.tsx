import { useState } from "react";
import GeminiHelp from "~/components/gemini";
import Header from "~/components/header";
import Modal from "~/components/modal";
import ScrollDownIndicator from "~/components/scroll-indicator";
import "./regulation.scss";

export default function RegulationPage() {
  /*ESTADO E DADOS DO CARROSSEL INTERATIVO*/
  const [activeDiagram, setActiveDiagram] = useState(0);

  const diagrams = [
    {
      id: 0,
      title: "Raio-X: Estrutura da Gaiola",
      image: "/assets/gaiola_diagrama.png",
      hotspots: [
        {
          top: "30%",
          left: "75%",
          title: "RRH (Arco Traseiro)",
          text: "Ângulo máx. 20° vertical. Largura mín. 737mm na altura dos ombros.",
        },
        {
          top: "15%",
          left: "50%",
          title: "RHO (Arco Superior)",
          text: "Deve ser tubo contínuo. Folga mínima para o capacete: 152mm.",
        },
        {
          top: "60%",
          left: "45%",
          title: "SIM (Lateral)",
          text: "Proteção lateral obrigatória entre 203mm e 356mm acima do assento.",
        },
        {
          top: "85%",
          left: "50%",
          title: "LFS (Inferior)",
          text: "Define a base do cockpit. Requer travamento diagonal (LFDB).",
        },
      ],
    },
    {
      id: 1,
      title: "Raio-X: Motor & Powertrain",
      image: "/assets/motor_diagrama.png",
      hotspots: [
        {
          top: "40%",
          left: "50%",
          title: "Governador",
          text: "Obrigatório manter original. Mola no Furo 5 (Série 19) ou 6 (Série 20).",
        },
        {
          top: "60%",
          left: "30%",
          title: "Proteção CVT",
          text: "Obrigatória. Não pode permitir a passagem de um dedo (6mm).",
        },
        {
          top: "70%",
          left: "70%",
          title: "Escapamento",
          text: "Abafador original. Se exposto, requer proteção térmica.",
        },
      ],
    },
    {
      id: 2,
      title: "Raio-X: Cockpit & Segurança",
      image: "/assets/cockpit_diagrama.png",
      hotspots: [
        {
          top: "40%",
          left: "45%",
          title: "Cinto 5 Pontas",
          text: "Verificar validade SFI/FIA. Tiras dos ombros não podem ser cruzadas.",
        },
        {
          top: "50%",
          left: "80%",
          title: "Extintor",
          text: "Suporte metálico obrigatório com saque rápido. Manômetro no verde.",
        },
        {
          top: "75%",
          left: "30%",
          title: "Parede Corta-Fogo",
          text: "Chapa metálica separando totalmente o piloto do motor.",
        },
      ],
    },
  ];

  const nextDiagram = () => {
    if (activeDiagram < diagrams.length - 1) {
      setActiveDiagram(activeDiagram + 1);
    }
  };

  const prevDiagram = () => {
    if (activeDiagram > 0) {
      setActiveDiagram(activeDiagram - 1);
    }
  };

  const modalPowerTrainContent = () => {
    return (
      <>
        <h3>⚙️ Motor Obrigatório</h3>
        <p>
          O coração do Baja é padronizado. É{" "}
          <strong>estritamente proibido</strong> alterar componentes internos
          visando ganho de desempenho.
        </p>
        <ul>
          <li>
            <strong>Modelos Permitidos:</strong> Briggs & Stratton 10HP OHV
            Intek (Série 20 ou Série 19).
          </li>
          <li>
            <strong>Originalidade:</strong> Pistão, biela, virabrequim, comando
            e volante devem ser originais.
          </li>
        </ul>
        <hr />
        <h3>⚠️ Pontos Críticos</h3>
        <ul>
          <li>
            <strong>Governador:</strong> Obrigatório manter funcional. Mola no{" "}
            <strong>Furo 5</strong> (Série 19) ou <strong>Furo 6</strong> (Série
            20).
          </li>
          <li>
            <strong>Proteções (Guards):</strong> Todas as partes girantes (CVT,
            correntes, eixos) devem ter proteção que não permita a passagem de
            um dedo (6mm).
          </li>
        </ul>
        <hr />
        <h3>🔧 Dicas de Oficina</h3>
        <ul>
          <li>
            <strong>Escapamento:</strong> Uso do abafador original é
            obrigatório. Use proteção térmica se houver risco de queimadura.
          </li>
          <li>
            <strong>4x4:</strong> Eixos devem ter "arcos de segurança" para
            contenção em caso de quebra.
          </li>
        </ul>
      </>
    );
  };

  const modalChassisRollCageContent = () => {
    return (
      <>
        <h3>🏗️ Gaiola de Proteção </h3>
        <p>
          Aço com conteúdo mínimo de <strong>0,18% de carbono</strong> (ex: SAE
          1020).
        </p>
        <ul>
          <li>
            <strong>Membros Primários:</strong> Diâmetro mín. 25,4mm (1") e
            parede 3,05mm.
          </li>
          <li>
            <strong>Membros Secundários:</strong> Diâmetro mín. 25,4mm (1") e
            parede 0,89mm.
          </li>
          <li>
            <strong>Solda:</strong> Penetração total obrigatória.
          </li>
        </ul>
        <hr />
        <h3>📏 Geral</h3>
        <ul>
          <li>
            <strong>Largura Máxima:</strong> 1,62 m.
          </li>
          <li>
            <strong>Reboque:</strong> Obrigatório ponto dianteiro e traseiro
            (conforme dimensões do regulamento).
          </li>
        </ul>
        <hr />
        <h3>🔩 Fixadores </h3>
        <p>
          Classe mínima SAE Grau 5 ou Métrico 8.8. Obrigatório travamento com
          nylon (autotravante) ou arame. Mínimo 2 fios de rosca expostos após
          aperto.
        </p>
      </>
    );
  };

  const modalBrakesContent = () => {
    return (
      <>
        <h3>🛑 Requisito Principal </h3>
        <p>
          Sistema hidráulico capaz de <strong>travar as quatro rodas</strong>{" "}
          simultaneamente.
        </p>
        <hr />
        <h3>🔧 Regras de Construção</h3>
        <ul>
          <li>
            <strong>Duplo Circuito:</strong> Obrigatório (ex: dianteiro e
            traseiro independentes).
          </li>
          <li>
            <strong>Pedal:</strong> Acionamento rígido (sem cabos) e com{" "}
            <strong>batente de fim de curso positivo</strong>.
          </li>
          <li>
            <strong>Luz de Freio:</strong> Acionada por interruptor de pressão
            hidráulica.
          </li>
        </ul>
      </>
    );
  };

  const modalSuspensionDirection = () => {
    return (
      <>
        <h3>🏎️ Sistema de Direção </h3>
        <ul>
          <li>
            <strong>100% Mecânica:</strong> Proibido sistemas elétricos ou
            hidráulicos.
          </li>
          <li>
            <strong>Volante:</strong> Deve ser circular ou oval. Formatos
            abertos são proibidos.
          </li>
          <li>
            <strong>Batentes:</strong> Obrigatório uso de batentes físicos para
            limitar o curso da direção.
          </li>
        </ul>
        <hr />
        <h3>🚜 Rodas & Pneus</h3>
        <p>
          Devem ser adequados para condições off-road severas. O veículo deve
          ser capaz de transpor obstáculos como troncos de 0,4m, lama e pedras
          sem quebras. Porcas de roda devem ser sempre verificadas.
        </p>
      </>
    );
  };

  const modalPilotSecurityContent = () => {
    return (
      <>
        <h3>👤 Equipamentos </h3>
        <p>
          Uso obrigatório: Capacete (Snell/DOT), protetor cervical 360º, roupa
          resistente a fogo, luvas, óculos e calçados fechados.
        </p>
        <hr />
        <h3>🛡️ Cockpit </h3>
        <ul>
          <li>
            <strong>Cinto 5 Pontas:</strong> Certificação SFI/FIA válida.
          </li>
          <li>
            <strong>Restritores de Braço:</strong> Obrigatórios.
          </li>
          <li>
            <strong>Extintor:</strong> Fixado no cockpit com suporte metálico de
            saque rápido.
          </li>
          <li>
            <strong>Saída de Emergência:</strong> Máximo 5 segundos para o
            piloto sair.
          </li>
        </ul>
      </>
    );
  };

  const modalElectricFuel = () => {
    return (
      <>
        <h3>⛽ Combustível </h3>
        <ul>
          <li>
            <strong>Tanques:</strong> Apenas Briggs original, Pyrotect ou Metal
            Horse permitidos.
          </li>
          <li>
            <strong>Proteção (Splash Shield):</strong> Obrigatória para evitar
            derramamento no motor/piloto.
          </li>
        </ul>
        <hr />
        <h3>⚡ Elétrica </h3>
        <ul>
          <li>
            <strong>Chaves Gerais (Kill Switches):</strong> Duas obrigatórias
            (painel e externa lateral direita).
          </li>
          <li>
            <strong>Bateria:</strong> Tipo selada, fixada firmemente e com polo
            positivo protegido.
          </li>
        </ul>
      </>
    );
  };

  return (
    <>
      {/* SEÇÃO 1: HOME (CABEÇALHO) */}
      <section className="regulation-page-section-one">
        <Header />
        <div className="regulation-page-section-one-text">
          <ScrollDownIndicator />
        </div>
      </section>

      {/* SEÇÃO 2: CARROSSEL INTERATIVO */}
      <section className="interactive-diagram-section">
        <h2>{diagrams[activeDiagram].title}</h2>

        <div className="carousel-container">
          {activeDiagram > 0 && (
            <button className="carousel-btn prev-btn" onClick={prevDiagram}>
              &#10094;
            </button>
          )}

          <div className="diagram-slides-wrapper">
            {diagrams.map((diagram, index) => {
              let positionClass = "hidden";
              if (index === activeDiagram) positionClass = "active";
              else if (index === activeDiagram - 1) positionClass = "prev";
              else if (index === activeDiagram + 1) positionClass = "next";
              else if (index < activeDiagram) positionClass = "hidden-left";
              else if (index > activeDiagram) positionClass = "hidden-right";
              return (
                <div
                  key={diagram.id}
                  className={`diagram-slide ${positionClass}`}>
                  <img
                    src={diagram.image}
                    alt={diagram.title}
                    className="diagram-image"
                  />
                  {positionClass === "active" &&
                    diagram.hotspots.map((spot, idx) => (
                      <div
                        key={idx}
                        className="hotspot"
                        style={{ top: spot.top, left: spot.left }}>
                        <div className="hotspot-dot"></div>
                        <div className="tooltip">
                          <h4>{spot.title}</h4>
                          <p>{spot.text}</p>
                        </div>
                      </div>
                    ))}
                </div>
              );
            })}
          </div>

          {activeDiagram < diagrams.length - 1 && (
            <button className="carousel-btn next-btn" onClick={nextDiagram}>
              &#10095;
            </button>
          )}
        </div>

        <div className="carousel-indicators">
          {diagrams.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === activeDiagram ? "active" : ""}`}
              onClick={() => setActiveDiagram(index)}></span>
          ))}
        </div>
      </section>

      {/* SEÇÃO 3: GRID DE CARDS */}
      <section className="image-grid-section">
        <h2>Manual Técnico</h2>
        <div className="image-grid-container">
          <a href="#modal-powertrain" className="image-card powertrain-card" />
          <a
            href="#modal-chassis-rollCage"
            className="image-card chassi-card"
          />
          <a href="#modal-suspension" className="image-card suspension-card" />
          <a href="#modal-brakes" className="image-card freios-card" />
          <a href="#modal-electric-fuel" className="image-card eletrica-card" />
          <a
            href="#modal-pilot-security"
            className="image-card seguranca-card"
          />
        </div>
      </section>

      {/* SEÇÃO 4: CHECKLISTS RÁPIDOS */}
      <section className="checklist-section">
        <h2>Checklists de Oficina</h2>
        <div className="checklist-container">
          <details className="checklist-item">
            <summary>📋 Antes de Ligar o Motor (Start-Up)</summary>
            <ul>
              <li>
                🛢️ <strong>Nível de Óleo:</strong> Verificado e ok?
              </li>
              <li>
                ⛽ <strong>Combustível:</strong> Nível abaixo do pescoço do
                tanque?
              </li>
              <li>
                🛑 <strong>Freio:</strong> Pedal firme? Luz de freio acende?
              </li>
              <li>
                ⚡ <strong>Kill Switches:</strong> Testar as duas chaves. Motor
                deve morrer na hora.
              </li>
              <li>
                🔩 <strong>CVT:</strong> Proteção está bem parafusada?
              </li>
            </ul>
          </details>
          <details className="checklist-item">
            <summary>🏎️ Vai para a Pista? (Pré-Rolê)</summary>
            <ul>
              <li>
                🪖 <strong>Capacete & Óculos:</strong> Jugular apertada? Viseira
                limpa?
              </li>
              <li>
                🔒 <strong>Cinto 5 Pontas:</strong> Bem apertado? (Piloto não
                pode se mexer).
              </li>
              <li>
                🦾 <strong>Restritores de Braço:</strong> Ajustados
                corretamente?
              </li>
              <li>
                🔥 <strong>Extintor:</strong> Travado e com pressão ok?
              </li>
              <li>
                👕 <strong>Roupa:</strong> Macacão fechado, luvas e tênis
                amarrado?
              </li>
            </ul>
          </details>
          <details className="checklist-item">
            <summary>🔧 Inspeção Rápida (Itens Críticos)</summary>
            <ul>
              <li>
                🔩 <strong>Rodas:</strong> Porcas apertadas com torque correto?
              </li>
              <li>
                🛑 <strong>Direção:</strong> Batentes impedem travamento da
                caixa?
              </li>
              <li>
                💦 <strong>Vazamentos:</strong> Alguma mancha de fluido no chão?
              </li>
              <li>
                🔌 <strong>Bateria:</strong> Fixação firme (não mexe com a mão)?
              </li>
              <li>
                🏷️ <strong>Números:</strong> Placas limpas e legíveis?
              </li>
            </ul>
          </details>
        </div>
      </section>

      <section className="about-page-section-three">
        <GeminiHelp />
      </section>

      {/* --- MODAIS (POP-UPS TÉCNICOS) --- */}
      {/* MODAL 1: POWERTRAIN */}
      <Modal
        {...{
          id: "modal-powertrain",
          title: "Powertrain (Motor & Transmissão)",
          content: modalPowerTrainContent(),
        }}
      />

      {/* MODAL 2: CHASSI */}
      <Modal
        {...{
          id: "modal-chassis-rollCage",
          title: "Chassi & Gaiola de Proteção",
          content: modalChassisRollCageContent(),
        }}
      />

      {/* MODAL 3: SUSPENSÃO */}
      <Modal
        {...{
          id: "modal-suspension",
          title: "Suspensão & Direção",
          content: modalSuspensionDirection(),
        }}
      />

      {/* MODAL 4: FREIOS */}
      <Modal
        {...{
          id: "modal-brakes",
          title: "Sistema de Freio",
          content: modalBrakesContent(),
        }}
      />

      {/* MODAL 5: ELÉTRICA */}
      <Modal
        {...{
          id: "modal-electric-fuel",
          title: "Elétrica & Combustível",
          content: modalElectricFuel(),
        }}
      />

      {/* MODAL 6: SEGURANÇA */}
      <Modal
        {...{
          id: "modal-pilot-security",
          title: "Piloto & Segurança",
          content: modalPilotSecurityContent(),
        }}
      />
    </>
  );
}
