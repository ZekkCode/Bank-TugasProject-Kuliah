import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import IntroAnimation from './components/guards/IntroAnimation';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import FilesPage from './pages/FilesPage';
import AuthGuard from './components/guards/AuthGuard';
import MainLayout from './components/layout/MainLayout';

const AppRoutes = () => {
  const { isIntroDone } = useAuth();

  if (!isIntroDone) {
    return <IntroAnimation />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <MainLayout />
          </AuthGuard>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="folder/:id" element={<FilesPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <AppRoutes />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
