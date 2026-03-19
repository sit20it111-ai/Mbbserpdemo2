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

export default function EnquiryDetailsList() {
  const [filters, setFilters] = useState({
    session: '', course: '', programType: '', counselor: '', fromDate: '', toDate: '',
  });

  const set = (k) => (e) => setFilters((p) => ({ ...p, [k]: e.target.value }));

  const handleSearch = (e) => { e.preventDefault(); };
  const handleReset  = () => setFilters({ session: '', course: '', programType: '', counselor: '', fromDate: '', toDate: '' });

  return (
    <div className="hr-form">

      {/* ── FILTERS ── */}
      <div className="enq-filter-bar">
        <form onSubmit={handleSearch}>
          <div className="form-grid">
            <FormField label="Session">
              <Select value={filters.session} onChange={set('session')}>
                <option value="">-- All Sessions --</option>
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
            <FormField label="Program Type">
              <Select value={filters.programType} onChange={set('programType')}>
                <option value="">-- All Types --</option>
                <option>Domestic</option>
                <option>Abroad</option>
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
      <SectionTitle title="Enquiry Records" />
      <div className="table-wrap">
        <table className="hr-table">
          <thead>
            <tr>
              <th>Enquiry ID</th>
              <th>Enquiry Date</th>
              <th>Student Name</th>
              <th>Mobile Number</th>
              <th>Course Interested</th>
              <th>Program Type</th>
              <th>Assigned Counselor</th>
              <th>Follow-up Status</th>
              <th>Enquiry Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={10} className="empty-table-msg">
                No records found. Use the filters above to search.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
