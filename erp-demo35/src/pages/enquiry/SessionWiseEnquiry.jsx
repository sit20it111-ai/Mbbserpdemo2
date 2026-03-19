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

export default function SessionWiseEnquiry() {
  const [filters, setFilters] = useState({ session: '', course: '', counselor: '' });

  const set = (k) => (e) => setFilters((p) => ({ ...p, [k]: e.target.value }));
  const handleSearch = (e) => { e.preventDefault(); };
  const handleReset  = () => setFilters({ session: '', course: '', counselor: '' });

  return (
    <div className="hr-form">

      {/* ── FILTERS ── */}
      <div className="enq-filter-bar">
        <form onSubmit={handleSearch}>
          <div className="form-grid">
            <FormField label="Session">
              <Select value={filters.session} onChange={set('session')}>
                <option value="">-- Select Session --</option>
                <option>2024-25</option>
                <option>2025-26</option>
                <option>2026-27</option>
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
                <option>BHMS</option>
              </Select>
            </FormField>
            <FormField label="Counselor">
              <Select value={filters.counselor} onChange={set('counselor')}>
                <option value="">-- All Counselors --</option>
                <option>Counselor 1</option>
                <option>Counselor 2</option>
                <option>Counselor 3</option>
              </Select>
            </FormField>
          </div>
          <div className="enq-filter-actions">
            <button type="submit" className="btn-primary">Search</button>
            <button type="button" className="btn-secondary" onClick={handleReset}>Reset</button>
          </div>
        </form>
      </div>

      {/* ── TABLE ── */}
      <SectionTitle title="Session Wise Enquiry Records" />
      <div className="table-wrap">
        <table className="hr-table">
          <thead>
            <tr>
              <th>Enquiry ID</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>Session</th>
              <th>Counselor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className="empty-table-msg">
                Select a session and click Search to view records.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
