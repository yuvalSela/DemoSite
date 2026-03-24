import React, { useState } from 'react';
import { 
  Users, Calendar, CreditCard, Settings, LayoutDashboard, 
  Search, Bell, HelpCircle, ArrowUpRight, ArrowDownRight,
  CheckCircle2, Loader2, Play, FileText, Check, X
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [payrollLoading, setPayrollLoading] = useState(false);
  const [toast, setToast] = useState(null);
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
              <div style={{color: 'var(--text-secondary)'}}>Oct 15 - Oct 31, 2023</div>
            </div>

            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-header">
                  Total Employees
                  <Users size={16} />
                </div>
                <div className="metric-value">142</div>
                <div className="metric-trend trend-up">
                  <ArrowUpRight size={16} />
                  <span>+4 this month</span>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-header">
                  Open Positions
                  <Search size={16} />
                </div>
                <div className="metric-value">12</div>
                <div className="metric-trend trend-up">
                  <ArrowUpRight size={16} />
                  <span>+2 this month</span>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  On Leave
                  <Calendar size={16} />
                </div>
                <div className="metric-value">5</div>
                <div className="metric-trend trend-down">
                  <ArrowDownRight size={16} />
                  <span>-1 from last week</span>
                </div>
              </div>
              
              <div className="metric-card" style={{borderLeft: '4px solid var(--primary)'}}>
                <div className="metric-header">
                  Next Payroll
                  <CreditCard size={16} />
                </div>
                <div className="metric-value" style={{fontSize: '1.5rem', marginTop: '0.25rem'}}>Oct 31, 2023</div>
                <div className="metric-trend" style={{color: 'var(--text-secondary)'}}>
                  <span>Approvals due in 2 days</span>
                </div>
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
                          <td style={{color: 'var(--text-secondary)'}}>Oct 24, 2023</td>
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
          <div className="nav-item" style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', position: 'absolute', bottom: '1rem', width: '250px' }}>
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
