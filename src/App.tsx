import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoadsPage from './pages/RoadsPage';
import PaymentPage from './pages/PaymentPage';
import RoadPage from './pages/RoadPage';
import HomePage from './pages/HomePage'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/roads" element={<RoadsPage />} />
                <Route path="/payments" element={<PaymentPage />} />
                <Route path="/roads/:roadId" element={<RoadPage />} />
            </Routes>
        </Router>
    );
}

export default App;
