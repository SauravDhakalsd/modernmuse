import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import Navbar from '../../components/admin/Navbar';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const {value,_} = useAuth()

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/user/pending',{
        method:"get",
        headers:{
          "Content-Type": "application/json",
          authorization:`Bearer ${value.token}`
        }
      });
      const data = await response.json();
      console.log(data)
      setUsers(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const approveUser = async (userId) => {
    try {
      await fetch(`/api/user/${userId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization:`Bearer ${value.token}`

        }
      });
      fetchUsers();  // Refresh user list after approval
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await fetch(`/api/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization:`Bearer ${value.token}`

        }
      });
      fetchUsers();  // Refresh user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="manage-users">
      <h1>Manage Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <span>{user.userName} - {user.isApproved?"approved":"pending"}</span>
            {!user.isApproved && (
              <button onClick={() => approveUser(user._id)}>Approve</button>
            )}
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default ManageUsers;
