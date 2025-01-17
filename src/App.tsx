import React, { useState, useEffect } from "react";
import { Post } from "./interfaces/post.interface";
import { User } from "./interfaces/user.interface";
import "./App.css";

function PostCard({
  post,
  user,
  onClick,
}: {
  post: Post;
  user: User;
  onClick: () => void;
}) {
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
          <a style={{ color: "#FF0000", textDecorationLine: "underline" }}>
            {user?.username}
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<{
    post: Post;
    user: User;
  } | null>(null);

  const handlePostClick = (post: Post, user: User) => {
    setSelectedPost({ post, user });
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Fetch data from APIs
    const fetchData = async () => {
      try {
        const postsRes = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const usersRes = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const postsData = await postsRes.json();
        const usersData = await usersRes.json();
        setPosts(postsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Errore nel caricamento dei dati:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div style={{ textAlign: "center" }}>Caricamento in corso...</div>;
  }

  return (
    <div className="app-container">
      <h1 className="app-title">📋 Post List</h1>

      {/* Selected Post Card */}
      {selectedPost && (
        <div className="selected-post-card">
          <div className="selected-post-header">
            post pubblicato da: {selectedPost.user.name} alias
            <span style={{ color: "#FF0000", marginLeft: 5 }}>
              {selectedPost.user.username}
            </span>
          </div>

          <h2 className="selected-post-title">{selectedPost.post.title}</h2>
          <p className="selected-post-body">{selectedPost.post.body}</p>

          <button
            className="selected-post-button"
            onClick={() => setSelectedPost(null)}
          >
            Chiudi
          </button>
        </div>
      )}

      {/* Post List */}
      {posts.map((post) => {
        const user = users.find((u) => u.id === post.userId);
        if (!user) return null; // skip if user is not found
        return (
          <PostCard
            key={post.id}
            post={post}
            user={user}
            onClick={() => handlePostClick(post, user)}
          />
        );
      })}
    </div>
  );
}

export default App;
