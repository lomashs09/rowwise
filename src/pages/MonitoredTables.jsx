import { useState } from 'react'
import './MonitoredTables.css'

const mockTables = [
  {
    id: 1,
    identifier: 'raw_events.page_views',
    connection: 'prod-analytics-123',
    status: 'healthy',
    lastChecked: 'Never run'
  },
  {
    id: 2,
    identifier: 'core.users',
    connection: 'prod-analytics-123',
    status: 'healthy',
    lastChecked: 'Never run'
  },
  {
    id: 3,
    identifier: 'marketing.ad_spend',
    connection: 'prod-analytics-123',
    status: 'healthy',
    lastChecked: 'Never run'
  }
]

function MonitoredTables({ onTableSelect }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedConnection, setSelectedConnection] = useState('')
  const [projectId, setProjectId] = useState('gcp-project-id')
  const [dataset, setDataset] = useState('analytics_prod')
  const [tableName, setTableName] = useState('events_log')
  
  // Mock connections list
  const connections = [
    { id: '1', name: 'Prod BigQuery' }
  ]
  
  const totalMonitored = mockTables.length
  const healthyTables = mockTables.filter(t => t.status === 'healthy').length
  const criticalIssues = mockTables.filter(t => t.status === 'critical').length
  
  const filteredTables = mockTables.filter(table =>
    table.identifier.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedConnection('')
    setProjectId('gcp-project-id')
    setDataset('analytics_prod')
    setTableName('events_log')
  }

  const handleStartMonitoring = () => {
    // Handle start monitoring
    console.log('Starting monitoring:', { selectedConnection, projectId, dataset, tableName })
    handleCloseModal()
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  const handleConnectionSelect = (connectionId) => {
    setSelectedConnection(connectionId)
    // When connection is selected, we can populate projectId from connection data
    if (connectionId === '1') {
      setProjectId('gcp-project-id')
    }
  }
  
  return (
    <div className="monitored-tables">
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Monitor New Table</h2>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5L5 15M5 5L15 15" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-section">
                <div className="form-section-label">Connection</div>
                
                {!selectedConnection ? (
                  <div className="connection-dropdown-wrapper">
                    <label htmlFor="connection-select" className="form-label">Select a connection</label>
                    <div className="connection-dropdown">
                      <select
                        id="connection-select"
                        className="form-select"
                        value={selectedConnection}
                        onChange={(e) => handleConnectionSelect(e.target.value)}
                      >
                        <option value="">Select a connection</option>
                        {connections.map((conn) => (
                          <option key={conn.id} value={conn.id}>
                            {conn.name}
                          </option>
                        ))}
                      </select>
                      <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L8 10L12 6" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="selected-connection">
                      <div className="form-group">
                        <label className="form-label">Connection</label>
                        <input
                          type="text"
                          className="form-input selected"
                          value={connections.find(c => c.id === selectedConnection)?.name || ''}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Project ID</label>
                        <input
                          type="text"
                          className="form-input"
                          value={projectId}
                          onChange={(e) => setProjectId(e.target.value)}
                          placeholder="gcp-project-id"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dataset" className="form-label">Dataset</label>
                  <input
                    id="dataset"
                    type="text"
                    className="form-input"
                    placeholder="analytics_prod"
                    value={dataset}
                    onChange={(e) => setDataset(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="table" className="form-label">Table</label>
                  <input
                    id="table"
                    type="text"
                    className="form-input"
                    placeholder="events_log"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="start-monitoring-btn" onClick={handleStartMonitoring}>
                Start Monitoring
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="page-header">
        <div className="header-content">
          <div>
            <h1>Monitored Tables</h1>
            <p className="page-subtitle">Overview of data quality status across your warehouse.</p>
          </div>
          <button className="add-table-btn" onClick={handleOpenModal}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Table
          </button>
        </div>
      </div>
      
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-label">Total Monitored</div>
          <div className="card-value">{totalMonitored}</div>
        </div>
        <div className="summary-card">
          <div className="card-label">Healthy Tables</div>
          <div className="card-value healthy">{healthyTables}</div>
        </div>
        <div className="summary-card">
          <div className="card-label">Critical Issues</div>
          <div className="card-value critical">{criticalIssues}</div>
        </div>
      </div>
      
      <div className="search-container">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 19L14.65 14.65" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search tables..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="tables-list-container">
        <table className="tables-list">
          <thead>
            <tr>
              <th>Table Identifier</th>
              <th>Status</th>
              <th>Last Checked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTables.map((table) => (
              <tr key={table.id}>
                <td>
                  <div className="table-identifier">
                    <div className="identifier-main">{table.identifier}</div>
                    <div className="identifier-sub">{table.connection}</div>
                  </div>
                </td>
                <td>
                  <div className="status-badge healthy">
                    <span className="status-dot"></span>
                    <span>Healthy</span>
                  </div>
                </td>
                <td>{table.lastChecked}</td>
                <td>
                  <a 
                    href="#" 
                    className="action-link"
                    onClick={(e) => {
                      e.preventDefault()
                      if (onTableSelect) {
                        onTableSelect(table)
                      }
                    }}
                  >
                    Details
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MonitoredTables
