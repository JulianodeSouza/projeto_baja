import "./welcome.scss";
import Header from "~/components/header";

export function Welcome() {
  return (
    <>
      <section className="welcome-section">
        <Header/>

        <div className="welcome-container">
          <div className="glass-info-box">
            
            <div className="info-item">
              <span className="info-label">📍 Localização</span>
              <span className="info-value">Curitiba, Brasil</span>
            </div>
            
            <div className="info-divider"></div>

            <div className="info-item">
              <span className="info-label">📅 Data</span>
              <span className="info-value">21 a 23 Nov, 2025</span>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}