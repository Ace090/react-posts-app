import { Link } from "react-router-dom";
import { Post } from "../interfaces/post.interface";
import { User } from "../interfaces/user.interface";
import "../App.css";

interface PostCardProps {
  post: Post;
  user: User;
  onClick: () => void;
}

function PostCard({ post, user, onClick }: PostCardProps) {
  return (
    <div className="post-card">
      {/* Colored square with initials */}
      <div onClick={onClick} style={{ cursor: "pointer" }}>
        <div className="post-card-square">
          <p>
            {user?.name
              .split(" ")
              .map((n: string) => n[0])
              .slice(0, 2)
              .join("")}
          </p>
        </div>
      </div>
      {/* Post content */}
      <div className="post-card-content">
        <h2 className="post-card-title">{post.title}</h2>
        <div className="post-card-meta">
          pubblicato da{" "}
          <Link
            to={`/user/${user.id}`}
            state={{ user }} // Pass the user as state
            style={{ color: "#FF0000", textDecorationLine: "underline" }}
          >
            {user?.username}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
