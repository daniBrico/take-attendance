import { Routes, Route } from 'react-router-dom'
import { TakeAttendance } from './components/TakeAttendance'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<TakeAttendance />} />
    </Routes>
  )
}
