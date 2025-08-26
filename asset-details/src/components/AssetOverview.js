import React from "react";
import "../styles/AssetOverview.css";

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function AssetOverview({ onAddAssign, onAddMaintenance, assignments = [], maintenanceLogs = [] }) {
  console.log('Rendering AssetOverview with:', { assignments, maintenanceLogs });
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
                <th>Status</th>
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
                    <td>
                      <span className={`badge ${assignment.status === 'Active' ? 'inuse' : ''}`}>
                        {assignment.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>
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
    </div>
  );
}