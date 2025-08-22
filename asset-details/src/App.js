
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import AssetOverview from './components/AssetOverview';
import AssignAssetModal from './components/AssignAssetModal';
import MaintenanceLogModal from './components/MaintenanceLogModal';
import SuccessModal from './components/SuccessModal';
import { 
  fetchAssignments, 
  addAssignment, 
  fetchMaintenanceLogs, 
  addMaintenanceLog 
} from './api';

function App() {
  // State
  const [assignments, setAssignments] = useState([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalType, setSuccessModalType] = useState('assignment');

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    console.log('Starting to load data...');
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Fetching assignments and maintenance logs...');
      const [assignmentsData, maintenanceData] = await Promise.all([
        fetchAssignments().catch(e => {
          console.error('Error fetching assignments:', e);
          return []; // Return empty array to prevent Promise.all from failing
        }),
        fetchMaintenanceLogs().catch(e => {
          console.error('Error fetching maintenance logs:', e);
          return []; // Return empty array to prevent Promise.all from failing
        })
      ]);
      
      console.log('Assignments data:', assignmentsData);
      console.log('Maintenance data:', maintenanceData);
      
      setAssignments(Array.isArray(assignmentsData) ? assignmentsData : []);
      setMaintenanceLogs(Array.isArray(maintenanceData) ? maintenanceData : []);
      
      if (!assignmentsData || !maintenanceData) {
        console.warn('Some data failed to load. Check network requests for details.');
      }
    } catch (err) {
      console.error('Unexpected error in loadData:', {
        error: err,
        message: err.message,
        stack: err.stack
      });
      setError(`Failed to load data: ${err.message}. Please try again later.`);
    } finally {
      setIsLoading(false);
      console.log('Finished loading data');
    }
  };

  
  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const assignmentData = {
      assigned_to: formData.get('assignedTo'),
      department: formData.get('department'),
      date: formData.get('date'),
      location: formData.get('location'),
      description: formData.get('description')
    };

    try {
      await addAssignment(assignmentData);
      await loadData();
      setShowAssignModal(false);
      setSuccessModalType('assignment');
      setShowSuccessModal(true);
      e.target.reset();
    } catch (err) {
      console.error('Error adding assignment:', err);
      setError(err.response?.message || 'Failed to add assignment');
    }
  };

  const handleMaintenanceSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const maintenanceData = {
      date: formData.get('date'),
      performed_by: formData.get('performedBy'),
      description: formData.get('description'),
      notes: formData.get('notes')
    };

    try {
      await addMaintenanceLog(maintenanceData);
      await loadData();
      setShowMaintenanceModal(false);
      setSuccessModalType('maintenance');
      setShowSuccessModal(true);
      e.target.reset();
    } catch (err) {
      console.error('Error adding maintenance log:', err);
      setError(err.response?.message || 'Failed to add maintenance log');
    }
  };

  
  const closeModals = () => {
    setShowAssignModal(false);
    setShowMaintenanceModal(false);
    setShowSuccessModal(false);
    setError(null);
  };

  
  return (
    <div className="app-shell">
      <Header />
      
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="page-wrap">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <AssetOverview
            assignments={assignments}
            maintenanceLogs={maintenanceLogs}
            onAddAssign={() => setShowAssignModal(true)}
            onAddMaintenance={() => setShowMaintenanceModal(true)}
          />
        )}
      </div>

      {/* Modals */}
      {showAssignModal && (
        <AssignAssetModal
          onClose={closeModals}
          onSubmit={handleAssignSubmit}
        />
      )}

      {showMaintenanceModal && (
        <MaintenanceLogModal
          onClose={closeModals}
          onSubmit={handleMaintenanceSubmit}
        />
      )}

      {showSuccessModal && (
        <SuccessModal 
          onClose={closeModals}
          type={successModalType}
        />
      )}
    </div>
  );
}

export default App;