import React from "react";
import "../styles/SuccessModal.css";

export default function SuccessModal({ onClose, type = 'assignment' }) {
  const messages = {
    assignment: {
      title: "Asset Assigned Successfully",
      message: "The asset has been successfully assigned.",
      button: "Back to Home"
    },
    maintenance: {
      title: "Maintenance Log Added Successfully",
      message: "The maintenance log has been successfully added.",
      button: "Close"
    }
  };

  const { title, message, button } = messages[type] || messages.assignment;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="success-modal">
        <div className="big-check">✅</div>
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="btn success" onClick={onClose}>
          {button}
        </button>
      </div>
    </div>
  );
}
