import { useState, useEffect } from "react";
import { FaListAlt, FaSun, FaMoon } from "react-icons/fa";
import { Post } from "../interfaces/post.interface";
import { User } from "../interfaces/user.interface";
import PostCard from "../components/PostCard";
import { fetchPosts, fetchUsers } from "../services/postService";
import "../App.css";

function PostListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<{
    post: Post;
    user: User;
  } | null>(null);

  // Theme state
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    if (!isDarkTheme) {
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedPost(null);
  };

  const handlePostClick = (post: Post, user: User) => {
    setSelectedPost({ post, user });
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await fetchPosts();
        const usersData = await fetchUsers();
        setPosts(postsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
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
      {/* Theme toggle button */}
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {isDarkTheme ? (
          <FaSun size={24} color="#fff" />
        ) : (
          <FaMoon size={24} color="#fff" />
        )}
      </button>

      <h1>
        <div className="app-title">
          <FaListAlt size={50} />
          <span>Post List</span>
        </div>
      </h1>

      {/* Selected Post Modal */}
      {selectedPost && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="selected-post-header">
              post pubblicato da: {selectedPost.user.name} alias
              <span style={{ color: "var(--color-primary)", marginLeft: 5 }}>
                {selectedPost.user.username}
              </span>
            </div>

            <h2 className="selected-post-title">{selectedPost.post.title}</h2>
            <p className="selected-post-body">{selectedPost.post.body}</p>

            <button className="selected-post-button" onClick={closeModal}>
              Chiudi
            </button>
          </div>
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

export default PostListPage;
