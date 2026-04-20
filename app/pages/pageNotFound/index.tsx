import "./pageNotFound.scss";

export default function PageNotFound() {
  return (
    <>
      <section className="container-page-not-found">
        <div className="content-box">
          <h1 className="error-code">404</h1>
          <h2>Eita! Você saiu da trilha.</h2>
          <p>
            Parece que a página que você tentou acessar ficou atolada em algum lugar ou não existe mais.
            Melhor voltar para o box e traçar uma nova rota.
          </p>

          <a href="/" className="back-home-btn">
            VOLTAR PARA O PIT STOP
          </a>
        </div>
      </section>
    </>
  );
}