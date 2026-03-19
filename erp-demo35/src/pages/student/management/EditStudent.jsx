import React from 'react';
import '../Student.css';
import StudentForm from './StudentForm.jsx';

const DUMMY = [];

export default function EditStudent() {
  const [filters, setFilters] = React.useState({ college:'All', course:'', branch:'', batch:'' });
  const [results, setResults] = React.useState([]);
  const [searched, setSearched] = React.useState(false);
  const [editing, setEditing] = React.useState(null);
  const set = (k) => (e) => setFilters(p => ({ ...p, [k]: e.target.value }));

  if (editing) return (
    <div className="stu-filter-card">
      <div className="stu-filter-header">Edit Student — {editing.name}</div>
      <div className="stu-filter-body">
        <StudentForm initialData={editing} submitLabel="Save Changes" onSubmit={() => setEditing(null)} />
        <div className="stu-btn-row">
          <button className="stu-btn stu-btn-secondary" onClick={() => setEditing(null)}>← Back</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="stu-filter-card">
        <div className="stu-filter-header">View / Edit Student</div>
        <div className="stu-filter-body">
          <div className="stu-filter-row">
            <div className="stu-field"><label>College</label><select value={filters.college} onChange={set('college')}><option>All</option><option>UNIVERSIDADE CATOLICA TIMOR</option></select></div>
            <div className="stu-field"><label>Course</label><select value={filters.course} onChange={set('course')}><option value="">Select</option><option>MBBS</option><option>BDS</option></select></div>
            <div className="stu-field"><label>Branch Name</label><select value={filters.branch} onChange={set('branch')}><option value="">Select</option><option>General</option></select></div>
            <div className="stu-field"><label>Batch</label><select value={filters.batch} onChange={set('batch')}><option value="">Select Batch</option><option>Batch A</option></select></div>
          </div>
          <div className="stu-btn-row">
            <button className="stu-btn stu-btn-primary" onClick={() => { setResults(DUMMY); setSearched(true); }}>Submit</button>
          </div>
        </div>
      </div>
      {searched && (
        <div className="stu-table-wrap">
          <div className="stu-table-title">Student List ({results.length})</div>
          <div style={{ overflowX:'auto' }}>
            <table className="stu-table">
              <thead><tr><th>#</th><th>Name</th><th>Roll No</th><th>Course</th><th>Year</th><th>Programme</th><th>Passport No</th><th>Visa Status</th><th>Action</th></tr></thead>
              <tbody>{results.map((r,i) => {
                const isAbroad = r.programmeType === 'abroad';
                const visaExpiry = r.visaExpiry ? new Date(r.visaExpiry) : null;
                const today = new Date();
                const daysLeft = visaExpiry ? Math.ceil((visaExpiry - today) / (1000*60*60*24)) : null;
                const visaLabel = !isAbroad ? '—' : !visaExpiry ? 'No Data' : daysLeft < 0 ? 'Expired' : daysLeft < 60 ? `Expiring (${daysLeft}d)` : 'Active';
                const visaCls = !isAbroad || !visaExpiry ? 'stu-badge-gray' : daysLeft < 0 ? 'stu-badge-red' : daysLeft < 60 ? 'stu-badge-orange' : 'stu-badge-green';
                return (
                  <tr key={r.id}>
                    <td>{i+1}</td><td>{r.name}</td><td>{r.rollNo}</td><td>{r.course}</td><td>{r.yearSem}</td>
                    <td><span className={`stu-badge ${isAbroad?'stu-badge-blue':'stu-badge-green'}`}>{isAbroad?'Abroad':'Domestic'}</span></td>
                    <td>{isAbroad ? (r.passportNo || '—') : '—'}</td>
                    <td><span className={`stu-badge ${visaCls}`}>{visaLabel}</span></td>
                    <td><button className="stu-btn stu-btn-primary stu-btn-sm" onClick={() => setEditing(r)}>Edit</button></td>
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
