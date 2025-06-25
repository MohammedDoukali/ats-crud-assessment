import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList/UserList';
import AddUserForm from './components/AddUserForm/AddUserForm';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import Dashboard from './dashboard';
// import UserForm from './UserForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<AddUserForm />}/>
        {/* <Route path="/edit/:id" element={<UserForm />} /> */}
      </Routes>
    </Router>
  );
}

export default App;