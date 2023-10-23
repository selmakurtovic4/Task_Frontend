// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserTable from './UserTable';
import UserForm from './UserForm';



const App = () => {
  return (
     <>
        <Routes>
           <Route path="/" element={<UserTable />} />
           <Route path="/editUser/:id" element={<UserForm mode="edit" />} />
           <Route path="/viewUser/:id" element={<UserForm mode="view" />} />
           <Route path="/createUser" element={<UserForm mode="create" />} />
        </Routes>
     </>
  );
 };
 
 export default App;