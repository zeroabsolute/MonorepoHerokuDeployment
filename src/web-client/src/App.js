import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import logo from './logo.svg';
import './App.css';

const API_URL = process.env.API_URL || 'http://localhost:5000';

function App() {
  const [apiStatus, setApiStatus] = useState("");

  useEffect(() => {
    Axios({
      method: 'GET',
      url: `${API_URL}/health`
    }).then((response) => {
      setApiStatus({ status: response.status, payload: response.data, error: null });
    }).catch((error) => {
      setApiStatus({ status: error.response?.status, payload: null, error: error.response?.data });
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>API Status:</h3>
        {renderStatus(apiStatus)}
      </header>
    </div>
  );
}

function renderStatus(response) {
  if (!response) {
    return null;
  } else if (response.error) {
    return (
      <div>
        Code: {response.status} <br />
        Message: {response.error?.message}
      </div>
    );
  }

  return (
    <div>
      Code: {response.status} <br />
      Version: {response.payload?.version} <br />
      Message: {response.payload?.status}
    </div>
  );
}

export default App;
