import React, { useState } from 'react';
import '../Student.css';

/* ── Static option lists ── */
const COURSES   = ['MBBS', 'BDS', 'MD', 'MS', 'Diploma'];
const SESSIONS  = ['2024-2025', '2025-2026', '2026-2027'];
const YEARS_SEM = ['I-Year', 'II-Year', 'III-Year', 'IV-Year', 'V-Year', 'VI-Year'];
const COUNTRIES = ['Russia', 'China', 'Philippines', 'Kazakhstan', 'Ukraine', 'Kyrgyzstan', 'Bangladesh', 'Nepal', 'Georgia', 'Armenia'];
const VISA_TYPES = ['Student Visa', 'Medical Visa', 'Tourist Visa', 'Work Permit'];

export default function StudentForm({ initialData = {}, onSubmit, submitLabel = 'Submit', readOnly = false }) {
  const [form, setForm] = useState({
    name: '',
    rollNo: '',
    enrollmentNo: '',
    scholarNo: '',
    course: '',
    session: '2024-2025',
    yearSem: 'I-Year',
    programmeType: 'domestic',
    // Abroad fields
    universityName: '',
    country: '',
    campusCity: '',
    abroadYear: 'I-Year',
    agentId: '',
    agentName: '',
    passportNo: '',
    passportIssue: '',
    passportExpiry: '',
    issuingAuthority: '',
    visaType: 'Student Visa',
    visaNumber: '',
    visaCountry: '',
    visaIssue: '',
    visaExpiry: '',
    flightDate: '',
    airline: '',
    pnrNumber: '',
    departureDate: '',
    emergencyContactName: '',
    emergencyPhone: '',
    emergencyAddress: '',
    insurancePolicy: '',
    insuranceProvider: '',
    insuranceValidity: '',
    nmcRegNumber: '',
    nmcDate: '',
    ...initialData,
  });

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));
  const isAbroad = form.programmeType === 'abroad';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  const Field = ({ label, name, type = 'text', options, required }) => (
    <div className="stu-field">
      <label>{label}{required && <span style={{ color: '#dc2626' }}> *</span>}</label>
      {options ? (
        <select value={form[name]} onChange={set(name)} disabled={readOnly}>
          <option value="">-- Select --</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={form[name]} onChange={set(name)} readOnly={readOnly} />
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      {/* ── Basic Information ── */}
      <div className="stu-section-banner">Basic Information</div>
      <div className="stu-form-grid">
        <Field label="Student Name" name="name" required />
        <Field label="Roll No" name="rollNo" />
        <Field label="Enrollment No" name="enrollmentNo" />
        <Field label="Scholar No" name="scholarNo" />
        <div className="stu-field">
          <label>Course<span style={{ color: '#dc2626' }}> *</span></label>
          <select value={form.course} onChange={set('course')} disabled={readOnly}>
            <option value="">-- Select Course --</option>
            {COURSES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="stu-field">
          <label>Session</label>
          <select value={form.session} onChange={set('session')} disabled={readOnly}>
            {SESSIONS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="stu-field">
          <label>Year / Sem</label>
          <select value={form.yearSem} onChange={set('yearSem')} disabled={readOnly}>
            {YEARS_SEM.map((y) => <option key={y}>{y}</option>)}
          </select>
        </div>
        <div className="stu-field">
          <label>Programme Type<span style={{ color: '#dc2626' }}> *</span></label>
          <select value={form.programmeType} onChange={set('programmeType')} disabled={readOnly}>
            <option value="domestic">Domestic MBBS</option>
            <option value="abroad">Abroad MBBS</option>
          </select>
        </div>
      </div>

      {/* ── Abroad MBBS extra fields ── */}
      {isAbroad && (
        <div className="stu-abroad-block">
          <div className="stu-section-banner" style={{ marginTop: 0 }}>Abroad University Details</div>
          <div className="stu-form-grid" style={{ marginBottom: 16 }}>
            <Field label="University Name" name="universityName" required />
            <div className="stu-field">
              <label>Country<span style={{ color: '#dc2626' }}> *</span></label>
              <select value={form.country} onChange={set('country')} disabled={readOnly}>
                <option value="">-- Select Country --</option>
                {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <Field label="Campus City" name="campusCity" />
            <div className="stu-field">
              <label>Year Abroad (1–6)</label>
              <select value={form.abroadYear} onChange={set('abroadYear')} disabled={readOnly}>
                {YEARS_SEM.map((y) => <option key={y}>{y}</option>)}
              </select>
            </div>
            <Field label="Agent ID" name="agentId" />
            <Field label="Agent Name" name="agentName" />
          </div>

          {/* Passport */}
          <div className="stu-subsection">
            <div className="stu-subsection-title">Passport Details</div>
            <div className="stu-form-grid">
              <Field label="Passport Number" name="passportNo" />
              <Field label="Passport Issue Date" name="passportIssue" type="date" />
              <Field label="Passport Expiry Date" name="passportExpiry" type="date" />
              <Field label="Issuing Authority" name="issuingAuthority" />
            </div>
          </div>

          {/* Visa */}
          <div className="stu-subsection">
            <div className="stu-subsection-title">Visa Details</div>
            <div className="stu-form-grid">
              <div className="stu-field">
                <label>Visa Type</label>
                <select value={form.visaType} onChange={set('visaType')} disabled={readOnly}>
                  {VISA_TYPES.map((v) => <option key={v}>{v}</option>)}
                </select>
              </div>
              <Field label="Visa Number" name="visaNumber" />
              <div className="stu-field">
                <label>Visa Country</label>
                <select value={form.visaCountry} onChange={set('visaCountry')} disabled={readOnly}>
                  <option value="">-- Select --</option>
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <Field label="Visa Issue Date" name="visaIssue" type="date" />
              <Field label="Visa Expiry Date" name="visaExpiry" type="date" />
            </div>
          </div>

          {/* Departure */}
          <div className="stu-subsection">
            <div className="stu-subsection-title">Departure Details</div>
            <div className="stu-form-grid">
              <Field label="Flight Date" name="flightDate" type="date" />
              <Field label="Airline" name="airline" />
              <Field label="PNR Number" name="pnrNumber" />
              <Field label="Actual Departure Date" name="departureDate" type="date" />
            </div>
          </div>

          {/* Emergency */}
          <div className="stu-subsection">
            <div className="stu-subsection-title">Emergency Contact Abroad</div>
            <div className="stu-form-grid">
              <Field label="Contact Name" name="emergencyContactName" />
              <Field label="Phone" name="emergencyPhone" />
              <div className="stu-field" style={{ gridColumn: 'span 2' }}>
                <label>Address</label>
                <input type="text" value={form.emergencyAddress} onChange={set('emergencyAddress')} readOnly={readOnly} />
              </div>
            </div>
          </div>

          {/* Insurance */}
          <div className="stu-subsection">
            <div className="stu-subsection-title">Insurance Details</div>
            <div className="stu-form-grid">
              <Field label="Policy Number" name="insurancePolicy" />
              <Field label="Provider" name="insuranceProvider" />
              <Field label="Validity" name="insuranceValidity" type="date" />
            </div>
          </div>

          {/* NMC */}
          <div className="stu-subsection">
            <div className="stu-subsection-title">NMC Registration (on Return)</div>
            <div className="stu-form-grid">
              <Field label="NMC Registration Number" name="nmcRegNumber" />
              <Field label="NMC Registration Date" name="nmcDate" type="date" />
            </div>
          </div>
        </div>
      )}

      {!readOnly && (
        <div className="stu-btn-row">
          <button type="submit" className="stu-btn stu-btn-primary">{submitLabel}</button>
          <button type="reset" className="stu-btn stu-btn-secondary">Reset</button>
        </div>
      )}
    </form>
  );
}
