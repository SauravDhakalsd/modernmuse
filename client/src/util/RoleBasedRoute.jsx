import React, { useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

export default function RoleBasedRoute({ children, role }) {
  const { value,makeValue } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (value.role !== role) {
      if (role ==="user"){navigate('/')} else {navigate("/admin/")}
      role==="user"?navigate("/login"):navigate("/admin/login")
    }
  }, [value.role, role, navigate]);
  // Render the children only if the role matches
  return value.role === role ? children : null;
}
