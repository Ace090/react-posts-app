import { useLocation, Link } from "react-router-dom";
import { User } from "../interfaces/user.interface";

function UserDetailPage() {
  const location = useLocation();
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
        <Link to="/" style={{ color: "#FF0000", textDecoration: "underline" }}>
          Back to Posts
        </Link>
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
      <Link to="/" style={{ color: "#FF0000", textDecoration: "underline" }}>
        Back to Posts
      </Link>
    </div>
  );
}

export default UserDetailPage;
