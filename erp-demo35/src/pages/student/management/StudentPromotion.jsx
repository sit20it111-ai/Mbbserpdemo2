import React, { useState } from 'react';
import '../Student.css';

const DUMMY = [];

const YEARS = ['I-Year', 'II-Year', 'III-Year', 'IV-Year', 'V-Year', 'VI-Year'];

export default function StudentPromotion() {
  const [filters, setFilters] = useState({ course: '', branch: '', batch: '', session: '2024-2025', yearSem: 'I-Year' });
  const [promoteYear, setPromoteYear] = useState({ yearSem: 'II-Year', session: '2025-2026' });
  const [rows, setRows] = useState([]);
  const [viewed, setViewed] = useState(false);

  const set = (k) => (e) => setFilters((p) => ({ ...p, [k]: e.target.value }));
  const setP = (k) => (e) => setPromoteYear((p) => ({ ...p, [k]: e.target.value }));

  const handleView = () => { setRows(DUMMY.map((d) => ({ ...d }))); setViewed(true); };
  const toggleSelect = (id) => setRows((prev) => prev.map((r) => r.id === id ? { ...r, selected: !r.selected } : r));
  const toggleAll = (v) => setRows((prev) => prev.map((r) => ({ ...r, selected: v })));

  const handlePromote = () => {
    const sel = rows.filter((r) => r.selected);
    if (!sel.length) { alert('Please select at least one student.'); return; }
    alert(`${sel.length} student(s) promoted to ${promoteYear.yearSem} (${promoteYear.session})!`);
  };

  const allSelected = rows.length > 0 && rows.every((r) => r.selected);

  return (
    <>
      <div className="stu-filter-card">
        <div className="stu-filter-header">Promote Student</div>
        <div className="stu-filter-body">
          <div className="stu-filter-row">
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
            <div className="stu-field">
              <label>Session</label>
              <select value={filters.session} onChange={set('session')}>
                <option>2024-2025</option><option>2025-2026</option>
              </select>
            </div>
            <div className="stu-field">
              <label>Year / Sem (From)</label>
              <select value={filters.yearSem} onChange={set('yearSem')}>
                {YEARS.map((y) => <option key={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <div className="stu-section-banner" style={{ marginTop: 16 }}>Promote Year (To)</div>
          <div className="stu-filter-row">
            <div className="stu-field">
              <label>Year / Sem</label>
              <select value={promoteYear.yearSem} onChange={setP('yearSem')}>
                {YEARS.map((y) => <option key={y}>{y}</option>)}
              </select>
            </div>
            <div className="stu-field">
              <label>Session</label>
              <select value={promoteYear.session} onChange={setP('session')}>
                <option>2024-2025</option><option>2025-2026</option><option>2026-2027</option>
              </select>
            </div>
            <div className="stu-field">
              <label>Abroad: Foreign University</label>
              <input
                type="text"
                value={promoteYear.foreignUniversity || ''}
                onChange={setP('foreignUniversity')}
                placeholder="e.g. Kazan Federal University (for abroad batch)"
              />
            </div>
          </div>
          <div style={{
            background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 6,
            padding: '9px 14px', fontSize: 12, color: '#1d4ed8', marginTop: 4
          }}>
            <strong>Note:</strong> For Abroad MBBS students, specify the foreign university above.
            Abroad batch promotion is recorded at the foreign university for the next academic year.
          </div>

          <div className="stu-btn-row">
            <button className="stu-btn stu-btn-primary" onClick={handleView}>View</button>
          </div>
        </div>
      </div>

      {viewed && (
        <div className="stu-table-wrap">
          <div className="stu-table-title">Students — {filters.yearSem} ({rows.length})</div>
          <div style={{ overflowX: 'auto' }}>
            <table className="stu-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" checked={allSelected} onChange={(e) => toggleAll(e.target.checked)} />
                  </th>
                  <th>S.No</th><th>Name</th><th>Roll No</th><th>Course</th>
                  <th>Current Year</th><th>Programme</th><th>Foreign University</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id}>
                    <td><input type="checkbox" checked={r.selected} onChange={() => toggleSelect(r.id)} /></td>
                    <td>{i + 1}</td>
                    <td>{r.name}</td>
                    <td>{r.rollNo}</td>
                    <td>{r.course}</td>
                    <td>{r.currentYear}</td>
                    <td>
                      <span className={`stu-badge ${r.type === 'Abroad' ? 'stu-badge-blue' : 'stu-badge-green'}`}>{r.type}</span>
                    </td>
                    <td style={{ fontSize: 12, color: '#6b7280' }}>
                      {r.type === 'Abroad' ? (r.universityName || promoteYear.foreignUniversity || '—') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="stu-btn stu-btn-success" onClick={handlePromote}>
              Promote Selected → {promoteYear.yearSem} ({promoteYear.session})
            </button>
            {promoteYear.foreignUniversity && (
              <span style={{ fontSize: 12, color: '#1d4ed8', background: '#eff6ff', padding: '4px 10px', borderRadius: 6, border: '1px solid #bfdbfe' }}>
                Abroad batch → {promoteYear.foreignUniversity}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
