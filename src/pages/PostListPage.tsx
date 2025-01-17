import { useState, useEffect } from "react";
import { Post } from "../interfaces/post.interface";
import { User } from "../interfaces/user.interface";
import PostCard from "../components/PostCard";
import { fetchPosts, fetchUsers } from "../services/postService";

function PostListPage() {
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

export default PostListPage;
