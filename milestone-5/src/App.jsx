import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { fetchAuthSession, getCurrentUser, signInWithRedirect } from "aws-amplify/auth";
import awsconfig from "./aws-exports";
import AppRoutes from "./routes";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import "./index.css";

Amplify.configure(awsconfig);

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateSearchText = (text) => setSearchText(text);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // Try to get tokens first
        const session = await fetchAuthSession();
        const idToken = session.tokens?.idToken?.toString();

        if (!idToken) {
          // No token means not logged in
          await signInWithRedirect();
          return;
        }

        // Get user details
        const currentUser = await getCurrentUser();
        const decoded = JSON.parse(atob(idToken.split('.')[1])); // decode JWT
        setUser({
          username: currentUser.username,
          email: decoded.email,
        });
      } catch (error) {
        console.error("Auth error:", error);
        await signInWithRedirect();
      } finally {
        setLoading(false);
      }
    };

    // Clean up OAuth code from URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("code")) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    checkAuthState();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Redirecting to login...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1">
        <TopBar handleSearchText={updateSearchText} user={user} />
        <AppRoutes searchText={searchText} user={user} />
      </div>
    </div>
  );
}
