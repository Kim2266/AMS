import React, { useState } from "react";
import { FaEdit } from 'react-icons/fa';
import "../styles/AssetOverview.css";

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function AssetOverview({ onAddAssign, onAddMaintenance, assignments = [], maintenanceLogs = [], onUpdateAssignment }) {
  const [editingAssignment, setEditingAssignment] = useState(null);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedAssignment = {
      ...editingAssignment,
      assigned_to: formData.get('assigned_to'),
      department: formData.get('department'),
      date: formData.get('date'),
      end_date: formData.get('end_date') || null,
      location: formData.get('location')
    };

    try {
      const response = await fetch(`http://localhost:5000/api/assignments/${editingAssignment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAssignment),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update assignment');
      }

      if (responseData.success && responseData.data) {
        if (onUpdateAssignment) {
          onUpdateAssignment(responseData.data);
        }
        setEditingAssignment(null);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
  };

  return (
    <div className="overview">
      <div className="title-block">
        <h1>Asset Overview</h1>
        <p className="subtitle">Track and manage channel transactions here</p>
      </div>

      <section className="asset-card">
        <img className="asset-photo" src="/assets.jpeg" alt="Asset" />
        <div className="asset-info">
          <div className="grid">
            <p><b>Asset ID:</b> AST001</p>
            <p><b>Name:</b> HP Laptop</p>
            <p><b>Category:</b> IT Equipment</p>
            <p><b>Location:</b> {assignments[0]?.location || 'Nairobi HQ'}</p>
            <p><b>Current User/Dept:</b> {assignments[0] ? `${assignments[0].assigned_to} / ${assignments[0].department}` : 'Not assigned'}</p>
            <p><b>Status:</b> <span className="badge inuse">{assignments[0]?.status || 'Available'}</span></p>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h3>Assignment History</h3>
          <button className="circle-add" onClick={onAddAssign} aria-label="Add assignment">+</button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th className="check-col"></th>
                <th>Assigned To</th>
                <th>Department</th>
                <th>Start Date</th>
                <th>Location</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length > 0 ? (
                assignments.map(assignment => (
                  <tr key={assignment.id}>
                    <td><input type="checkbox" /></td>
                    <td>{assignment.assigned_to}</td>
                    <td>{assignment.department}</td>
                    <td>{new Date(assignment.date).toLocaleDateString()}</td>
                    <td>{assignment.location}</td>
                    <td>{assignment.end_date ? new Date(assignment.end_date).toLocaleDateString() : 'N/A'}</td>
                    <td>
                      <button 
                        onClick={() => setEditingAssignment(assignment)}
                        className="edit-btn"
                        aria-label="Edit assignment"
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '1rem' }}>
                    No assignment history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h3>Maintenance Log</h3>
          <button className="circle-add" onClick={onAddMaintenance} aria-label="Add maintenance">+</button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th className="check-col"></th>
                <th>Date</th>
                <th>Description</th>
                <th>Performed By</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceLogs.length > 0 ? (
                maintenanceLogs.map(log => (
                  <tr key={log.id}>
                    <td><input type="checkbox" /></td>
                    <td>{new Date(log.date).toLocaleDateString()}</td>
                    <td>
                      <div><strong>{log.description}</strong></div>
                      {log.notes && <div className="notes">{log.notes}</div>}
                    </td>
                    <td>{log.performed_by}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '1rem' }}>
                    No maintenance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {editingAssignment && (
        <div className="modal-overlay" onClick={() => setEditingAssignment(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-titlebar">
              <h3>Edit Assignment</h3>
              <button className="x" onClick={() => setEditingAssignment(null)}>×</button>
            </div>
            <form onSubmit={handleEditSubmit} className="form-grid">
              <div className="row">
                <div className="field">
                  <label>Assigned To <span className="req">*</span></label>
                  <input 
                    name="assigned_to" 
                    type="text" 
                    defaultValue={editingAssignment.assigned_to} 
                    required 
                  />
                </div>
                <div className="field">
                  <label>Department <span className="req">*</span></label>
                  <input 
                    name="department" 
                    type="text" 
                    defaultValue={editingAssignment.department} 
                    required 
                  />
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label>Start Date <span className="req">*</span></label>
                  <input 
                    name="date" 
                    type="date" 
                    defaultValue={editingAssignment.date.split('T')[0]} 
                    required 
                  />
                </div>
                <div className="field">
                  <label>End Date</label>
                  <input 
                    name="end_date" 
                    type="date" 
                    defaultValue={editingAssignment.end_date ? editingAssignment.end_date.split('T')[0] : ''} 
                  />
                </div>
              </div>
              <div className="row full">
                <div className="field">
                  <label>Location</label>
                  <input 
                    name="location" 
                    type="text" 
                    defaultValue={editingAssignment.location} 
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn primary">Save Changes</button>
                <button type="button" className="btn gray" onClick={() => setEditingAssignment(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
