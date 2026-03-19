import React, { useState, useRef, useEffect } from 'react';
import './App.css';

/* ── HR ── */
import HRManagement, { HR_SUBMODULES } from './pages/hr/HRManagement.jsx';

/* ── STUDENT ── */
import StudentManagement, { STUDENT_SUBMODULES } from './pages/student/StudentManagement.jsx';

/* ── SESSION ── */
import SessionManagement, { SESSION_SUBMODULES } from './pages/session/SessionManagement.jsx';

/* ── DASHBOARD ── */

import HomeDashboard       from './pages/dashboard/HomeDashboard.jsx';
import AdminDashboard      from './pages/dashboard/AdminDashboard.jsx';
import CircularDashboard   from './pages/dashboard/CircularDashboard.jsx';
import AssignmentDashboard from './pages/dashboard/AssignmentDashboard.jsx';
import AccountDashboard    from './pages/dashboard/AccountDashboard.jsx';
import BirthdayDashboard   from './pages/dashboard/BirthdayDashboard.jsx';
import RFIDDashboard       from './pages/dashboard/RFIDDashboard.jsx';
import EnquiryDashboard    from './pages/dashboard/EnquiryDashboard.jsx';

/* ── ENQUIRY ── */
import NewEnquiry         from './pages/enquiry/NewEnquiry.jsx';
import EnquiryDetailsList from './pages/enquiry/EnquiryDetailsList.jsx';
import EnquiryDetailsView from './pages/enquiry/EnquiryDetailsView.jsx';
import SearchEnquiry      from './pages/enquiry/SearchEnquiry.jsx';
import SessionWiseEnquiry from './pages/enquiry/SessionWiseEnquiry.jsx';
import SeatStatus         from './pages/enquiry/SeatStatus.jsx';
import DoneFollowup       from './pages/enquiry/DoneFollowup.jsx';
import PendingFollowup    from './pages/enquiry/PendingFollowup.jsx';

/* ── SVG ICON ── */
function SvgIcon({ path, size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0 }}>
      <path d={path} />
    </svg>
  );
}

const ICONS = {
  //dashboard: "M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 3a4 4 0 100-8 4 4 0 000 8z",
  hr:        "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm8 4v6m3-3h-6",
  session:   "M4 6h16M4 10h16M4 14h16M4 18h16",
  enquiry:   "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M12 11v4",
  students:  "M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5",
  student:   "M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5",
  faculty:   "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8L6 7h12z",
  academics: "M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z",
  accounts:  "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  library:   "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  hostel:    "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10",
  transport: "M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm13 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  reports:   "M18 20V10M12 20V4M6 20v-6",
  settings:  "M12 15a3 3 0 100-6 3 3 0 000 6zm7-3a7 7 0 01-.1 1l1.7 1.3-1.7 2.9-2-.8a7 7 0 01-1.8 1l-.3 2h-3.6l-.3-2a7 7 0 01-1.8-1l-2 .8-1.7-2.9 1.7-1.3A7 7 0 015 12a7 7 0 01.1-1L3.4 9.7l1.7-2.9 2 .8A7 7 0 018.9 6.6L9.2 4.6h3.6l.3 2a7 7 0 011.8 1l2-.8 1.7 2.9-1.7 1.3A7 7 0 0119 12z",
};

const DASH_SUBS = [
  //{ id: 'dash-home',     label: 'Dashboard' },
  { id: 'dash-admin',    label: 'Admin Dashboard' },
  { id: 'dash-circular', label: 'Circular Dashboard' },
  { id: 'dash-assign',   label: 'Assignment Dashboard' },
  { id: 'dash-account',  label: 'Account Dashboard' },
  { id: 'dash-birthday', label: 'Birthday Dashboard' },
  { id: 'dash-rfid',     label: 'RFID Attendance Dashboard' },
  { id: 'dash-enquiry',  label: 'Enquiry Dashboard' },
];

const HR_SUBS      = HR_SUBMODULES.map(({ id, label }) => ({ id, label }));
const SESSION_SUBS = SESSION_SUBMODULES.map(({ id, label }) => ({ id, label }));
const STUDENT_SUBS = STUDENT_SUBMODULES.map(({ id, label }) => ({ id, label }));

const ENQUIRY_SUBS = [
  { id: 'enq-new',     label: 'New Enquiry' },
  { id: 'enq-list',    label: 'Enquiry Details List' },
  { id: 'enq-view',    label: 'Enquiry Details (View)' },
  { id: 'enq-search',  label: 'Search Enquiry' },
  { id: 'enq-session', label: 'Session Wise Enquiry' },
  { id: 'enq-seat',    label: 'Enquiry Seat Status' },
  { id: 'enq-done',    label: 'Enquiry Done Follow-up' },
  { id: 'enq-pending', label: 'Enquiry Pending Follow-up' },
];

const MODULES = [
  { id: 'dashboard', label: 'Dashboard',         subs: DASH_SUBS    },
  { id: 'hr',        label: 'HR Management',      subs: HR_SUBS      },
  { id: 'session',   label: 'Master',             subs: SESSION_SUBS },
  { id: 'enquiry',   label: 'Enquiry Management', subs: ENQUIRY_SUBS },
  { id: 'student',   label: 'Student Module',      subs: STUDENT_SUBS },
  { id: 'faculty',   label: 'Faculty',            subs: []           },
  { id: 'academics', label: 'Academics',          subs: []           },
  { id: 'accounts',  label: 'Accounts',           subs: []           },
  { id: 'library',   label: 'Library',            subs: []           },
  { id: 'hostel',    label: 'Hostel',             subs: []           },
  { id: 'transport', label: 'Transport',          subs: []           },
  { id: 'reports',   label: 'Reports',            subs: []           },
  { id: 'settings',  label: 'Settings',           subs: []           },
];

const ALL_SUBS = [...DASH_SUBS, ...HR_SUBS, ...SESSION_SUBS, ...ENQUIRY_SUBS, ...STUDENT_SUBS];

const DASH_MAP = {
  //'dash-home':     HomeDashboard,
  'dash-admin':    AdminDashboard,
  'dash-circular': CircularDashboard,
  'dash-assign':   AssignmentDashboard,
  'dash-account':  AccountDashboard,
  'dash-birthday': BirthdayDashboard,
  'dash-rfid':     RFIDDashboard,
  'dash-enquiry':  EnquiryDashboard,
};

const ENQ_MAP = {
  'enq-new':     NewEnquiry,
  'enq-list':    EnquiryDetailsList,
  'enq-view':    EnquiryDetailsView,
  'enq-search':  SearchEnquiry,
  'enq-session': SessionWiseEnquiry,
  'enq-seat':    SeatStatus,
  'enq-done':    DoneFollowup,
  'enq-pending': PendingFollowup,
};

export default function App() {
  /* ── sidebar CLOSED by default ── */
  const [sbOpen,    setSbOpen]    = useState(false);
  const [openMods,  setOpenMods]  = useState({ dashboard: false, hr: false, session: false, enquiry: false, student: false });
  const [activeMod, setActiveMod] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [userOpen,  setUserOpen]  = useState(false);
  const [pageTitle, setPageTitle] = useState('MBBS ERP');
  const userRef = useRef(null);

  /* close user dropdown on outside click */
  useEffect(() => {
    const fn = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  /* close sidebar on Escape */
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') setSbOpen(false); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, []);

  const closeSidebar = () => setSbOpen(false);

  const clickMod = (mod) => {
    setActiveMod(mod.id);
    setActiveSub(null);
    setPageTitle(mod.label);
    if (mod.subs.length > 0) {
      /* toggle accordion, keep sidebar open */
      setOpenMods((p) => ({ ...p, [mod.id]: !p[mod.id] }));
    } else {
      /* no sub-items — load page and close sidebar */
      closeSidebar();
    }
  };

  const clickSub = (modId, sub) => {
    setActiveMod(modId);
    setActiveSub(sub.id);
    setPageTitle(sub.label);
    closeSidebar(); 
  };

  const currentMod    = MODULES.find((m) => m.id === activeMod);
  const activeSubData = ALL_SUBS.find((s) => s.id === activeSub);

  /* ── CONTENT RENDERER ── */
  const renderContent = () => {
    
    if (!activeMod) {
      return (
        <div>
          <div className="page-heading">Home Dashboard</div>
          <div style={{ marginTop: 24 }}><HomeDashboard /></div>
        </div>
      );
    }

    /* DASHBOARD */
    if (activeMod === 'dashboard') {
      const PageComp = (activeSub && DASH_MAP[activeSub]) ? DASH_MAP[activeSub] : HomeDashboard;
      return (
        <div>
          <div className="breadcrumb">
            <span className="bc-link"
              onClick={() => { setActiveSub(null); setPageTitle('Dashboard'); }}>
              Dashboard
            </span>
            {activeSub && activeSubData && <>{' › '}<b>{activeSubData.label}</b></>}
          </div>
          <div className="page-heading">
            {activeSub && activeSubData ? activeSubData.label : 'Home Dashboard'}
          </div>
          <div style={{ marginTop: 24 }}><PageComp /></div>
        </div>
      );
    }

    /* HR */
    if (activeMod === 'hr') {
      return (
        <HRManagement
          activeSub={activeSub}
          onBack={() => { setActiveSub(null); setPageTitle('HR Management'); }}
        />
      );
    }

    /* SESSION / MASTER */
    if (activeMod === 'session') {
      return (
        <SessionManagement
          activeSub={activeSub}
          onBack={() => { setActiveSub(null); setPageTitle('Master'); }}
        />
      );
    }

    /* ENQUIRY */
    if (activeMod === 'enquiry') {
      const PageComp = activeSub && ENQ_MAP[activeSub] ? ENQ_MAP[activeSub] : null;
      return (
        <div>
          <div className="breadcrumb">
            <span className="bc-link"
              onClick={() => { setActiveSub(null); setPageTitle('Enquiry Management'); }}>
              Enquiry Management
            </span>
            {activeSub && activeSubData && <>{' › '}<b>{activeSubData.label}</b></>}
          </div>
          <div className="page-heading">
            {activeSub && activeSubData ? activeSubData.label : 'Enquiry Management'}
          </div>
          {PageComp && <div style={{ marginTop: 24 }}><PageComp /></div>}
        </div>
      );
    }

    /* STUDENT MODULE */
    if (activeMod === 'student') {
      return (
        <StudentManagement
          activeSub={activeSub}
          onBack={() => { setActiveSub(null); setPageTitle('Student Module'); }}
        />
      );
    }

    /* OTHER MODULES */
    return (
      <>
        <div className="breadcrumb"><b>{currentMod?.label}</b></div>
        <div className="page-heading">{currentMod?.label}</div>
      </>
    );
  };

  return (
    <div>

      {/* ── TOP BAR ── */}
      <header className="topbar">
        <button
          className={'sb-toggle' + (sbOpen ? ' open' : '')}
          onClick={() => setSbOpen((v) => !v)}
          aria-label="Toggle sidebar"
        >
          <span /><span /><span />
        </button>
        <div className="brand">MBBS <span>ERP</span></div>
        {activeMod && <div className="page-title-pill">{pageTitle}</div>}
        <div className="search-wrap">
          <span className="search-icon">
            <SvgIcon path="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" size={13} />
          </span>
          <input type="text" placeholder="Global search..." />
        </div>
        <div className="nav-right">
          <button className="icon-btn" title="Notifications">
            <SvgIcon path="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" size={16} />
            <span className="badge" />
          </button>
          <button className="icon-btn" title="Messages">
            <SvgIcon path="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 0l8 8 8-8" size={16} />
            <span className="badge" />
          </button>
          <button className="lang-btn">EN</button>
          <div className="user-wrap" ref={userRef}>
            <div className="user-btn" onClick={() => setUserOpen((v) => !v)}>
              <div className="avatar">AD</div>
              <div>
                <div className="uname">Admin</div>
                <div className="urole">Administrator</div>
              </div>
              <span className="ucaret">
                <SvgIcon path="M6 9l6 6 6-6" size={10} />
              </span>
            </div>
            <div className={'user-dd' + (userOpen ? ' open' : '')}>
              <div className="dd-item">My Profile</div>
              <div className="dd-item">Change Password</div>
              <div className="dd-item">Preferences</div>
              <div className="dd-item">Activity Log</div>
              <div className="dd-item">Sign Out</div>
            </div>
          </div>
        </div>
      </header>

      {/* ── BACKDROP — click to close sidebar ── */}
      {sbOpen && (
        <div className="sb-backdrop" onClick={closeSidebar} />
      )}

      {/* ── LEFT SIDEBAR — floats over content ── */}
      <aside className={'sidebar' + (sbOpen ? '' : ' collapsed')}>
        <div className="sb-logo-area">
          <div className="sb-logo-box">M</div>
          <div className="sb-logo-text">
            <div className="sb-logo-title">MBBS ERP</div>
            <div className="sb-logo-sub">Admin Panel</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sb-section-label">Main Menu</div>
          {MODULES.map((mod, i) => (
            <div key={mod.id}>
              {i === 5 && <div className="sb-sep" />}
              <div
                className={'sb-mod' + (activeMod === mod.id ? ' active' : '')}
                style={{
                  transitionDelay: sbOpen
                    ? (i * 35) + 'ms,' + (i * 35) + 'ms,0ms,0ms'
                    : '0ms',
                }}
                onClick={() => clickMod(mod)}
              >
                <span className="sb-mod-icon">
                  <SvgIcon path={ICONS[mod.id] || ICONS.settings} size={15} />
                </span>
                <span style={{ flex: 1 }}>{mod.label}</span>
                {mod.subs.length > 0 && (
                  <span className={'sb-chevron' + (openMods[mod.id] ? ' open' : '')}>
                    <SvgIcon path="M9 18l6-6-6-6" size={11} />
                  </span>
                )}
              </div>
              {mod.subs.length > 0 && (
                <div className={'sb-subs' + (openMods[mod.id] ? ' open' : '')}>
                  {mod.subs.map((sub, j) => (
                    <div
                      key={sub.id}
                      className={'sb-sub' + (activeSub === sub.id ? ' active' : '')}
                      style={{
                        transitionDelay: openMods[mod.id]
                          ? (j * 28 + 50) + 'ms,' + (j * 28 + 50) + 'ms,0ms,0ms'
                          : '0ms',
                      }}
                      onClick={() => clickSub(mod.id, sub)}
                    >
                      <span className="sb-dot" />
                      {sub.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <strong>v2.0</strong>&nbsp;&middot;&nbsp;MBBS ERP
        </div>
      </aside>

      {/* ── MAIN CONTENT — always full width ── */}
      <main className="main">
        <div className="content">
          {renderContent()}
        </div>
      </main>

    </div>
  );
}
