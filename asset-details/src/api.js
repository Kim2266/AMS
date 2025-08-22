const API_BASE_URL = 'http://localhost:5000/api';

async function handleResponse(response) {
  try {
    const text = await response.text();
    let data;
    
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      console.error('Failed to parse JSON:', { text, status: response.status });
      throw new Error(`Invalid JSON response from server: ${text.substring(0, 100)}`);
    }
    
    if (!response.ok) {
      const error = new Error(data.message || `HTTP error! status: ${response.status}`);
      error.response = data;
      error.status = response.status;
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in handleResponse:', { 
      error: error.message,
      status: response.status,
      url: response.url 
    });
    throw error;
  }
}

export const fetchAssignments = async () => {
  try {
    console.log('Fetching assignments from:', `${API_BASE_URL}/assignments`);
    const response = await fetch(`${API_BASE_URL}/assignments`);
    console.log('Assignments response status:', response.status);
    const data = await handleResponse(response);
    console.log('Fetched assignments data:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchAssignments:', {
      message: error.message,
      status: error.status,
      stack: error.stack
    });
    throw error;
  }
};

export const addAssignment = async (data) => {
  console.log('Sending assignment data:', data); // Debug log
  const response = await fetch(`${API_BASE_URL}/assignments`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
};


export const fetchMaintenanceLogs = async () => {
  const response = await fetch(`${API_BASE_URL}/maintenance`);
  return handleResponse(response);
};

export const addMaintenanceLog = async (data) => {
  console.log('Sending maintenance log data:', data); // Debug log
  const response = await fetch(`${API_BASE_URL}/maintenance`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
};