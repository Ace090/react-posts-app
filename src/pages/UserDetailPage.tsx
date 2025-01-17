import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../interfaces/user.interface";
import "../App.css";

function UserDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { user?: User } | null; // Allow for undefined state
  const user = state?.user;

  if (!user) {
    return (
      <div style={{ padding: "1rem", textAlign: "center" }}>
        <h1>User Not Found</h1>
        <p>
          The requested user could not be found. Please go back to the post
          list.
        </p>
        <button
          className="user-detail-go-back-btn"
          onClick={() => navigate(-1)}
          style={{}}
        >
          Back to Posts
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>User Details</h1>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Website:</strong> {user.website}
      </p>
      <button onClick={() => navigate(-1)} className="user-detail-go-back-btn">
        Back to Posts
      </button>
    </div>
  );
}

export default UserDetailPage;
