import './TableDetails.css'

function TableDetails({ table, onBack }) {
  // Parse table identifier (e.g., "raw_events.page_views" -> dataset: "raw_events", table: "page_views")
  const [dataset, tableName] = table?.identifier?.split('.') || ['raw_events', 'page_views']
  
  const connection = table?.connection || 'prod-analytics-123'
  const status = table?.status || 'healthy'
  
  // Mock data for the details page
  const rowCount = '1,250,000'
  const totalSize = '500 MB'
  const recentIssues = '0'
  
  const handleBack = () => {
    if (onBack) {
      onBack()
    }
  }

  return (
    <div className="table-details">
      <div className="page-header">
        <a href="#" className="back-link" onClick={(e) => { e.preventDefault(); handleBack() }}>
          ← Back to Dashboard
        </a>
        <div className="title-section">
          <div className="title-with-status">
            <h1 className="page-title">{tableName}</h1>
            <div className={`status-indicator ${status}`}>
              <span className="status-dot"></span>
              <span className="status-text">Healthy</span>
            </div>
          </div>
          <p className="table-subtitle">{connection} • {dataset}</p>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12L7 8L10 11L14 7L21 14" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 17L7 13L10 16L14 12L21 19" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="card-info">
            <div className="card-label">Row Count</div>
            <div className="card-value">{rowCount}</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 3H20C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3Z" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 8H16M8 12H16M8 16H16" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="card-info">
            <div className="card-label">Total Size</div>
            <div className="card-value">{totalSize}</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="card-info">
            <div className="card-label">Recent Issues</div>
            <div className="card-value">{recentIssues}</div>
          </div>
        </div>
      </div>

      <div className="details-sections">
        <div className="details-section row-history">
          <h2 className="section-title">Row Count History</h2>
          <div className="chart-container">
            <div className="chart">
              <div className="chart-y-axis">
                <div className="y-label">1400k</div>
                <div className="y-label">1050k</div>
                <div className="y-label">700k</div>
                <div className="y-label">350k</div>
                <div className="y-label">0</div>
              </div>
              <div className="chart-content">
                <div className="chart-area">
                  <svg className="chart-line" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="0" y1="11" x2="100" y2="11" stroke="#e5e7eb" strokeWidth="0.5"/>
                    <line x1="0" y1="33" x2="100" y2="33" stroke="#e5e7eb" strokeWidth="0.5"/>
                    <line x1="0" y1="55" x2="100" y2="55" stroke="#e5e7eb" strokeWidth="0.5"/>
                    <line x1="0" y1="77" x2="100" y2="77" stroke="#e5e7eb" strokeWidth="0.5"/>
                    <line x1="0" y1="99" x2="100" y2="99" stroke="#e5e7eb" strokeWidth="0.5"/>
                    <circle cx="20" cy="11" r="2" fill="#2563eb"/>
                    <line x1="20" y1="11" x2="20" y2="99" stroke="#2563eb" strokeWidth="0.5" strokeDasharray="2,2"/>
                  </svg>
                  <div className="chart-point-label">Jan 16</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="details-section issues-log">
          <h2 className="section-title">Issues Log</h2>
          <div className="issues-content">
            <div className="issue-entry">
              <div className="issue-time">Jan 16, 23:20</div>
              <div className="issue-message">No anomalies detected.</div>
            </div>
            <div className="clean-indicator">Clean</div>
          </div>
        </div>
      </div>

      <div className="details-section schema-changes">
        <h2 className="section-title">Schema Changes</h2>
        <div className="schema-content">
          <p className="schema-message">No schema changes detected in the last 30 days.</p>
          <p className="schema-comment">// Future diffs will appear here when columns are added or removed.</p>
        </div>
      </div>
    </div>
  )
}

export default TableDetails
