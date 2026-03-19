import React, { useState } from 'react';
import '../Student.css';

const DUMMY = [];

export default function AssignRollNumber() {
  const [filters, setFilters] = useState({ college: 'All', course: '', branch: '', batch: '' });
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState(false);

  const set = (k) => (e) => setFilters((p) => ({ ...p, [k]: e.target.value }));
  const handleSearch = () => { setRows(DUMMY.map((d) => ({ ...d }))); setSearched(true); };
  const setRoll = (id, val) => setRows((prev) => prev.map((r) => r.id === id ? { ...r, rollNo: val } : r));
  const handleSave = () => alert('Roll numbers saved successfully!');

  return (
    <>
      <div className="stu-filter-card">
        <div className="stu-filter-header">Roll No / Enrollment No Allocation</div>
        <div className="stu-filter-body">
          <div className="stu-filter-row">
            <div className="stu-field">
              <label>College</label>
              <select value={filters.college} onChange={set('college')}>
                <option>All</option><option>UNIVERSIDADE CATOLICA TIMOR</option>
              </select>
            </div>
            <div className="stu-field">
              <label>Course</label>
              <select value={filters.course} onChange={set('course')}>
                <option value="">Select</option>
                <option>MBBS</option><option>BDS</option><option>MD</option>
              </select>
            </div>
            <div className="stu-field">
              <label>Branch Name</label>
              <select value={filters.branch} onChange={set('branch')}>
                <option value="">Select</option><option>General</option>
              </select>
            </div>
            <div className="stu-field">
              <label>Batch</label>
              <select value={filters.batch} onChange={set('batch')}>
                <option value="">Select Batch</option><option>Batch A</option>
              </select>
            </div>
          </div>
          <div className="stu-btn-row">
            <button className="stu-btn stu-btn-primary" onClick={handleSearch}>Submit</button>
          </div>
        </div>
      </div>

      {searched && (
        <div className="stu-table-wrap">
          <div className="stu-table-title">Assign Roll / Enrollment Numbers</div>
          <div style={{ overflowX: 'auto' }}>
            <table className="stu-table">
              <thead>
                <tr>
                  <th>S.No</th><th>Name</th><th>Enrollment No</th><th>Course</th>
                  <th>Roll No</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td>{r.name}</td>
                    <td>{r.enrollmentNo}</td>
                    <td>{r.course}</td>
                    <td>
                      <input
                        type="text"
                        value={r.rollNo}
                        onChange={(e) => setRoll(r.id, e.target.value)}
                        style={{ border: '1px solid #d1d5db', borderRadius: 4, padding: '4px 8px', fontSize: 13, width: 120 }}
                        placeholder="Enter Roll No"
                      />
                    </td>
                    <td>
                      <span className={`stu-badge ${r.rollNo ? 'stu-badge-green' : 'stu-badge-orange'}`}>
                        {r.rollNo ? 'Assigned' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '12px 16px' }}>
            <button className="stu-btn stu-btn-success" onClick={handleSave}>Save All</button>
          </div>
        </div>
      )}
    </>
  );
}
