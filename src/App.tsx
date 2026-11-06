import { Navigate, Route, Routes } from 'react-router-dom'
import { AnnotationProvider } from './context/annotations'
import Layout from './components/Layout'
import Inbox from './pages/Inbox'
import RequestForm from './pages/RequestForm'
import Confirmation from './pages/Confirmation'
import SupplierProfile from './pages/SupplierProfile'
import TieredOffers from './pages/TieredOffers'
import Concept from './pages/Concept'

export default function App() {
  return (
    <AnnotationProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/1" replace />} />
          <Route path="/1" element={<Inbox />} />
          <Route path="/2" element={<RequestForm />} />
          <Route path="/3" element={<Confirmation />} />
          <Route path="/4" element={<SupplierProfile />} />
          <Route path="/5" element={<TieredOffers />} />
          <Route path="/concept" element={<Concept />} />
          <Route path="*" element={<Navigate to="/1" replace />} />
        </Route>
      </Routes>
    </AnnotationProvider>
  )
}
