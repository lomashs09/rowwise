import { useState } from 'react'
import './Connections.css'

function Connections() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [connectionName, setConnectionName] = useState('')
  const [serviceAccountJson, setServiceAccountJson] = useState('')

  const handleTestConnection = () => {
    // Handle test connection
    console.log('Testing connection...')
  }

  const handleDeleteConnection = () => {
    // Handle delete connection
    console.log('Deleting connection...')
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setConnectionName('')
    setServiceAccountJson('')
  }

  const handleSaveConnection = () => {
    // Handle save connection
    console.log('Saving connection:', { connectionName, serviceAccountJson })
    handleCloseModal()
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  return (
    <div className="connections">
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add New Connection</h2>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5L5 15M5 5L15 15" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="modal-body">
              <p className="modal-instructions">
                Provide a Service Account JSON key with BigQuery Data Viewer permissions.
              </p>
              
              <div className="form-group">
                <label htmlFor="connection-name" className="form-label">Connection Name</label>
                <input
                  id="connection-name"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Production Data Warehouse"
                  value={connectionName}
                  onChange={(e) => setConnectionName(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="service-account-json" className="form-label">Service Account JSON</label>
                <textarea
                  id="service-account-json"
                  className="form-textarea"
                  placeholder='{"type": "service_account", "project_id": ...}'
                  value={serviceAccountJson}
                  onChange={(e) => setServiceAccountJson(e.target.value)}
                  rows={8}
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveConnection}>
                Save Connection
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="page-header">
        <div className="header-content">
          <div>
            <h1>Connections</h1>
            <p className="page-subtitle">Manage BigQuery service accounts.</p>
          </div>
          <button className="add-connection-btn" onClick={handleOpenModal}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Connection
          </button>
        </div>
      </div>
      
      <div className="connections-list">
        <div className="connection-card">
          <div className="connection-card-header">
            <div className="connection-header-left">
              <div className="connection-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 3H20C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3Z" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 8H16M8 12H16M8 16H16" stroke="#111827" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="connection-title-info">
                <div className="connection-title">Prod BigQuery</div>
                <div className="connection-id">ID: 1</div>
              </div>
            </div>
            <button className="delete-btn" onClick={handleDeleteConnection}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5H5H17" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 5V3C8 2.46957 8.21071 1.96086 8.58579 1.58579C8.96086 1.21071 9.46957 1 10 1C10.5304 1 11.0391 1.21071 11.4142 1.58579C11.7893 1.96086 12 2.46957 12 3V5M15 5V17C15 17.5304 14.7893 18.0391 14.4142 18.4142C14.0391 18.7893 13.5304 19 13 19H7C6.46957 19 5.96086 18.7893 5.58579 18.4142C5.21071 18.0391 5 17.5304 5 17V5H15Z" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="connection-card-body">
            <code className="connection-json">
              {`{ "type": "service_account", "project_id": "prod-a...`}
            </code>
          </div>
          
          <div className="connection-card-footer">
            <button className="test-connection-btn" onClick={handleTestConnection}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Test Connection
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Connections
