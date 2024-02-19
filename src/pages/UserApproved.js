import React from 'react';
import { useParams } from 'react-router-dom';

function UserApproved() {
  const { email } = useParams();

  return (
    <div>
      <h2>Approved Posts for {email}</h2>
    </div>
  );
}

export default UserApproved;
