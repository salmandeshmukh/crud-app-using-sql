import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const API_BASE = "https://next.salmandeshmukh.com/php"; // your backend URL

function CrudApp() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();  // Initialize navigate

  // Ensure the user is logged in on initial load
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
      // If not logged in, redirect to the login page
      navigate("/");  // Redirect to login page
    } else {
      fetchProducts();  // Fetch products only if logged in
    }
  }, [navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/read.php`);
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.description || !form.price) {
      setError("All fields are required.");
      return;
    }

    setError(""); // Reset error message
    setLoading(true);

    try {
      if (editingId) {
        // Update product
        await axios.post(`${API_BASE}/update.php`, { id: editingId, ...form });
      } else {
        // Create new product
        await axios.post(`${API_BASE}/create.php`, form);
      }
      setForm({ name: "", description: "", price: "" });
      setEditingId(null);
      fetchProducts(); // Refresh the list of products
    } catch (err) {
      setError("Error saving product. Please try again.");
      console.error("Submit error:", err.response || err.message || err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.get(`${API_BASE}/delete.php?id=${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("isLoggedIn");  // Clear the login state from localStorage
  //   window.location.reload();  // Force a full page reload
  // };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");  
    setIsLoggedIn(false);  
    navigate("/"); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
      >
        Logout
      </button>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-black">{editingId ? "Edit" : "Add"} Product</h1>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Product Name"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-black"
          />
          <input
            type="text"
            name="description"
            value={form.description}
            placeholder="Description"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-black"
          />
          <input
            type="number"
            name="price"
            value={form.price}
            placeholder="Price"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-black"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-black">Product List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {products.map((product) => (
              <li key={product.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-black">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <p className="text-green-600 font-semibold">₹{product.price}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CrudApp;
