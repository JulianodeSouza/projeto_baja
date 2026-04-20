import Carousel from "~/components/carousel/carousel";
import GeminiHelp from "~/components/gemini";
import Header from "~/components/header";
import ScrollDownIndicator from "~/components/scroll-indicator";
import "./about.scss";

export default function AboutPage() {
  return (
    <>
      {/* --- SEÇÃO 1: HOME (CABEÇALHO) --- */}
      <section className="about-page-section-one">
        <Header />
        <div className="about-page-section-one-text">
          <ScrollDownIndicator />
        </div>
      </section>

      {/* --- SEÇÃO 2: CONTEÚDO & CARROSSEL --- */}
      <section className="about-page-section-two">
        <div className="baja-project-explanation">
          <h2>O Desafio Baja SAE BRASIL</h2>
          <p>
            Mais do que uma competição, o Programa Baja SAE é um caso real de
            desenvolvimento de produto. Desafiamos estudantes de engenharia a
            projetar, fabricar e testar um protótipo off-road robusto e
            comercialmente viável. É a simulação definitiva da realidade
            industrial, preparando a próxima geração de engenheiros líderes para
            o mercado.
          </p>
        </div>

        <div className="carousel-container">
          <Carousel
            slides={[
              <div className="card">
                <h3>Nossa História</h3>
                <p>
                  Criado na Universidade da Carolina do Sul (EUA) em 1976, o
                  programa chegou ao Brasil em 1994. A primeira competição
                  nacional ocorreu em 1995, em São Paulo. Hoje, dezenas de
                  equipes de todo o país disputam as etapas regionais (Sul,
                  Sudeste, Nordeste) e a grande etapa Nacional.
                </p>
              </div>,
              <div className="card">
                <h3>O Protótipo (Veículo)</h3>
                <p>
                  O objetivo não é apenas correr. As equipes devem projetar um
                  veículo <strong>monoposto off-road</strong> visando o mercado
                  de entusiastas. O carro deve ser robusto, confiável, de fácil
                  manutenção, ergonômico e, acima de tudo, seguro para enfrentar
                  qualquer terreno.
                </p>
              </div>,
              <div className="card">
                <h3>Quem Participa?</h3>
                <p>
                  A competição é exclusiva para estudantes de ensino superior
                  (graduação ou pós) que sejam associados à SAE BRASIL. É a
                  oportunidade perfeita para aplicar a teoria da sala de aula em
                  um projeto de engenharia complexo e real.
                </p>
              </div>,
              <div className="card">
                <h3>Fabricação Própria</h3>
                <p>
                  Regra de ouro: <strong>os alunos constroem o carro.</strong> O
                  regulamento exige que o projeto, fabricação e ajustes sejam
                  feitos 100% pelos membros da equipe. Parcerias com
                  profissionais são permitidas, desde que os alunos continuem na
                  direção do desenvolvimento.
                </p>
              </div>,
              <div className="card">
                <h3>O Professor Orientador</h3>
                <p>
                  Toda equipe deve ter um professor responsável pela conexão com
                  a universidade. Mas atenção: ele está lá para orientar com
                  teorias, sendo <strong>proibido</strong> de por a mão na massa
                  na fabricação ou manutenção do veículo durante a competição!
                </p>
              </div>,
              <div className="card">
                <h3>Competições & Provas</h3>
                <p>
                  Os eventos avaliam o projeto de forma completa: desde
                  relatórios técnicos de engenharia e apresentações de
                  viabilidade comercial até provas dinâmicas severas de
                  suspensão, tração, aceleração e o temido Enduro de Resistência
                  de 4 horas.
                </p>
              </div>,
            ]}
          />
        </div>
      </section>
      <section className="about-page-section-three">
        <GeminiHelp />
      </section>
    </>
  );
}
