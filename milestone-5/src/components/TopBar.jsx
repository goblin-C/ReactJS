import { signOut } from "aws-amplify/auth";

export default function TopBar({ handleSearchText, user }) {
  const handleLogout = async () => {
    try {
      await signOut({ global: true });
      localStorage.clear();

      const domain = `mile.auth.${
        import.meta.env.VITE_APP_REGION
      }.amazoncognito.com`;
      const clientId = import.meta.env.VITE_CLIENT_ID;
      const redirectUri = encodeURIComponent("http://localhost:5173/");

      // Go to Cognito logout endpoint, then redirect back to login
      window.location.href = `https://${domain}/logout?client_id=${clientId}&logout_uri=${redirectUri}`;
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex border-b border-[#E5E9EB]">
      {/* Search bar */}
      <div className="flex items-center py-4 pl-10">
        <div className="pr-2">
          <img src="images/search.svg" alt="search" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="text-sidebar-menu-text placeholder-[#84919A] bg-transparent border-none outline-none"
          onChange={(e) => handleSearchText(e.target.value)}
        />
      </div>
      <div className="flex items-center ml-auto pr-11 gap-3">
        <button>
          <img src="images/feedback.svg" alt="feedback" />
        </button>
        <button>
          <img src="images/notification.svg" alt="notification" />
        </button>
        <button>
          <img src="images/help.svg" alt="help" />
        </button>
        <button
          onClick={handleLogout}
          title={`Logout ${user?.email || "User"}`}
        >
          <img src="images/user.svg" alt="user" />
        </button>
      </div>
    </div>
  );
}
