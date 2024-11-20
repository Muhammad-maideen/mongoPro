import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const API_URL = "";

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editPostId, setEditPostId] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_URL);
      setPosts(response.data);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  const createPost = async () => {
    if (!newPost || !newDescription) return;

    try {
      const response = await axios.post(API_URL, {
        course: newPost,
        description: newDescription,
      });
      setPosts([...posts, response.data]);
      setNewPost("");
      setNewDescription("");
    } catch (error) {
      console.log("Error creating post", error);
    }
  };

  const updatePost = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        course: newPost,
        description: newDescription,
      });
      setPosts(posts.map((post) => (post._id === id ? response.data : post)));
      setNewPost("");
      setNewDescription("");
      setEditPostId(null);
    } catch (error) {
      console.error("Error editing post", error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Posts</h1>

      <div className="card bg-base-100 shadow-xl p-4">
        <div className="form-control">
          <input
            type="text"
            placeholder="Enter course"
            className="input input-bordered mb-2"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter description"
            className="input input-bordered mb-2"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button
            className={`btn w-full ${
              editPostId ? "btn-warning" : "btn-primary"
            }`}
            onClick={editPostId ? () => updatePost(editPostId) : createPost}
          >
            {editPostId ? "Update Post" : "Create Post"}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <ol className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="card bg-base-100 shadow-md p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">{post.course}</h2>
                  <p className="text-gray-600">{post.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="btn btn-outline btn-warning btn-sm"
                    onClick={() => {
                      setEditPostId(post._id);
                      setNewPost(post.course);
                      setNewDescription(post.description);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline btn-error btn-sm"
                    onClick={() => deletePost(post._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default App;
