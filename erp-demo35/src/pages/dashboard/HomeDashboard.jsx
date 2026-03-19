import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/* ─── Global keyframe styles injected once ─── */
const ANIM_STYLES = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.88); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes rowSlide {
    from { opacity: 0; transform: translateX(-16px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .kpi-card {
    opacity: 0;
    animation: scaleIn 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards;
    transition: transform 0.22s ease, box-shadow 0.22s ease !important;
  }
  .kpi-card:hover {
    transform: translateY(-5px) scale(1.04) !important;
    box-shadow: 0 10px 28px rgba(0,0,0,0.14) !important;
    z-index: 2;
  }
  .section-anim {
    opacity: 0;
    animation: fadeSlideUp 0.5s ease forwards;
  }
  .chart-card {
    opacity: 0;
    animation: fadeSlideUp 0.55s ease forwards;
    transition: box-shadow 0.22s ease, transform 0.22s ease;
  }
  .chart-card:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,0.13) !important;
    transform: translateY(-3px);
  }
  .uni-card {
    opacity: 0;
    animation: scaleIn 0.45s ease forwards;
  }
  .animated-row {
    opacity: 0;
    animation: rowSlide 0.35s ease forwards;
  }
  .animated-row:hover {
    background: #f0f7ff !important;
  }
  .enquiry-wrap {
    opacity: 0;
    animation: fadeSlideUp 0.5s ease forwards;
  }
  .search-input:focus {
    border-color: #2563eb !important;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.15) !important;
    outline: none !important;
  }
  .uni-select:focus {
    border-color: #006eff !important;
    box-shadow: 0 0 0 3px rgba(0,110,255,0.15) !important;
    outline: none;
  }
`;

function useInjectStyles() {
  useEffect(() => {
    if (document.getElementById('hd-anim-styles')) return;
    const el = document.createElement('style');
    el.id = 'hd-anim-styles';
    el.textContent = ANIM_STYLES;
    document.head.appendChild(el);
  }, []);
}

/* ─── Section title ─── */
const SectionTitle = ({ title, delay = 0 }) => (
  <div className="section-anim" style={{ animationDelay: `${delay}ms` }}>
    <div className="section-title">{title}</div>
  </div>
);

const studentData = [];

const KPI_DATA = [
  { label: 'Registered Students',    color: '#2563eb' },
  { label: 'Active Students',         color: '#16a34a' },
  { label: 'New Students',            color: '#0891b2' },
  { label: 'Old Students',            color: '#7c3aed' },
  { label: 'Total Faculty',           color: '#d97706' },
  { label: 'Registered Employees',    color: '#dc2626' },
  { label: 'Today Present Students',  color: '#16a34a' },
  { label: 'Today Absent Students',   color: '#dc2626' },
  { label: 'Today Present Employee',  color: '#0891b2' },
  { label: 'Today Absent Employee',   color: '#d97706' },
  { label: 'Departments',             color: '#7c3aed' },
  { label: 'Pending Fees',            color: '#dc2626' },
  { label: 'Fee Collected',           color: '#16a34a' },
  { label: 'Active Rotations',        color: '#2563eb' },
];

const LAST7_DATA = [
  { day: 'Day 1', date: '12 Mar', amount: 0 },
  { day: 'Day 2', date: '13 Mar', amount: 0 },
  { day: 'Day 3', date: '14 Mar', amount: 0 },
  { day: 'Day 4', date: '15 Mar', amount: 0 },
  { day: 'Day 5', date: '16 Mar', amount: 0 },
  { day: 'Day 6', date: '17 Mar', amount: 0 },
  { day: 'Day 7', date: '18 Mar', amount: 0 },
];

const TODAY_COLLECTION = [
  { label: 'Cash',   amount: 0 },
  { label: 'Online', amount: 0 },
  { label: 'Cheque', amount: 0 },
  { label: 'DD',     amount: 0 },
];

/* ─── Animated KPI Card ─── */
function KpiCard({ kpi, index }) {
  return (
    <div
      className="kpi-card"
      style={{
        background: `${kpi.color}12`,
        border: `1px solid ${kpi.color}35`,
        borderRadius: 12,
        padding: '16px 18px',
        borderLeft: `4px solid ${kpi.color}`,
        cursor: 'pointer',
        animationDelay: `${index * 55}ms`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle diagonal shine */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, transparent 40%, ${kpi.color}08 60%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        fontSize: 28, fontWeight: 700, color: kpi.color,
        marginBottom: 4, fontFamily: 'Bebas Neue, sans-serif',
        letterSpacing: '0.04em',
        animation: `countUp 0.4s ease ${index * 55 + 200}ms both`,
      }}>
        —
      </div>
      <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.4 }}>
        {kpi.label}
      </div>
    </div>
  );
}

/* ─── Enquiry Search ─── */
function EnquirySearch() {
  const [filters, setFilters] = React.useState({
    course: 'All', branchName: '', batch: '',
    searchBy: 'Application Id', searchValue: '',
  });
  const set = (k) => (e) => setFilters((p) => ({ ...p, [k]: e.target.value }));

  const fieldStyle = { display: 'flex', flexDirection: 'column', gap: 4 };
  const labelStyle = { fontSize: 12, fontWeight: 600, color: '#6b7280' };
  const inputStyle = {
    padding: '7px 10px', border: '1px solid #d1d5db', borderRadius: 6,
    fontSize: 13, color: '#374151', background: '#fff', outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  return (
    <div className="enquiry-wrap" style={{
      border: '1px solid #e5e7eb', borderRadius: 10, padding: '20px 24px',
      background: '#fff', marginBottom: 24, animationDelay: '600ms',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px 32px', alignItems: 'end' }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Course</label>
          <select value={filters.course} onChange={set('course')} className="search-input" style={inputStyle}>
            <option value="All">All</option>
            <option>MBBS - Domestic</option><option>MBBS - Abroad</option>
            <option>MD</option><option>BDS</option>
          </select>
        </div>
        <div />
        <div style={fieldStyle}>
          <label style={labelStyle}>Branch Name</label>
          <select value={filters.branchName} onChange={set('branchName')} className="search-input" style={inputStyle}>
            <option value="">Select Branch</option>
            <option>Main Campus</option><option>North Branch</option><option>South Branch</option>
          </select>
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Batch</label>
          <select value={filters.batch} onChange={set('batch')} className="search-input" style={inputStyle}>
            <option value="">Select Batch</option>
            <option>2023-24</option><option>2024-25</option><option>2025-26</option>
          </select>
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>&nbsp;</label>
          <select value={filters.searchBy} onChange={set('searchBy')} className="search-input" style={inputStyle}>
            <option>Application Id</option><option>Student Name</option>
            <option>Mobile</option><option>Email</option>
          </select>
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>&nbsp;</label>
          <input
            value={filters.searchValue} onChange={set('searchValue')}
            placeholder={`Enter ${filters.searchBy}`}
            className="search-input" style={inputStyle}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── University Details ─── */
const UNIVERSITIES = [
  { name: 'UNIVERSIDADE CATOLICA TIMORENSE', iYear:{m:0,f:0}, iiYear:{m:0,f:0}, iiiYear:{m:0,f:0}, ivYear:{m:0,f:0}, vYear:{m:0,f:0} },
  { name: 'SAMPLE UNIVERSITY 2',             iYear:{m:0,f:0}, iiYear:{m:0,f:0}, iiiYear:{m:0,f:0}, ivYear:{m:0,f:0}, vYear:{m:0,f:0} },
];

const uniTableStyle = { width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 8 };
const thStyle = { background: '#e5e7eb', padding: '7px 12px', textAlign: 'center', fontWeight: 600, color: '#374151', border: '1px solid #d1d5db' };
const tdStyle = { padding: '6px 12px', textAlign: 'center', border: '1px solid #e5e7eb', color: '#374151' };
const totalTdStyle = { ...tdStyle, color: '#dc2626', fontWeight: 600 };
const uniHeaderStyle = {
  background: 'linear-gradient(90deg, #006eff 0%, #0050cc 100%)',
  color: '#fff', fontWeight: 700, padding: '12px 16px', fontSize: 14,
  borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
};

function MbbsYearTable({ headers, rows, tableIndex }) {
  return (
    <table style={uniTableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>MBBS</th>
          {headers.map((h) => <th key={h} style={thStyle}>{h}</th>)}
          <th style={{ ...thStyle, color: '#dc2626' }}>Total</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={row.label} className="animated-row"
            style={{ animationDelay: `${tableIndex * 80 + ri * 60}ms` }}>
            <td style={row.isTotal ? totalTdStyle : tdStyle}>{row.label}</td>
            {row.values.map((v, i) => <td key={i} style={row.isTotal ? totalTdStyle : tdStyle}>{v}</td>)}
            <td style={totalTdStyle}>{row.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function UniversityCard({ uni }) {
  const { name, iYear, iiYear, iiiYear, ivYear, vYear } = uni;
  const makeRows = (cols) => {
    const mVals = cols.map((c) => c.m);
    const fVals = cols.map((c) => c.f);
    const totVals = cols.map((c) => c.m + c.f);
    return [
      { label: 'Male',   values: mVals,   total: mVals.reduce((a,b)=>a+b,0) },
      { label: 'Female', values: fVals,   total: fVals.reduce((a,b)=>a+b,0) },
      { label: 'Total',  values: totVals, total: totVals.reduce((a,b)=>a+b,0), isTotal: true },
    ];
  };
  const tables = [
    { headers: ['I-Year','II-Year','III-Year','IV-Year','V-Year'], rows: makeRows([iYear,iiYear,iiiYear,ivYear,vYear]) },
    { headers: ['II-Year','III-SEM','IV-SEM'],   rows: makeRows([iiYear,{m:0,f:0},{m:0,f:0}]) },
    { headers: ['III-Year','V-SEM','VI-SEM'],    rows: makeRows([iiiYear,{m:0,f:0},{m:0,f:0}]) },
    { headers: ['VII-SEM','VIII-SEM'],           rows: makeRows([{m:0,f:0},{m:0,f:0}]) },
    { headers: ['V-Year'],                       rows: makeRows([vYear]) },
  ];
  return (
    <div className="uni-card" style={{ border: '1px solid #d1d5db', borderRadius: 10, marginBottom: 20, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <div style={uniHeaderStyle}>
        <span style={{ opacity: 0.75, fontWeight: 400 }}>University Name :</span>
        <span>{name}</span>
      </div>
      <div style={{ padding: 16, background: '#fff' }}>
        {tables.map((t, idx) => (
          <div key={idx} style={{ marginBottom: 16 }}>
            <MbbsYearTable headers={t.headers} rows={t.rows} tableIndex={idx} />
          </div>
        ))}
      </div>
    </div>
  );
}

function UniversityDetails() {
  const [selected, setSelected] = useState(UNIVERSITIES[0].name);
  const uni = UNIVERSITIES.find((u) => u.name === selected) || UNIVERSITIES[0];
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginRight: 8 }}>Select University:</label>
        <select value={selected} onChange={(e) => setSelected(e.target.value)}
          className="uni-select"
          style={{ padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13, transition: 'border-color 0.2s, box-shadow 0.2s', outline: 'none' }}>
          {UNIVERSITIES.map((u) => <option key={u.name} value={u.name}>{u.name}</option>)}
        </select>
      </div>
      <UniversityCard uni={uni} />
    </div>
  );
}

/* ─── Today's Collection animated table ─── */
function TodayCollectionTable() {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr>
          <th style={{ background: '#e5e7eb', padding: '8px 14px', textAlign: 'left', fontWeight: 600, color: '#374151', border: '1px solid #d1d5db' }}>Payment Mode</th>
          <th style={{ background: '#e5e7eb', padding: '8px 14px', textAlign: 'right', fontWeight: 600, color: '#374151', border: '1px solid #d1d5db' }}>Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        {TODAY_COLLECTION.map((row, i) => (
          <tr key={row.label} className="animated-row" style={{ animationDelay: `${300 + i * 70}ms` }}>
            <td style={{ padding: '8px 14px', border: '1px solid #e5e7eb', color: '#374151' }}>{row.label}</td>
            <td style={{ padding: '8px 14px', border: '1px solid #e5e7eb', color: '#374151', textAlign: 'right' }}>
              {row.amount.toLocaleString('en-IN')}
            </td>
          </tr>
        ))}
        <tr className="animated-row" style={{ animationDelay: `${300 + TODAY_COLLECTION.length * 70}ms` }}>
          <td style={{ padding: '8px 14px', border: '1px solid #e5e7eb', fontWeight: 700, color: '#1f2937', background: '#f9fafb' }}>Total</td>
          <td style={{ padding: '8px 14px', border: '1px solid #e5e7eb', fontWeight: 700, color: '#16a34a', textAlign: 'right', background: '#f9fafb' }}>
            {TODAY_COLLECTION.reduce((s, r) => s + r.amount, 0).toLocaleString('en-IN')}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/* ─── Main Dashboard ─── */
export default function HomeDashboard() {
  useInjectStyles();

  return (
    <div className="home-dashboard">

      {/* KPI CARDS */}
      <SectionTitle title="Dashboard Overview" delay={0} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: 14, marginBottom: 28, marginTop: 8,
      }}>
        {KPI_DATA.map((kpi, i) => <KpiCard key={kpi.label} kpi={kpi} index={i} />)}
      </div>

      {/* ANALYTICS */}
      <SectionTitle title="Analytics" delay={100} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 20, marginBottom: 28 }}>

        <div className="chart-card" style={{
          background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10,
          padding: 18, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', animationDelay: '150ms',
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1f2937' }}>Students by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studentData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} axisLine={{ stroke: '#ddd' }} />
              <YAxis tick={{ fontSize: 12, fill: '#666' }} axisLine={{ stroke: '#ddd' }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: 4 }} cursor={{ fill: 'rgba(59,130,246,0.05)' }} />
              <Bar dataKey="students" fill="#3b82f6" radius={[8, 8, 0, 0]} isAnimationActive />
            </BarChart>
          </ResponsiveContainer>
          {studentData.length === 0 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 260, marginTop: -300 }}>
              <p style={{ fontSize: 14, color: '#9ca3af' }}>No data available</p>
            </div>
          )}
        </div>

        <div className="chart-card" style={{
          background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10,
          padding: 18, boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          minHeight: 350, animationDelay: '220ms',
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1f2937' }}>Attendance Summary</h3>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontSize: 14, color: '#9ca3af' }}>No attendance data yet</p>
          </div>
        </div>
      </div>

      {/* FEE COLLECTION */}
      <SectionTitle title="Fee Collection" delay={200} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: 20, marginBottom: 28 }}>

        <div className="chart-card" style={{
          background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10,
          padding: 18, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', animationDelay: '250ms',
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1f2937' }}>Last 7 Days Collection</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={LAST7_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#666' }} axisLine={{ stroke: '#ddd' }} />
              <YAxis tick={{ fontSize: 12, fill: '#666' }} axisLine={{ stroke: '#ddd' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: 4 }}
                formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, 'Collection']}
              />
              <Bar dataKey="amount" fill="#2563eb" radius={[6, 6, 0, 0]} isAnimationActive />
            </BarChart>
          </ResponsiveContainer>
          {LAST7_DATA.every((d) => d.amount === 0) && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 260, marginTop: -300 }}>
              <p style={{ fontSize: 14, color: '#9ca3af' }}>No collection data available</p>
            </div>
          )}
        </div>

        <div className="chart-card" style={{
          background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10,
          padding: 18, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', animationDelay: '320ms',
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#1f2937' }}>Today's Collection</h3>
          <TodayCollectionTable />
          {TODAY_COLLECTION.every((r) => r.amount === 0) && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 32 }}>
              <p style={{ fontSize: 14, color: '#9ca3af' }}>No collection recorded today</p>
            </div>
          )}
        </div>
      </div>

      {/* UNIVERSITY DETAILS */}
      <SectionTitle title="University Details" delay={300} />
      <UniversityDetails />

      {/* ENQUIRY SEARCH */}
      <SectionTitle title="Enquiry Search" delay={400} />
      <EnquirySearch />

    </div>
  );
}
