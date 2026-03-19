import React, { useState } from 'react';
import './Enquiry.css';

const SectionTitle = ({ title }) => <div className="section-title">{title}</div>;
const FormField = ({ label, children }) => (
  <div className="form-field">
    <label className="form-label">{label}</label>
    {children}
  </div>
);
const Input  = (props) => <input className="form-input" {...props} />;
const Select = ({ children, ...props }) => (
  <select className="form-input" {...props}>{children}</select>
);

export default function DoneFollowup() {
  const [filters, setFilters] = useState({
    counselor: '', course: '', fromDate: '', toDate: '',
  });

  const set = (k) => (e) => setFilters((p) => ({ ...p, [k]: e.target.value }));
  const handleSearch = (e) => { e.preventDefault(); };
  const handleReset  = () => setFilters({ counselor: '', course: '', fromDate: '', toDate: '' });

  return (
    <div className="hr-form">

      {/* ── FILTERS ── */}
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
            <FormField label="From Date">
              <Input type="date" value={filters.fromDate} onChange={set('fromDate')} />
            </FormField>
            <FormField label="To Date">
              <Input type="date" value={filters.toDate} onChange={set('toDate')} />
            </FormField>
          </div>
          <div className="enq-filter-actions">
            <button type="submit" className="btn-primary">Search</button>
            <button type="button" className="btn-secondary" onClick={handleReset}>Reset</button>
          </div>
        </form>
      </div>

      {/* ── TABLE ── */}
      <SectionTitle title="Completed Follow-up Records" />
      <div className="table-wrap">
        <table className="hr-table">
          <thead>
            <tr>
              <th>Enquiry ID</th>
              <th>Student Name</th>
              <th>Counselor</th>
              <th>Follow-up Date</th>
              <th>Next Follow-up Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className="empty-table-msg">
                No completed follow-up records found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
