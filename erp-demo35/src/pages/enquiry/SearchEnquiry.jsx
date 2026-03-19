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

export default function SearchEnquiry() {
  const [filters, setFilters] = useState({
    enquiryId: '', studentName: '', mobile: '', course: '',
    country: '', agentName: '', fromDate: '', toDate: '',
  });

  const set = (k) => (e) => setFilters((p) => ({ ...p, [k]: e.target.value }));
  const handleSearch = (e) => { e.preventDefault(); };
  const handleReset  = () => setFilters({
    enquiryId: '', studentName: '', mobile: '', course: '',
    country: '', agentName: '', fromDate: '', toDate: '',
  });

  return (
    <div className="hr-form">

      {/* ── FILTERS ── */}
      <div className="enq-filter-bar">
        <form onSubmit={handleSearch}>
          <div className="form-grid">
            <FormField label="Enquiry ID">
              <Input value={filters.enquiryId} onChange={set('enquiryId')} placeholder="Enter enquiry ID" />
            </FormField>
            <FormField label="Student Name">
              <Input value={filters.studentName} onChange={set('studentName')} placeholder="Enter student name" />
            </FormField>
            <FormField label="Mobile Number">
              <Input type="tel" value={filters.mobile} onChange={set('mobile')} placeholder="Enter mobile number" maxLength={10} />
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
            <FormField label="Country">
              <Select value={filters.country} onChange={set('country')}>
                <option value="">-- All Countries --</option>
                <option>India</option>
                <option>Russia</option>
                <option>Ukraine</option>
                <option>Kazakhstan</option>
                <option>Philippines</option>
                <option>Georgia</option>
                <option>Bangladesh</option>
                <option>Nepal</option>
                <option>China</option>
              </Select>
            </FormField>
            <FormField label="Agent Name">
              <Input value={filters.agentName} onChange={set('agentName')} placeholder="Enter agent name" />
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

      {/* ── RESULTS TABLE ── */}
      <SectionTitle title="Search Results" />
      <div className="table-wrap">
        <table className="hr-table">
          <thead>
            <tr>
              <th>Enquiry ID</th>
              <th>Student Name</th>
              <th>Mobile Number</th>
              <th>Course</th>
              <th>Country</th>
              <th>Counselor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={8} className="empty-table-msg">
                Use the filters above and click Search to view records.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
