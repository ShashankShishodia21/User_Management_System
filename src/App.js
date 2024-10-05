import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserTable from './components/UserTable.js';
import UserDetails from './pages/UserDetails.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTable />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
