import React, { useEffect, useState } from "react";
import { About } from "./Pages/About";
import { HomePage } from "./Pages/HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { TermsAndConditions } from "./Pages/TermsAndConditions";
import { PrivacyPolicy } from "./Pages/PrivacyPolicy";
import { Contact } from "./Pages/Contact";
import { StudentDashboard } from "./Pages/StudentDashboard";
import { StudentNotifications } from "./Pages/StudentNotifications";
import { StudentProfile } from "./Pages/StudentProfile";
import { DoctorDashboard } from "./Pages/DoctorDashboard";
import { DoctorProfile } from "./Pages/DoctorProfile";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from "./Pages/Login";
import { Register } from "./Pages/Register";
import AdminDashboard from "./Pages/AdminDashboard";
import StudentConsultation from "./Pages/StudentConsultation";
import { DoctorRevision } from "./Pages/DoctorRevision";
import DoctorNotifications from "./Pages/DoctorNotifications";
import DoctorConsultations from "./Pages/DoctorConsultations";
import StudentConsultations from "./Pages/StudentConsultations";
import { parseJwt } from "./utils/utils";
import { endpoint } from "./utils/endpoint";

export function App() {
  const RootComponent = () => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
      const verify = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setAuthenticated(false);
          setLoading(false);
          return;
        }
        try {
          const res = await fetch(`${endpoint}/auth/verify`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          if (data && data.valid) {
            const payload = parseJwt(token);
            const userRole =
              payload?.role ||
              payload?.rol ||
              (Array.isArray(payload?.roles) ? payload.roles[0] : undefined);
            setAuthenticated(true);
            setRole(userRole);
          } else {
            setAuthenticated(false);
          }
        } catch {
          setAuthenticated(false);
        } finally {
          setLoading(false);
        }
      };
      verify();
    }, []);

    if (loading) return <div className="p-4">Cargando...</div>;
    if (authenticated && role) {
      return <Navigate to={`/${role}/dashboard`} replace />;
    }
    return <HomePage />;
  };

  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
      let mounted = true;
      const verify = async () => {
        try {
          const token = localStorage.getItem("authToken");
          if (!token) {
            if (mounted) {
              setAuthenticated(false);
              setLoading(false);
            }
            return;
          }

          const res = await fetch(`${endpoint}/auth/verify`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();
          console.log("Verification response:", data);
          if (data && data.valid) {
            const payload = parseJwt(token);
            const role =
              payload?.role ||
              payload?.rol ||
              (Array.isArray(payload?.roles) ? payload.roles[0] : undefined);
            if (mounted) {
              setAuthenticated(true);
              setUserRole(role);
            }
          } else {
            if (mounted) setAuthenticated(false);
          }
        } catch {
          if (mounted) setAuthenticated(false);
        } finally {
          if (mounted) setLoading(false);
        }
      };

      verify();
      return () => {
        mounted = false;
      };
    }, [allowedRoles]);

    if (loading) return <div className="p-4">Cargando...</div>;
    if (!authenticated) return <Navigate to="/login" replace />;
    if (authenticated && userRole && !allowedRoles.includes(userRole)) {
      return <Navigate to={`/${userRole}/dashboard`} replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootComponent />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/notifications"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/consultation"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentConsultation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/consultations"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentConsultations />
            </ProtectedRoute>
          }
        />

        {/* Doctor Routes */}
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/profile"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/revision/:id"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorRevision />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/notifications"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/consultations"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorConsultations />
            </ProtectedRoute>
          }
        />

        {/* Âdmin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/register"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Register />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
