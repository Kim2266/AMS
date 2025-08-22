import React from "react";
import "../styles/MaintenanceLogModal.css";

export default function MaintenanceLogModal({ onClose, onSubmit }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal maintenance-modal">
        <div className="modal-titlebar">
          <h3>Add Maintenance Log</h3>
          <button className="x" onClick={onClose} aria-label="Close">×</button>
        </div>

        <form className="form-grid" onSubmit={onSubmit}>
          <div className="row">
            <div className="field">
              <label>Date <span className="req">*</span></label>
              <input name="date" type="date" required />
            </div>
            <div className="field">
              <label>Performed By <span className="req">*</span></label>
              <input name="performedBy" type="text" placeholder="Enter name" required />
            </div>
          </div>

          <div className="row full">
            <div className="field">
              <label>Description</label>
              <textarea name="description" placeholder="Enter description"></textarea>
              <div className="field" style={{ marginTop: '10px' }}>
                <label>Notes</label>
                <textarea name="notes" placeholder="Additional notes (optional)"></textarea>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn primary">Save</button>
            <button type="button" className="btn gray" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
