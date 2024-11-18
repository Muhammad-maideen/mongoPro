import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const App = () => {
  const API_URL = "https://mongo-git-one.vercel.app/api/posts";

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

      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.5 }}
        className="card bg-base-100 shadow-xl p-4"
      >
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5, delay: 0.1 }}
          className="form-control w-1/2 mx-auto" 
        >
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
          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`btn w-full ${editPostId ? "btn-warning" : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"} `}
            onClick={editPostId ? () => updatePost(editPostId) : createPost}
          >
            {editPostId ? "Update Post" : "Create Post"}
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {posts.map((post) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card text-gray-800 bg-slate-500 shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{post.course}</h2>
              <p>{post.description}</p>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button
                className="btn btn-sm btn-warning"
                onClick={() => {
                  setNewPost(post.course);
                  setNewDescription(post.description);
                  setEditPostId(post._id);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-error"
                onClick={() => deletePost(post._id)}
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default App;