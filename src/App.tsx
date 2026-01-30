import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import UUIDSearch from './pages/UUIDSearch'
import UsageAnalysis from './pages/UsageAnalysis'
import FeatureAnalysis from './pages/FeatureAnalysis'
import UserJourney from './pages/UserJourney'
import ErrorManagement from './pages/ErrorManagement'
import LoggingCheck from './pages/LoggingCheck'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="uuid-search" element={<UUIDSearch />} />
          <Route path="stats/usage" element={<UsageAnalysis />} />
          <Route path="stats/features" element={<FeatureAnalysis />} />
          <Route path="stats/journey" element={<UserJourney />} />
          <Route path="errors" element={<ErrorManagement />} />
          <Route path="logging" element={<LoggingCheck />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
