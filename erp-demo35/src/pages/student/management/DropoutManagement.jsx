import React, { useState } from 'react';
import '../Student.css';

const DUMMY = [];

const DROPOUT_REASONS = ['Personal Reasons', 'Financial Issues', 'Medical Reasons', 'Transfer to Another College', 'Failed Exams', 'Abroad Transfer', 'Other'];

export default function DropoutManagement() {
  const [filters, setFilters] = useState({ college: 'All', course: '', branch: '', batch: '' });
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState(false);
  const [modal, setModal] = useState(null); // student being dropped out
  const [dropForm, setDropForm] = useState({ reason: '', date: '', refund: false, remarks: '' });

  const set = (k) => (e) => setFilters((p) => ({ ...p, [k]: e.target.value }));
  const setD = (k) => (e) => setDropForm((p) => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const handleSearch = () => { setRows(DUMMY.map((d) => ({ ...d, status: 'Active' }))); setSearched(true); };

  const openModal = (s) => {
    setModal(s);
    setDropForm({ reason: '', date: new Date().toISOString().split('T')[0], refund: false, remarks: '' });
  };

  const confirmDropout = () => {
    if (!dropForm.reason) { alert('Please select a dropout reason.'); return; }
    setRows((prev) => prev.map((r) => r.id === modal.id ? { ...r, status: 'Dropped' } : r));
    setModal(null);
  };

  return (
    <>
      <div className="stu-filter-card">
        <div className="stu-filter-header">Dropout Student</div>
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
                <option>MBBS</option><option>BDS</option>
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
          <div className="stu-table-title">Student List</div>
          <div style={{ overflowX: 'auto' }}>
            <table className="stu-table">
              <thead>
                <tr>
                  <th>S.No</th><th>Name</th><th>Roll No</th><th>Course</th>
                  <th>Year/Sem</th><th>Programme</th><th>Status</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td>{r.name}</td>
                    <td>{r.rollNo}</td>
                    <td>{r.course}</td>
                    <td>{r.yearSem}</td>
                    <td><span className={`stu-badge ${r.type === 'Abroad' ? 'stu-badge-blue' : 'stu-badge-green'}`}>{r.type}</span></td>
                    <td><span className={`stu-badge ${r.status === 'Dropped' ? 'stu-badge-red' : 'stu-badge-green'}`}>{r.status}</span></td>
                    <td>
                      {r.status === 'Active'
                        ? <button className="stu-btn stu-btn-danger stu-btn-sm" onClick={() => openModal(r)}>Dropout</button>
                        : <span style={{ fontSize: 12, color: '#9ca3af' }}>Terminated</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Dropout Modal ── */}
      {modal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999
        }}>
          <div style={{
            background: '#fff', borderRadius: 10, padding: '24px 28px',
            width: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#1e293b' }}>
              Dropout: {modal.name}
            </div>
            <div className="stu-field" style={{ marginBottom: 12 }}>
              <label>Dropout Reason *</label>
              <select value={dropForm.reason} onChange={setD('reason')}>
                <option value="">-- Select Reason --</option>
                {DROPOUT_REASONS.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="stu-field" style={{ marginBottom: 12 }}>
              <label>Dropout Date</label>
              <input type="date" value={dropForm.date} onChange={setD('date')} />
            </div>
            <div className="stu-field" style={{ marginBottom: 12 }}>
              <label>Remarks</label>
              <textarea value={dropForm.remarks} onChange={setD('remarks')} rows={2} />
            </div>
            <label className="stu-check-row" style={{ marginBottom: 16 }}>
              <input type="checkbox" checked={dropForm.refund} onChange={setD('refund')} />
              Trigger Refund on Dropout
            </label>
            {dropForm.refund && (
              <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 6, padding: '8px 12px', fontSize: 12, color: '#c2410c', marginBottom: 14 }}>
                ⚠ Refund process will be initiated automatically after dropout confirmation.
              </div>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="stu-btn stu-btn-danger" onClick={confirmDropout}>Confirm Dropout</button>
              <button className="stu-btn stu-btn-secondary" onClick={() => setModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
