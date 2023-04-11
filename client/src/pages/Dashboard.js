import { Link, useNavigate, useLocation } from "react-router-dom";

import "./Dashboard.css"

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token')
  
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <div className="dashboard-container">
        {!token && (
            <>
                {location.pathname === "/register" ? (
                    <div>
                        <Link to="/">Login</Link>
                    </div>
                ) : (
                    <>
                        <div>
                            <Link to="/register">Register</Link>
                        </div>
                    </>
                )}
            </>
        )}
        {token &&
            <>
            <div>
                <Link onClick={handleLogout}>Logout</Link>
            </div>
            </>
        }
    </div>
  )
}

export default Dashboard