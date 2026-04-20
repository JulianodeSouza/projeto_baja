import GeminiHelp from "~/components/gemini";
import Header from "~/components/header";
import ScrollDownIndicator from "~/components/scroll-indicator";
import "./event.scss";

export default function EventPage() {
  return (
    <>
      {/* --- SEÇÃO 1: HOME (CABEÇALHO) --- */}
      <section className="event-page-section-one">
        <Header />
        <div className="event-page-section-one-text">
          <ScrollDownIndicator />
        </div>
      </section>

      {/* --- SEÇÃO 2: PLACAR GERAL --- */}
      <section className="score-section">
        <div className="intro-text">
          <h2>
            O Desafio Final:{" "}
            <span className="points-competition">1000 Pontos</span>
          </h2>
          <p>
            A competição avalia muito mais do que quem chega primeiro. É um
            somatório de projeto teórico, desempenho dinâmico e durabilidade.
          </p>
        </div>

        <div className="score-grid">
          <div className="score-card static">
            <h3>
              320 <span>pts</span>
            </h3>
            <h4>Avaliação de Projeto</h4>
            <ul>
              <li>Apresentações & Finais (180 pts)</li>
              <li>Relatórios Técnicos (120 pts)</li>
              <li>Avaliação Dinâmica (20 pts)</li>
            </ul>
          </div>

          <div className="score-card dynamic">
            <h3>
              280 <span>pts</span>
            </h3>
            <h4>Provas Dinâmicas</h4>
            <ul>
              <li>Suspensão & Manobras (120 pts)</li>
              <li>Tração & Super Prime (80 pts)</li>
              <li>Aceleração & Velocidade (60 pts)</li>
              <li>Frenagem (20 pts)</li>
            </ul>
          </div>

          <div className="score-card enduro">
            <h3>
              400 <span>pts</span>
            </h3>
            <h4>Enduro de Resistência</h4>
            <ul>
              <li>4 Horas de prova ininterrupta</li>
              <li>Teste final de robustez</li>
              <li>Vence quem completar mais voltas</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO 3: FASES DA COMPETIÇÃO --- */}
      <section className="phases-section">
        <h2>Fases da Competição</h2>

        <div className="phase-block">
          <div className="phase-icon">🔍</div>
          <div className="phase-content">
            <h3>1. Inspeção Técnica & Segurança (ICTS)</h3>
            <p>
              Antes de ligar o motor, todo veículo deve ser aprovado na Inspeção
              Estática e Dinâmica. Itens críticos como freios (travamento das 4
              rodas), motor, gaiola e equipamentos do piloto são rigorosamente
              verificados.
            </p>
          </div>
        </div>

        <div className="phase-block reverse">
          <div className="phase-icon">🏎️</div>
          <div className="phase-content">
            <h3>2. Provas Dinâmicas</h3>
            <p>
              Testes individuais para validar o projeto na prática:{" "}
              <strong>Aceleração</strong>,<strong>Velocidade Máxima</strong>,{" "}
              <strong>Tração</strong> e o desafiador circuito de 
              <strong> Suspensão e Manobrabilidade</strong> com obstáculos.
            </p>
          </div>
        </div>

        <div className="phase-block">
          <div className="phase-icon">🏁</div>
          <div className="phase-content">
            <h3>3. O Enduro de Resistência</h3>
            <p>
              O evento principal. Todos os carros na pista simultaneamente por{" "}
              <strong>4 horas</strong>. É a prova definitiva de confiabilidade.
              Vence quem completar mais voltas enquanto o carro aguentar.
            </p>
          </div>
        </div>
      </section>

      <section className="about-page-section-three">
        <GeminiHelp />
      </section>
    </>
  );
}
