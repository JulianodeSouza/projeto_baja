import "./modal.scss";

interface ModalProps {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function Modal({ id, title, content }: ModalProps) {
  return (
    <div id={id} className="modal-overlay">
      <a href="#fechar" className="modal-close-area"></a>
      <div className="modal-container">
        <div className="modal-header">
          <h2>{title}</h2>
          <a href="#fechar" className="modal-close-btn">
            &times;
          </a>
        </div>
        <div className="modal-content">{content}</div>
      </div>
    </div>
  );
}
