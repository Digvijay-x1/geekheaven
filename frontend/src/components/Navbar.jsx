import { useEffect, useState } from 'react'
import { CodeXml } from 'lucide-react'
import ThemeSwitcher from './ThemeSwitcher'
import useAuthStore from "../stores/useAuthStore"
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const { authUser, logout, isLoggingOut } = useAuthStore();

  useEffect(() => {
    if (authUser?.bookmarks) {
      setBookmarkCount(authUser.bookmarks.length);
    } else {
      setBookmarkCount(0);
    }
  }, [authUser]);

  const handleLogout = () => {
    try {
       logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-base-100 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <NavLink 
              to="/" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="HypeCode Home"
            >
              <CodeXml className="size-8 text-primary" />
              <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                HypeCode
              </span>
            </NavLink>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <NavLink 
              to="/bookmarks" 
              className={({ isActive }) => 
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-primary text-primary-content' 
                    : 'text-base-content hover:bg-base-200'
                }`
              }
              aria-label={`Bookmarks ${authUser ? `(${bookmarkCount} items)` : ''}`}
            >
              Bookmarks
              {authUser && bookmarkCount > 0 && (
                <span className="badge badge-primary badge-sm">
                  {bookmarkCount}
                </span>
              )}
            </NavLink>

            <ThemeSwitcher />

            {/* User Section */}
            <div className="flex items-center gap-3">
              {authUser ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm hidden sm:inline">
                      {authUser.fullname}
                    </span>
                  </div>
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    aria-label="Logout"
                  >
                    {isLoggingOut ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Logging out...
                      </>
                    ) : (
                      'Logout'
                    )}
                  </button>
                </>
              ) : (
                <>
                  <span className="text-sm text-base-content/70 hidden sm:inline">
                    Guest
                  </span>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={handleLoginRedirect}
                    aria-label="Login"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar