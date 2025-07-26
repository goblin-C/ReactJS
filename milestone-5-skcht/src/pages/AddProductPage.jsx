import { useState } from 'react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Toast from '../components/Toast';
import axios from 'axios';

export default function AddProductPage() {
  const [form, setForm] = useState({ title: '', price: '', description: '', image: null });
  const [previewUrl, setPreviewUrl] = useState('');
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setForm((prev) => ({ ...prev, image: url }));
  };

  const handleImageRemove = () => {
    setPreviewUrl('');
    setForm((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, price, description, image } = form;

    if (!title || !price || !description || !image) {
      setToast({ type: 'error', message: 'All fields are required.' });
      return;
    }

    try {
      await axios.post('https://api.escuelajs.co/api/v1/products/', {
        title,
        price: parseFloat(price),
        description,
        categoryId: 1,
        images: ["https://placehold.co/600x400",],
      });

      setToast({ type: 'success', message: 'Product Added Successfully' });
      setForm({ title: '', price: '', description: '', image: null });
      setPreviewUrl('');
    } catch (err) {
      console.error(err)
      setToast({ type: 'error', message: 'Failed to add product' });
    }
  };

  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">Add Product</h1>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product image</label>
              <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center relative">
                {previewUrl ? (
                  <div className="relative inline-block">
                    <img src={previewUrl} alt="Preview" className="h-40 object-contain rounded-md" />
                    <button
                      onClick={handleImageRemove}
                      type="button"
                      className="absolute top-1 right-1 bg-white border rounded-full p-1 shadow text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-500">Drag and drop files</p>
                    <p className="text-sm text-gray-400">or</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block mx-auto mt-2 text-sm"
                    />
                    <p className="text-xs text-gray-400 mt-2">Supported file types: jpg, png, jpeg</p>
                  </>
                )}
              </div>
            </div>

            {/* Title + Price */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter product title"
                />
              </div>
              <div className="w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter product price"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter product description"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Add
            </button>
          </form>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
