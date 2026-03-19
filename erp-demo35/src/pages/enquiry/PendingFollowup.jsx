import React, { useState } from 'react';
import './Enquiry.css';

const SectionTitle = ({ title }) => <div className="section-title">{title}</div>;
const FormField = ({ label, children }) => (
  <div className="form-field">
    <label className="form-label">{label}</label>
    {children}
  </div>
);
const Select = ({ children, ...props }) => (
  <select className="form-input" {...props}>{children}</select>
);

export default function PendingFollowup() {
  const [filters, setFilters] = useState({ counselor: '', course: '' });
  const set = (k) => (e) => setFilters((p) => ({ ...p, [k]: e.target.value }));
  const handleSearch = (e) => { e.preventDefault(); };
  const handleReset  = () => setFilters({ counselor: '', course: '' });

  return (
    <div className="hr-form">

      <div className="enq-filter-bar">
        <form onSubmit={handleSearch}>
          <div className="form-grid">
            <FormField label="Counselor">
              <Select value={filters.counselor} onChange={set('counselor')}>
                <option value="">-- All Counselors --</option>
                <option>Counselor 1</option>
                <option>Counselor 2</option>
                <option>Counselor 3</option>
              </Select>
            </FormField>
            <FormField label="Course">
              <Select value={filters.course} onChange={set('course')}>
                <option value="">-- All Courses --</option>
                <option>MBBS - Domestic</option>
                <option>MBBS - Abroad</option>
                <option>MD</option>
                <option>BDS</option>
                <option>BAMS</option>
              </Select>
            </FormField>
          </div>
          <div className="enq-filter-actions">
            <button type="submit" className="btn-primary">Search</button>
            <button type="button" className="btn-secondary" onClick={handleReset}>Reset</button>
          </div>
        </form>
      </div>

      <SectionTitle title="Pending Follow-up Records" />
      <div className="table-wrap">
        <table className="hr-table">
          <thead>
            <tr>
              <th>Enquiry ID</th>
              <th>Student Name</th>
              <th>Mobile Number</th>
              <th>Counselor</th>
              <th>Last Follow-up Date</th>
              <th>Next Follow-up Date</th>
              <th>Pending Days</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={8} className="empty-table-msg">
                No pending follow-up records found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: 16, padding: '12px 16px',
        background: '#f8fafc', border: '1px solid #e5e7eb',
        borderRadius: 8, fontSize: 12, color: '#555',
      }}>
        <strong>contact:</strong>&nbsp;
        <button type="button" className="btn-sm btn-sm-purple" style={{ marginRight: 6, cursor: 'default' }}>Add Follow-up</button>
        <button type="button" className="btn-sm btn-sm-blue" style={{ marginRight: 6, cursor: 'default' }}>Call</button>
        <button type="button" className="btn-sm btn-sm-green" style={{ cursor: 'default' }}>WhatsApp</button>
        <span style={{ marginLeft: 8, color: '#9ca3af' }}>— each row when data is loaded</span>
      </div>

    </div>
  );
}
