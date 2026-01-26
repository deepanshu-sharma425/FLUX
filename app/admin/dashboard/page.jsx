"use client";
import Link from "next/link";
import { useState } from "react";

export default function AdminDashboard() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    sizes: "",
    price: "",
    discount: "",
    finalPrice: "",
    color: "",
    sex: "Male",
    about: "",
    material: "",
    fit: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageFile);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error("Image upload failed");

    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const res = await fetch("/api/adminpost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminEmail: "admin@gmail.com",
          ...form,
          image: imageUrl,
          sizes: form.sizes.split(","),
          price: Number(form.price),
          discount: Number(form.discount),
          finalPrice: Number(form.finalPrice),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage("✅ Cloth added successfully");
      setImageFile(null);
      setImagePreview("");
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6ecdf] px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Add and manage products</p>
        </div>
        <Link href="/products" className="text-sm underline">
          View products
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto bg-[#f2efe9] rounded-2xl p-6 md:p-10 space-y-10"
      >
        {/* BASIC */}
        <section>
          <h2 className="section-title">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <input name="name" placeholder="Product name" onChange={handleChange} className="input" />
            <input name="category" placeholder="Category" onChange={handleChange} className="input" />
          </div>

          <textarea
            name="description"
            placeholder="Product description"
            onChange={handleChange}
            className="input mt-6"
            rows={3}
          />
        </section>

        {/* PRICING */}
        <section>
          <h2 className="section-title">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <input name="price" placeholder="Price" onChange={handleChange} className="input" />
            <input name="discount" placeholder="Discount %" onChange={handleChange} className="input" />
            <input name="finalPrice" placeholder="Final price" onChange={handleChange} className="input" />
          </div>
        </section>

        {/* META */}
        <section>
          <h2 className="section-title">Meta</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <input name="sizes" placeholder="Sizes (7,8,9)" onChange={handleChange} className="input" />
            <select name="sex" onChange={handleChange} className="input">
              <option>Male</option>
              <option>Female</option>
              <option>Unisex</option>
            </select>
            <input name="about" placeholder="About (latest / trending)" onChange={handleChange} className="input" />
          </div>
        </section>

        {/* IMAGE UPLOAD */}
        <section>
          <h2 className="section-title">Product Image</h2>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-40 h-40 object-cover rounded-xl border"
            />
          )}
        </section>

        {/* COLOR */}
        <section>
          <h2 className="section-title">Color</h2>
          <div className="flex items-center gap-4">
            <input
              name="color"
              placeholder="#cc2424"
              onChange={handleChange}
              className="input w-40"
            />
            {form.color && (
              <div
                className="w-10 h-10 rounded border"
                style={{ backgroundColor: form.color }}
              />
            )}
          </div>
        </section>

        {/* DETAILS */}
        <section>
          <h2 className="section-title">Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <input name="material" placeholder="Material" onChange={handleChange} className="input" />
            <input name="fit" placeholder="Fit" onChange={handleChange} className="input" />
          </div>
        </section>

        <button
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Adding product..." : "Add Cloth"}
        </button>

        {message && <p className="text-center font-medium">{message}</p>}
      </form>
    </main>
  );
}
