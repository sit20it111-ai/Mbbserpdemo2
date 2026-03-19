import React, { useState } from 'react';
import '../Student.css';
import StudentForm from './StudentForm.jsx';

export default function AddStudent() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (data) => {
    console.log('AddStudent submit:', data);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="stu-filter-card">
      <div className="stu-filter-header">Add Student</div>
      <div className="stu-filter-body">
        {submitted && (
          <div style={{
            background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: 6,
            padding: '10px 16px', marginBottom: 16, color: '#15803d', fontSize: 13, fontWeight: 600
          }}>
            ✓ Student added successfully!
          </div>
        )}
        <StudentForm onSubmit={handleSubmit} submitLabel="Add Student" />
      </div>
    </div>
  );
}
