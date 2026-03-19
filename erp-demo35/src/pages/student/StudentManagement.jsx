import React from 'react';
import './Student.css';

import StudentDashboard   from './StudentDashboard.jsx';
import AddStudent         from './management/AddStudent.jsx';
import EditStudent        from './management/EditStudent.jsx';
import AssignRollNumber   from './management/AssignRollNumber.jsx';
import StudentPromotion   from './management/StudentPromotion.jsx';
import DropoutManagement  from './management/DropoutManagement.jsx';
import SessionWiseStudent from './management/SessionWiseStudent.jsx';
import StudentSearch      from './management/StudentSearch.jsx';
import StudentReports     from './reports/StudentReports.jsx';
import StudentAttendance  from './attendance/StudentAttendance.jsx';
import StudentLeave       from './leave/StudentLeave.jsx';

export const STUDENT_SUBMODULES = [
  { id: 'stu-dashboard',  label: 'Student Dashboard',                  component: StudentDashboard },
  { id: 'stu-add',        label: 'Add Student',                        component: AddStudent },
  { id: 'stu-edit',       label: 'View / Edit Student',                component: EditStudent },
  { id: 'stu-roll',       label: 'Roll No / Enrollment No Allocation', component: AssignRollNumber },
  { id: 'stu-promote',    label: 'Promote Student',                    component: StudentPromotion },
  { id: 'stu-dropout',    label: 'Dropout Student',                    component: DropoutManagement },
  { id: 'stu-search',     label: 'Search Student',                     component: StudentSearch },
  { id: 'stu-session',    label: 'Session Wise Student',               component: SessionWiseStudent },
  { id: 'stu-attendance', label: 'Student Attendance',                 component: StudentAttendance },
  { id: 'stu-leave',      label: 'Student Leave Apply / Details',      component: StudentLeave },
  { id: 'stu-reports',    label: 'Student Reports',                    component: StudentReports },
];

export default function StudentManagement({ activeSub, onBack }) {
  const current = STUDENT_SUBMODULES.find((s) => s.id === activeSub);

  if (current) {
    const PageComp = current.component;
    return (
      <div>
        <div className="breadcrumb">
          <span className="bc-link" onClick={onBack}>Student Module</span>
          {' › '}
          <b>{current.label}</b>
        </div>
        <div className="page-heading">{current.label}</div>
        <div style={{ marginTop: 24 }}>
          <PageComp />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="breadcrumb"><b>Student Module</b></div>
      <div className="page-heading">Student Module</div>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '320px', color: '#9ca3af',
        textAlign: 'center', gap: 8,
      }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
          stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5" />
        </svg>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#374151', marginTop: 8 }}>Student Module</div>
        <div style={{ fontSize: 13, color: '#9ca3af' }}>Select an option from the sidebar</div>
      </div>
    </div>
  );
}
