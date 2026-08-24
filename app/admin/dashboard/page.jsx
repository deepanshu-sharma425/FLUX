"use client";
import Link from "next/link";
import { useState } from "react";
import AdminOrders from "./AdminOrders";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products"); // "products" or "orders"
  const initialFormState = {
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
  };

  const [form, setForm] = useState(initialFormState);
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
      if (!res.ok) throw new Error(data.message || "Something went wrong");


      setForm(initialFormState);
      setImageFile(null);
      setImagePreview("");
      setMessage("Cloth added successfully");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6ecdf] px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto mb-10 flex flex-wrap justify-between items-end gap-6">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter">Admin Dashboard</h1>
          <div className="flex gap-6 mt-4">
            <button
              onClick={() => setActiveTab("products")}
              className={`text-sm font-black uppercase tracking-widest pb-1 transition-all border-b-2 ${
                activeTab === "products" ? "border-black text-black" : "border-transparent text-gray-400 hover:text-black"
              }`}
            >
              Add Products
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`text-sm font-black uppercase tracking-widest pb-1 transition-all border-b-2 ${
                activeTab === "orders" ? "border-black text-black" : "border-transparent text-gray-400 hover:text-black"
              }`}
            >
              Manage Orders
            </button>
          </div>
        </div>
        <Link href="/products" className="text-xs font-bold underline uppercase tracking-widest hover:text-orange-500 transition-colors">
          View Public Site →
        </Link>
      </div>

      <div className="max-w-7xl mx-auto">
        {activeTab === "products" ? (
          <form
            onSubmit={handleSubmit}
            className="bg-[#f2efe9] rounded-3xl p-6 md:p-12 space-y-12 shadow-sm border border-black/5"
          >
            {message && (
              <div className={`p-4 rounded-2xl text-sm font-bold uppercase tracking-widest text-center ${
                message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {message}
              </div>
            )}
            
            <section>
              <h2 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">01</span>
                Basic Information
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Product Name</label>
                  <input
                    name="name"
                    value={form.name}
                    placeholder="e.g. Oversized Heavy Hoodie"
                    onChange={handleChange}
                    className="input-v2"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Category</label>
                  <input
                    name="category"
                    value={form.category}
                    placeholder="e.g. Winter / Streetwear"
                    onChange={handleChange}
                    className="input-v2"
                    required
                  />
                </div>
              </div>

              <div className="mt-8 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Product Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  placeholder="Tell the story behind this piece..."
                  onChange={handleChange}
                  className="input-v2"
                  rows={3}
                  required
                />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">02</span>
                Pricing Details
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Base Price (₹)</label>
                  <input
                    name="price"
                    value={form.price}
                    placeholder="2999"
                    onChange={handleChange}
                    className="input-v2"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Discount (%)</label>
                  <input
                    name="discount"
                    value={form.discount}
                    placeholder="10"
                    onChange={handleChange}
                    className="input-v2"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Final Price (₹)</label>
                  <input
                    name="finalPrice"
                    value={form.finalPrice}
                    placeholder="2699"
                    onChange={handleChange}
                    className="input-v2 font-bold text-orange-600"
                    required
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">03</span>
                Product Attributes
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Sizes (Comma Separated)</label>
                  <input
                    name="sizes"
                    value={form.sizes}
                    placeholder="S, M, L, XL"
                    onChange={handleChange}
                    className="input-v2"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Gender</label>
                  <select
                    name="sex"
                    value={form.sex}
                    onChange={handleChange}
                    className="input-v2 bg-white"
                    required
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Unisex</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Primary Color</label>
                  <input
                    name="color"
                    value={form.color}
                    placeholder="Obsidian Black"
                    onChange={handleChange}
                    className="input-v2"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Material / Fit</label>
                  <input
                    name="material"
                    value={form.material}
                    placeholder="Cotton / Oversized"
                    onChange={handleChange}
                    className="input-v2"
                    required
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">04</span>
                Media & Extras
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-black/10 rounded-3xl p-8 hover:bg-white/50 transition-colors cursor-pointer relative min-h-[200px]">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="max-h-[180px] object-contain rounded-xl" />
                    ) : (
                      <div className="text-center">
                        <p className="text-xs font-black uppercase tracking-widest text-gray-400">Upload Product Image</p>
                        <p className="text-[10px] text-gray-300 mt-2 uppercase">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      required={!imagePreview}
                    />
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">About Label (latest / trending)</label>
                    <input
                      name="about"
                      value={form.about}
                      placeholder="e.g. LIMITED DROP"
                      onChange={handleChange}
                      className="input-v2"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-6 bg-black text-white rounded-full font-black text-lg uppercase tracking-[0.2em] hover:bg-orange-600 transition-all duration-500 shadow-xl shadow-black/10 flex items-center justify-center gap-4 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Release Product"
                    )}
                  </button>
                </div>
              </div>
            </section>
          </form>
        ) : (
          <AdminOrders />
        )}
      </div>
    </main>
  );
}

const Loader2 = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
