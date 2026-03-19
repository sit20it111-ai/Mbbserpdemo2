import React, { useState } from 'react';
import '../Student.css';

/* ── Shared dummy data ── */
const ALL_STUDENTS = [];

/* ── Reusable Filter Row ── */
function FilterCard({ title, children, onSubmit }) {
  return (
    <div className="stu-filter-card">
      <div className="stu-filter-header">{title}</div>
      <div className="stu-filter-body">
        {children}
        <div className="stu-btn-row">
          <button className="stu-btn stu-btn-primary" onClick={onSubmit}>Generate Report</button>
          <button className="stu-btn stu-btn-secondary">Export Excel</button>
          <button className="stu-btn stu-btn-secondary">Print</button>
        </div>
      </div>
    </div>
  );
}

/* ── Due Fee Report ── */
function DueFeeReport() {
  const [shown, setShown] = useState(false);
  const [filters, setFilters] = useState({ course: '', session: '2024-2025' });
  const set = (k) => (e) => setFilters((p) => ({ ...p, [k]: e.target.value }));
  const data = ALL_STUDENTS.filter((s) => s.dueFee > 0);

  return (
    <>
      <FilterCard title="Due Fee Report" onSubmit={() => setShown(true)}>
        <div className="stu-filter-row">
          <div className="stu-field"><label>Course</label>
            <select value={filters.course} onChange={set('course')}><option value="">All</option><option>MBBS</option><option>BDS</option></select>
          </div>
          <div className="stu-field"><label>Session</label>
            <select value={filters.session} onChange={set('session')}><option>2024-2025</option><option>2025-2026</option></select>
          </div>
        </div>
      </FilterCard>
      {shown && (
        <div className="stu-table-wrap">
          <div className="stu-table-title">Due Fee Report ({data.length} students)</div>
          <table className="stu-table">
            <thead><tr><th>S.No</th><th>Name</th><th>Roll No</th><th>Course</th><th>Year/Sem</th><th>Due Fee (₹)</th></tr></thead>
            <tbody>{data.map((r, i) => (
              <tr key={r.id}><td>{i+1}</td><td>{r.name}</td><td>{r.rollNo}</td><td>{r.course}</td><td>{r.yearSem}</td>
                <td style={{ color: '#dc2626', fontWeight: 600 }}>₹{r.dueFee.toLocaleString('en-IN')}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </>
  );
}

/* ── Student Details Report ── */
function StudentDetails() {
  const [shown, setShown] = useState(false);
  return (
    <>
      <FilterCard title="Student Details Report" onSubmit={() => setShown(true)}>
        <div className="stu-filter-row">
          <div className="stu-field"><label>Course</label><select><option>All</option><option>MBBS</option><option>BDS</option></select></div>
          <div className="stu-field"><label>Session</label><select><option>2024-2025</option><option>2025-2026</option></select></div>
          <div className="stu-field"><label>Year/Sem</label><select><option>All</option><option>I-Year</option><option>II-Year</option></select></div>
          <div className="stu-field"><label>Programme</label>
            <select><option>All</option><option>Domestic</option><option>Abroad</option></select>
          </div>
        </div>
      </FilterCard>
      {shown && (
        <div className="stu-table-wrap">
          <div className="stu-table-title">Student Details ({ALL_STUDENTS.length})</div>
          <div style={{ overflowX: 'auto' }}>
            <table className="stu-table">
              <thead><tr><th>S.No</th><th>Name</th><th>Roll No</th><th>Course</th><th>Year/Sem</th><th>Programme</th><th>Country</th><th>Status</th></tr></thead>
              <tbody>{ALL_STUDENTS.map((r, i) => (
                <tr key={r.id}><td>{i+1}</td><td>{r.name}</td><td>{r.rollNo}</td><td>{r.course}</td><td>{r.yearSem}</td>
                  <td><span className={`stu-badge ${r.type==='Abroad'?'stu-badge-blue':'stu-badge-green'}`}>{r.type}</span></td>
                  <td>{r.country||'—'}</td>
                  <td><span className={`stu-badge ${r.status==='Active'?'stu-badge-green':'stu-badge-red'}`}>{r.status}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Dropout Student Details ── */
function DropoutDetails() {
  const [shown, setShown] = useState(false);
  const data = ALL_STUDENTS.filter((s) => s.status === 'Dropped');
  return (
    <>
      <FilterCard title="Dropout Student Details" onSubmit={() => setShown(true)}>
        <div className="stu-filter-row">
          <div className="stu-field"><label>Course</label><select><option>All</option><option>MBBS</option></select></div>
          <div className="stu-field"><label>Session</label><select><option>2024-2025</option><option>2025-2026</option></select></div>
        </div>
      </FilterCard>
      {shown && (
        <div className="stu-table-wrap">
          <div className="stu-table-title">Dropout Students ({data.length})</div>
          <table className="stu-table">
            <thead><tr><th>S.No</th><th>Name</th><th>Roll No</th><th>Course</th><th>Year/Sem</th><th>Status</th></tr></thead>
            <tbody>{data.map((r, i) => (
              <tr key={r.id}><td>{i+1}</td><td>{r.name}</td><td>{r.rollNo}</td><td>{r.course}</td><td>{r.yearSem}</td>
                <td><span className="stu-badge stu-badge-red">{r.status}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </>
  );
}

/* ── Course Wise ── */
function CourseWise() {
  const [shown, setShown] = useState(false);
  const grouped = ALL_STUDENTS.reduce((acc, s) => { acc[s.course] = (acc[s.course]||0)+1; return acc; }, {});
  return (
    <>
      <FilterCard title="Course Wise Student Report" onSubmit={() => setShown(true)}>
        <div className="stu-filter-row">
          <div className="stu-field"><label>Session</label><select><option>2024-2025</option><option>2025-2026</option></select></div>
          <div className="stu-field"><label>Year/Sem</label><select><option>All</option><option>I-Year</option><option>II-Year</option></select></div>
        </div>
      </FilterCard>
      {shown && (
        <div className="stu-table-wrap">
          <div className="stu-table-title">Course Wise Count</div>
          <table className="stu-table">
            <thead><tr><th>S.No</th><th>Course</th><th>Total Students</th></tr></thead>
            <tbody>{Object.entries(grouped).map(([course, count], i) => (
              <tr key={course}><td>{i+1}</td><td>{course}</td><td style={{ fontWeight: 600 }}>{count}</td></tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </>
  );
}

/* ── Caste Wise ── */
function CasteWise() {
  const [shown, setShown] = useState(false);
  const grouped = ALL_STUDENTS.reduce((acc, s) => { acc[s.caste] = (acc[s.caste]||0)+1; return acc; }, {});
  return (
    <>
      <FilterCard title="Caste Wise Student Report" onSubmit={() => setShown(true)}>
        <div className="stu-filter-row">
          <div className="stu-field"><label>Session</label><select><option>2024-2025</option></select></div>
          <div className="stu-field"><label>Course</label><select><option>All</option><option>MBBS</option><option>BDS</option></select></div>
        </div>
      </FilterCard>
      {shown && (
        <div className="stu-table-wrap">
          <div className="stu-table-title">Caste Wise Count</div>
          <table className="stu-table">
            <thead><tr><th>S.No</th><th>Category / Caste</th><th>Total Students</th></tr></thead>
            <tbody>{Object.entries(grouped).map(([caste, count], i) => (
              <tr key={caste}><td>{i+1}</td><td>{caste}</td><td style={{ fontWeight: 600 }}>{count}</td></tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </>
  );
}

/* ── Dynamic Report ── */
function DynamicReport() {
  const COLUMNS = ['Name','Roll No','Course','Year/Sem','Programme','Country','Caste','Status','Due Fee'];
  const [selected, setSelected] = useState({ Name: true, 'Roll No': true, Course: true, Status: true });
  const [shown, setShown] = useState(false);

  const toggle = (c) => setSelected((p) => ({ ...p, [c]: !p[c] }));
  const activeCols = COLUMNS.filter((c) => selected[c]);

  const getVal = (s, col) => {
    if (col === 'Name') return s.name;
    if (col === 'Roll No') return s.rollNo;
    if (col === 'Course') return s.course;
    if (col === 'Year/Sem') return s.yearSem;
    if (col === 'Programme') return s.type;
    if (col === 'Country') return s.country || '—';
    if (col === 'Caste') return s.caste;
    if (col === 'Status') return s.status;
    if (col === 'Due Fee') return s.dueFee ? `₹${s.dueFee.toLocaleString('en-IN')}` : '—';
    return '—';
  };

  return (
    <>
      <div className="stu-filter-card">
        <div className="stu-filter-header">Dynamic Report — Select Columns</div>
        <div className="stu-filter-body">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 20px', marginBottom: 16 }}>
            {COLUMNS.map((c) => (
              <label key={c} className="stu-check-row">
                <input type="checkbox" checked={!!selected[c]} onChange={() => toggle(c)} />
                {c}
              </label>
            ))}
          </div>
          <div className="stu-btn-row">
            <button className="stu-btn stu-btn-primary" onClick={() => setShown(true)}>Generate</button>
            <button className="stu-btn stu-btn-secondary">Export Excel</button>
          </div>
        </div>
      </div>
      {shown && activeCols.length > 0 && (
        <div className="stu-table-wrap">
          <div className="stu-table-title">Dynamic Report</div>
          <div style={{ overflowX: 'auto' }}>
            <table className="stu-table">
              <thead><tr><th>S.No</th>{activeCols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>{ALL_STUDENTS.map((r, i) => (
                <tr key={r.id}><td>{i+1}</td>{activeCols.map((c) => <td key={c}>{getVal(r, c)}</td>)}</tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Abroad Student Report ── */
function AbroadReport() {
  const [shown, setShown] = useState(false);
  const data = ALL_STUDENTS.filter((s) => s.type === 'Abroad');
  return (
    <>
      <FilterCard title="Abroad Student Report" onSubmit={() => setShown(true)}>
        <div className="stu-filter-row">
          <div className="stu-field"><label>Country</label>
            <select><option value="">All</option><option>Russia</option><option>China</option><option>Philippines</option></select>
          </div>
          <div className="stu-field"><label>Session</label><select><option>2024-2025</option><option>2025-2026</option></select></div>
          <div className="stu-field"><label>Year/Sem</label><select><option>All</option><option>I-Year</option><option>II-Year</option><option>III-Year</option></select></div>
        </div>
      </FilterCard>
      {shown && (
        <div className="stu-table-wrap">
          <div className="stu-table-title">Abroad Students ({data.length})</div>
          <div style={{ overflowX: 'auto' }}>
            <table className="stu-table">
              <thead><tr><th>S.No</th><th>Name</th><th>Roll No</th><th>Course</th><th>Year/Sem</th><th>Country</th><th>University</th><th>Status</th></tr></thead>
              <tbody>{data.map((r, i) => (
                <tr key={r.id}><td>{i+1}</td><td>{r.name}</td><td>{r.rollNo}</td><td>{r.course}</td><td>{r.yearSem}</td>
                  <td>{r.country}</td>
                  <td>{r.universityName || '—'}</td>
                  <td><span className="stu-badge stu-badge-green">{r.status}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Visa Status Report ── */
function VisaStatusReport() {
  const [shown, setShown] = useState(false);
  const data = ALL_STUDENTS.filter((s) => s.type === 'Abroad');
  const today = new Date();

  const getVisaStatus = (expiry) => {
    if (!expiry) return { label: 'No Data', cls: 'stu-badge-gray' };
    const exp = new Date(expiry);
    const diff = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
    if (diff < 0)  return { label: 'Expired',        cls: 'stu-badge-red' };
    if (diff < 60) return { label: `Expiring (${diff}d)`, cls: 'stu-badge-orange' };
    return { label: 'Active', cls: 'stu-badge-green' };
  };

  return (
    <>
      <FilterCard title="Visa Status Report" onSubmit={() => setShown(true)}>
        <div className="stu-filter-row">
          <div className="stu-field"><label>Country</label>
            <select><option value="">All</option><option>Russia</option><option>China</option><option>Philippines</option></select>
          </div>
          <div className="stu-field"><label>Visa Status</label>
            <select><option>All</option><option>Active</option><option>Expiring Soon</option><option>Expired</option></select>
          </div>
        </div>
      </FilterCard>
      {shown && (
        <div className="stu-table-wrap">
          <div className="stu-table-title">Visa Status Report ({data.length})</div>
          <div style={{ overflowX: 'auto' }}>
            <table className="stu-table">
              <thead><tr><th>S.No</th><th>Name</th><th>Roll No</th><th>Country</th><th>Passport No</th><th>Visa Expiry</th><th>Visa Status</th></tr></thead>
              <tbody>{data.map((r, i) => {
                const vs = getVisaStatus(r.visaExpiry);
                return (
                  <tr key={r.id}><td>{i+1}</td><td>{r.name}</td><td>{r.rollNo}</td><td>{r.country}</td>
                    <td>{r.passportNo || '—'}</td>
                    <td>{r.visaExpiry || '—'}</td>
                    <td><span className={`stu-badge ${vs.cls}`}>{vs.label}</span></td>
                  </tr>
                );
              })}</tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

/* ── TABS WRAPPER ── */
const REPORT_TABS = [
  { id: 'due-fee',      label: 'Due Fee Report',        Component: DueFeeReport },
  { id: 'details',      label: 'Student Details',        Component: StudentDetails },
  { id: 'dropout',      label: 'Dropout Details',        Component: DropoutDetails },
  { id: 'course-wise',  label: 'Course Wise',            Component: CourseWise },
  { id: 'caste-wise',   label: 'Caste Wise',             Component: CasteWise },
  { id: 'dynamic',      label: 'Dynamic Report',         Component: DynamicReport },
  { id: 'abroad',       label: 'Abroad Student Report',  Component: AbroadReport },
  { id: 'visa-status',  label: 'Visa Status Report',     Component: VisaStatusReport },
];

export default function StudentReports() {
  const [active, setActive] = useState('due-fee');
  const tab = REPORT_TABS.find((t) => t.id === active);
  const PageComp = tab.Component;

  return (
    <div>
      <div className="stu-tabs">
        {REPORT_TABS.map((t) => (
          <div key={t.id} className={`stu-tab ${active === t.id ? 'active' : ''}`} onClick={() => setActive(t.id)}>
            {t.label}
          </div>
        ))}
      </div>
      <PageComp />
    </div>
  );
}
