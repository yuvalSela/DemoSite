import React, { useState } from 'react';
import {
  Users, Calendar, CreditCard, Settings, LayoutDashboard,
  Search, Bell, HelpCircle, ArrowUpRight, ArrowDownRight,
  CheckCircle2, Loader2, Play, FileText, Check, X
} from 'lucide-react';

// Pie Chart Component
const PieChart = ({ data }) => {
  let currentAngle = 0;
  const segments = [];
  const colors = ['#f1c40f', '#f39c12', '#e74c3c', '#27ae60'];
  const total = data.reduce((sum, item) => sum + item.value, 0);

  data.forEach((item, index) => {
    const sliceAngle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = 100 + 85 * Math.cos(startRad);
    const y1 = 100 + 85 * Math.sin(startRad);
    const x2 = 100 + 85 * Math.cos(endRad);
    const y2 = 100 + 85 * Math.sin(endRad);

    const largeArc = sliceAngle > 180 ? 1 : 0;

    const pathData = [
      `M 100 100`,
      `L ${x1} ${y1}`,
      `A 85 85 0 ${largeArc} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');

    segments.push(
      <path key={index} d={pathData} fill={colors[index]} opacity="0.9" stroke="none" />
    );

    currentAngle = endAngle;
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', justifyContent: 'center' }}>
      <svg width="200" height="200" viewBox="0 0 200 200" style={{ flexShrink: 0 }}>
        {segments}
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '2px',
                backgroundColor: colors[index],
                opacity: '0.9'
              }}
            />
            <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>
              {item.label}: <strong>{item.value}</strong> ({Math.round((item.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [payrollLoading, setPayrollLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeSettingsTab, setActiveSettingsTab] = useState('general');
  const [settings, setSettings] = useState({
    emailNotifications: true,
    payrollReminders: true,
    darkMode: true,
    companyName: 'TalentSync Inc.',
    adminEmail: 'admin@talentsync.com',
    notificationEmails: true,
    weeklyReports: true,
    payrollAlerts: true,
    twoFactorEnabled: false,
    sessionTimeout: '30'
  });
  const [employees] = useState([
    { id: 1, name: "Sarah Connor", role: "Engineering Manager", department: "Engineering", status: "active", initials: "SC", email: "sarah.c@talentsync.com" },
    { id: 2, name: "John Smith", role: "Product Designer", department: "Design", status: "active", initials: "JS", email: "john.s@talentsync.com" },
    { id: 3, name: "Emily Chen", role: "Marketing Rep", department: "Marketing", status: "on_leave", initials: "EC", email: "emily.c@talentsync.com" },
    { id: 4, name: "Michael Brown", role: "Senior Engineer", department: "Engineering", status: "active", initials: "MB", email: "michael.b@talentsync.com" },
    { id: 5, name: "Lisa Wong", role: "HR Specialist", department: "Human Resources", status: "active", initials: "LW", email: "lisa.w@talentsync.com" },
    { id: 6, name: "David Kim", role: "Data Analyst", department: "Data", status: "active", initials: "DK", email: "david.k@talentsync.com" }
  ]);

  const timeOffRequests = [
    { id: 1, name: "Emily Chen", type: "Vacation", dates: "Oct 20 - Oct 25", status: "Approved" },
    { id: 2, name: "Michael Brown", type: "Sick Leave", dates: "Nov 2 - Nov 3", status: "Pending" },
    { id: 3, name: "Sarah Connor", type: "Vacation", dates: "Dec 15 - Dec 31", status: "Pending" }
  ];

  const payrollHistory = [
    { id: 'OCT-2023-A', date: 'Oct 15, 2023', employees: 142, amount: '$724,500', status: 'Completed' },
    { id: 'SEP-2023-B', date: 'Sep 30, 2023', employees: 140, amount: '$712,200', status: 'Completed' },
    { id: 'SEP-2023-A', date: 'Sep 15, 2023', employees: 138, amount: '$698,400', status: 'Completed' }
  ];

  const handleRunPayroll = async () => {
    setPayrollLoading(true);
    
    try {
      // Dummy endpoint, mimicking a pipeline trigger
      const response = await fetch('/api/run-payroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employees_count: 142, cycle_id: 'OCT-2023-B' })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setToast({ type: 'success', message: data.message });
      } else {
        throw new Error('Pipeline failed');
      }
    } catch {
      setToast({ type: 'error', message: "Failed to trigger payroll pipeline. Ensure backend is running." });
    } finally {
      setPayrollLoading(false);
      setTimeout(() => setToast(null), 5000);
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <>
            <div className="page-header">
              <h1 className="page-title">Company Overview</h1>
              <div style={{color: 'var(--text-secondary)'}}>Fiscal Q2 - 2026</div>
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
              <div className="card-header">Company Metrics Overview</div>
              <div className="card-body">
                <PieChart
                  data={[
                    { label: 'Total Employees', value: 142 },
                    { label: 'Open Positions', value: 12 },
                    { label: 'On Leave', value: 5 },
                    { label: 'Approvals Due', value: 2 }
                  ]}
                />
              </div>
            </div>

            <div className="content-grid">
              {/* Table Card */}
              <div className="card">
                <div className="card-header">
                  Recent Onboarding & Updates
                </div>
                <div className="card-body" style={{padding: 0}}>
                  <table>
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Role</th>
                        <th>Update Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.slice(0, 4).map(emp => (
                        <tr key={emp.id}>
                          <td>
                            <div className="employee-cell">
                              <div className="employee-avatar">{emp.initials}</div>
                              <span className="employee-name">{emp.name}</span>
                            </div>
                          </td>
                          <td style={{color: 'var(--text-secondary)'}}>{emp.role}</td>
                          <td style={{color: 'var(--text-secondary)'}}>Mar 25, 2026</td>
                          <td>
                            <span className={`status-badge ${emp.status === 'active' ? 'status-active' : 'status-on-leave'}`}>
                              {emp.status === 'active' ? 'Active' : 'On Leave'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Widget */}
              <div className="card">
                <div className="card-header">
                  Action Required
                </div>
                <div className="card-body">
                  <div className="payroll-widget">
                    <div className="payroll-icon">
                      <CreditCard size={24} />
                    </div>
                    <div className="payroll-due">Run October Payroll</div>
                    <div className="payroll-text">
                      All timesheets have been approved. You are ready to run payroll for the Oct 15 - Oct 31 cycle.
                    </div>
                    
                    <button 
                      className="btn-primary" 
                      style={{width: '100%'}} 
                      onClick={handleRunPayroll}
                      disabled={payrollLoading}
                    >
                      {payrollLoading ? (
                        <>
                          <Loader2 size={18} style={{animation: 'spin 1s linear infinite'}} />
                          Executing Pipeline...
                        </>
                      ) : (
                        <>
                          <Play size={18} />
                          Run Payroll
                        </>
                      )}
                    </button>
                    <div style={{marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)'}}>
                      This action will trigger your automated integrations.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 'directory':
        return (
          <>
            <div className="page-header">
              <h1 className="page-title">Employee Directory</h1>
              <button className="btn-primary">Add Employee</button>
            </div>
            <div className="card">
              <div className="card-body" style={{padding: 0}}>
                <table>
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Role</th>
                      <th>Department</th>
                      <th>Email</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map(emp => (
                      <tr key={emp.id}>
                        <td>
                          <div className="employee-cell">
                            <div className="employee-avatar">{emp.initials}</div>
                            <span className="employee-name">{emp.name}</span>
                          </div>
                        </td>
                        <td style={{color: 'var(--text-secondary)'}}>{emp.role}</td>
                        <td style={{color: 'var(--text-secondary)'}}>{emp.department}</td>
                        <td style={{color: 'var(--text-secondary)'}}>{emp.email}</td>
                        <td>
                          <span className={`status-badge ${emp.status === 'active' ? 'status-active' : 'status-on-leave'}`}>
                            {emp.status === 'active' ? 'Active' : 'On Leave'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case 'timeoff':
        return (
          <>
            <div className="page-header">
              <h1 className="page-title">Time Off Requests</h1>
              <button className="btn-primary">Request Time Off</button>
            </div>
            <div className="card">
              <div className="card-body" style={{padding: 0}}>
                <table>
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Type</th>
                      <th>Dates</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeOffRequests.map(req => (
                      <tr key={req.id}>
                        <td>
                          <div className="employee-cell">
                            <span className="employee-name">{req.name}</span>
                          </div>
                        </td>
                        <td style={{color: 'var(--text-secondary)'}}>{req.type}</td>
                        <td style={{color: 'var(--text-secondary)'}}>{req.dates}</td>
                        <td>
                          <span className={`status-badge ${req.status === 'Approved' ? 'status-active' : 'status-on-leave'}`} style={{ backgroundColor: req.status === 'Pending' ? '#fef08a' : undefined, color: req.status === 'Pending' ? '#854d0e' : undefined }}>
                            {req.status}
                          </span>
                        </td>
                        <td>
                          {req.status === 'Pending' && (
                            <div style={{display: 'flex', gap: '0.5rem'}}>
                              <button className="icon-btn" style={{color: 'var(--success)'}}><Check size={18} /></button>
                              <button className="icon-btn" style={{color: 'var(--danger)'}}><X size={18} /></button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case 'payroll':
        return (
          <>
            <div className="page-header">
              <h1 className="page-title">Payroll Management</h1>
              <button
                className="btn-primary"
                onClick={handleRunPayroll}
                disabled={payrollLoading}
              >
                {payrollLoading ? (
                  <>
                    <Loader2 size={18} style={{animation: 'spin 1s linear infinite'}} />
                    Running...
                  </>
                ) : (
                  <>
                    <Play size={18} />
                    Run Current Payroll
                  </>
                )}
              </button>
            </div>
            <div className="card">
              <div className="card-header">
                Payroll History
              </div>
              <div className="card-body" style={{padding: 0}}>
                <table>
                  <thead>
                    <tr>
                      <th>Cycle ID</th>
                      <th>Run Date</th>
                      <th>Employees</th>
                      <th>Total Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollHistory.map(run => (
                      <tr key={run.id}>
                        <td><div className="employee-name" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><FileText size={16} color="var(--text-secondary)"/>{run.id}</div></td>
                        <td style={{color: 'var(--text-secondary)'}}>{run.date}</td>
                        <td style={{color: 'var(--text-secondary)'}}>{run.employees}</td>
                        <td style={{fontWeight: 500}}>{run.amount}</td>
                        <td>
                          <span className="status-badge status-active">
                            {run.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case 'settings':
        return (
          <>
            <div className="page-header">
              <h1 className="page-title">Settings</h1>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem'}}>
              {/* Settings Navigation */}
              <div className="card" style={{height: 'fit-content'}}>
                <div className="card-body" style={{padding: 0}}>
                  <div className="settings-nav">
                    <div
                      className={`settings-nav-item ${activeSettingsTab === 'general' ? 'active' : ''}`}
                      onClick={() => setActiveSettingsTab('general')}
                    >
                      General
                    </div>
                    <div
                      className={`settings-nav-item ${activeSettingsTab === 'notifications' ? 'active' : ''}`}
                      onClick={() => setActiveSettingsTab('notifications')}
                    >
                      Notifications
                    </div>
                    <div
                      className={`settings-nav-item ${activeSettingsTab === 'security' ? 'active' : ''}`}
                      onClick={() => setActiveSettingsTab('security')}
                    >
                      Security
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings Content */}
              <div className="card">
                {activeSettingsTab === 'general' && (
                  <>
                    <div className="card-header">General Settings</div>
                    <div className="card-body">
                      <div className="settings-group">
                        <label className="settings-label">Company Name</label>
                        <input
                          type="text"
                          className="settings-input"
                          value={settings.companyName}
                          onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                        />
                        <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem'}}>The official name of your company</p>
                      </div>

                      <div className="settings-group">
                        <label className="settings-label">Admin Email</label>
                        <input
                          type="email"
                          className="settings-input"
                          value={settings.adminEmail}
                          onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                        />
                        <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem'}}>Primary contact email for administrative notifications</p>
                      </div>

                      <div className="settings-group">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <div>
                            <label className="settings-label" style={{margin: 0}}>Dark Mode</label>
                            <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0'}}>Currently enabled</p>
                          </div>
                          <input
                            type="checkbox"
                            className="settings-checkbox"
                            checked={settings.darkMode}
                            onChange={(e) => setSettings({...settings, darkMode: e.target.checked})}
                          />
                        </div>
                      </div>

                      <div style={{marginTop: '2rem', display: 'flex', gap: '1rem'}}>
                        <button className="btn-primary">Save Changes</button>
                        <button className="btn-secondary">Cancel</button>
                      </div>
                    </div>
                  </>
                )}

                {activeSettingsTab === 'notifications' && (
                  <>
                    <div className="card-header">Notification Settings</div>
                    <div className="card-body">
                      <div className="settings-group">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <div>
                            <label className="settings-label" style={{margin: 0}}>Email Notifications</label>
                            <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0'}}>Receive updates about payroll and employee changes</p>
                          </div>
                          <input
                            type="checkbox"
                            className="settings-checkbox"
                            checked={settings.emailNotifications}
                            onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                          />
                        </div>
                      </div>

                      <div className="settings-group">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <div>
                            <label className="settings-label" style={{margin: 0}}>Weekly Reports</label>
                            <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0'}}>Get weekly summary reports via email</p>
                          </div>
                          <input
                            type="checkbox"
                            className="settings-checkbox"
                            checked={settings.weeklyReports}
                            onChange={(e) => setSettings({...settings, weeklyReports: e.target.checked})}
                          />
                        </div>
                      </div>

                      <div className="settings-group">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <div>
                            <label className="settings-label" style={{margin: 0}}>Payroll Alerts</label>
                            <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0'}}>Get instant alerts for payroll events and approvals</p>
                          </div>
                          <input
                            type="checkbox"
                            className="settings-checkbox"
                            checked={settings.payrollAlerts}
                            onChange={(e) => setSettings({...settings, payrollAlerts: e.target.checked})}
                          />
                        </div>
                      </div>

                      <div style={{marginTop: '2rem', display: 'flex', gap: '1rem'}}>
                        <button className="btn-primary">Save Changes</button>
                        <button className="btn-secondary">Cancel</button>
                      </div>
                    </div>
                  </>
                )}

                {activeSettingsTab === 'security' && (
                  <>
                    <div className="card-header">Security Settings</div>
                    <div className="card-body">
                      <div className="settings-group">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <div>
                            <label className="settings-label" style={{margin: 0}}>Two-Factor Authentication</label>
                            <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0'}}>Add an extra layer of security to your account</p>
                          </div>
                          <input
                            type="checkbox"
                            className="settings-checkbox"
                            checked={settings.twoFactorEnabled}
                            onChange={(e) => setSettings({...settings, twoFactorEnabled: e.target.checked})}
                          />
                        </div>
                      </div>

                      <div className="settings-group">
                        <label className="settings-label">Session Timeout (minutes)</label>
                        <input
                          type="number"
                          className="settings-input"
                          value={settings.sessionTimeout}
                          onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
                          min="5"
                          max="480"
                        />
                        <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem'}}>Automatically log out after inactivity (5-480 minutes)</p>
                      </div>

                      <div className="settings-group">
                        <button className="btn-secondary" style={{width: '100%', justifyContent: 'center'}}>
                          Change Password
                        </button>
                      </div>

                      <div style={{marginTop: '2rem', display: 'flex', gap: '1rem'}}>
                        <button className="btn-primary">Save Changes</button>
                        <button className="btn-secondary">Cancel</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">T</div>
          <div className="sidebar-title">TalentSync</div>
        </div>
        
        <nav className="sidebar-nav">
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} />
            Dashboard
          </div>
          <div className={`nav-item ${activeTab === 'directory' ? 'active' : ''}`} onClick={() => setActiveTab('directory')}>
            <Users size={20} />
            Directory
          </div>
          <div className={`nav-item ${activeTab === 'timeoff' ? 'active' : ''}`} onClick={() => setActiveTab('timeoff')}>
            <Calendar size={20} />
            Time Off
          </div>
          <div className={`nav-item ${activeTab === 'payroll' ? 'active' : ''}`} onClick={() => setActiveTab('payroll')}>
            <CreditCard size={20} />
            Payroll
          </div>
          <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', position: 'absolute', bottom: '1rem', width: '250px' }} onClick={() => setActiveTab('settings')}>
            <Settings size={20} />
            Settings
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="search-bar">
            <Search size={18} color="#9ca3af" />
            <input type="text" placeholder="Search employees, documents..." />
          </div>
          
          <div className="topbar-actions">
            <button className="icon-btn">
              <HelpCircle size={20} />
            </button>
            <button className="icon-btn">
              <Bell size={20} />
            </button>
            <div className="avatar">
              <img src="https://i.pravatar.cc/150?img=68" alt="Profile avatar" style={{width: '100%', height: '100%', borderRadius: '50%'}} />
            </div>
          </div>
        </header>

        {/* Dashboard View */}
        <div className="dashboard-scroll">
          {renderContent()}
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div className="toast">
          <CheckCircle2 size={20} color="#34d399" />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default App;
