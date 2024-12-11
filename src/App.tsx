import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import RoadsPage from './pages/RoadsPage';
import PaymentPage from './pages/PaymentPage';
import RoadPage from './pages/RoadPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import PaymentsListPage from './pages/PaymentsListPage'; 
import ProfilePage from './pages/ProfilePage'; 


const tauri = (window as any).__TAURI__?.tauri;

function App() {
    useEffect(() => {
        if (tauri) {
            tauri
                .invoke("create")
                .then((response: any) => console.log(response))
                .catch((error: any) => console.log(error));

            return () => {
                tauri
                    .invoke("close")
                    .then((response: any) => console.log(response))
                    .catch((error: any) => console.log(error));
            };
        } else {
            console.warn("Tauri API not available in this environment");
        }
    }, []);

    return (
        <Router basename="/roads_frontend">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/roads" element={<RoadsPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/roads/:roadId" element={<RoadPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/payments-list" element={<PaymentsListPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App;
