import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import MonitoredTables from './pages/MonitoredTables'
import Connections from './pages/Connections'
import TableDetails from './pages/TableDetails'

function App() {
  const [currentPage, setCurrentPage] = useState('tables')
  const [selectedTable, setSelectedTable] = useState(null)

  const handleTableSelect = (table) => {
    setSelectedTable(table)
  }

  const handleBackToTables = () => {
    setSelectedTable(null)
    setCurrentPage('tables')
  }

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {selectedTable ? (
          <TableDetails table={selectedTable} onBack={handleBackToTables} />
        ) : (
          <>
            {currentPage === 'tables' && <MonitoredTables onTableSelect={handleTableSelect} />}
            {currentPage === 'connections' && <Connections />}
          </>
        )}
      </main>
    </div>
  )
}

export default App
