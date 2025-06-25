import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList/UserList';
import AddUserForm from './components/AddUserForm/AddUserForm';
import EditUserForm from './components/EditUserForm/EditUserForm';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<AddUserForm />}/>
        <Route path="/edit-user/:id" element={<EditUserForm />} />
      </Routes>
    </Router>
  );
}

export default App;