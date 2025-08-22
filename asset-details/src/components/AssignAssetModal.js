import React from "react";
import "../styles/AssignAssetModal.css";

export default function AssignAssetModal({ onClose, onSubmit }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal assign-modal">
        <div className="modal-titlebar">
          <h3>Assign Asset</h3>
          <button className="x" onClick={onClose} aria-label="Close">×</button>
        </div>

        <form className="form-grid" onSubmit={onSubmit}>
          <div className="row">
            <div className="field">
              <label>Asset Name <span className="req">*</span></label>
              <input type="text" placeholder="Asset name" required />
            </div>
            <div className="field">
              <label>Category <span className="req">*</span></label>
              <input type="text" placeholder="Category" required />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label>Assigned To <span className="req">*</span></label>
              <input name="assignedTo" type="text" placeholder="Assigned to" required />
            </div>
            <div className="field">
              <label>Department <span className="req">*</span></label>
              <input name="department" type="text" placeholder="Department" required />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label>Date <span className="req">*</span></label>
              <input name="date" type="date" required />
            </div>
            <div className="field">
              <label>Location <span className="req">*</span></label>
              <input name="location" type="text" placeholder="Location" required />
            </div>
          </div>

          <div className="row full">
            <div className="field">
              <label>Description</label>
              <textarea name="description" placeholder="Input description"></textarea>
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn primary">Add</button>
            <button type="button" className="btn gray" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
