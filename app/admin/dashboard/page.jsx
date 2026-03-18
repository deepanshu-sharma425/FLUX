"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "@/actions/admin";
import { Package, Truck, CheckCircle, XCircle, Clock, Search, ChevronDown } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("add-product");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");

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

  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const result = await updateOrderStatus(orderId, newStatus);
      if (result.success) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

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

  const filteredOrders = statusFilter === "ALL" 
    ? orders 
    : orders.filter(o => o.status === statusFilter);

  const statusColors = {
    PENDING: "bg-orange-100 text-orange-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    SHIPPED: "bg-purple-100 text-purple-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <main className="min-h-screen bg-[#f6ecdf] px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Add and manage products and orders</p>
        </div>
        
        <div className="flex bg-[#f2efe9] p-1 rounded-xl shadow-sm">
          <button
            onClick={() => setActiveTab("add-product")}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === "add-product" ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-black"
            }`}
          >
            Add Product
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === "orders" ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-black"
            }`}
          >
            Manage Orders
          </button>
        </div>
      </div>

      {activeTab === "add-product" ? (
        <form
          onSubmit={handleSubmit}
          className="max-w-7xl mx-auto bg-[#f2efe9] rounded-2xl p-6 md:p-10 space-y-10"
        >
          <section>
            <h2 className="section-title">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="name"
                value={form.name}
                placeholder="Product name"
                onChange={handleChange}
                className="input"
                required
              />
              <input
                name="category"
                value={form.category}
                placeholder="Category"
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <textarea
              name="description"
              value={form.description}
              placeholder="Product description"
              onChange={handleChange}
              className="input mt-6"
              rows={3}
              required
            />
          </section>

          <section>
            <h2 className="section-title">Pricing</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <input
                name="price"
                value={form.price}
                placeholder="Price"
                onChange={handleChange}
                className="input"
                required
              />
              <input
                name="discount"
                value={form.discount}
                placeholder="Discount %"
                onChange={handleChange}
                className="input"
                required
              />
              <input
                name="finalPrice"
                value={form.finalPrice}
                placeholder="Final price"
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </section>

          <section>
            <h2 className="section-title">Meta</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="sizes"
                value={form.sizes}
                placeholder="Sizes (7,8,9)"
                onChange={handleChange}
                className="input"
                required
              />
              <select
                name="sex"
                value={form.sex}
                onChange={handleChange}
                className="input"
                required
              >
                <option>Male</option>
                <option>Female</option>
                <option>Unisex</option>
              </select>
              <input
                name="about"
                value={form.about}
                placeholder="About (latest / trending)"
                onChange={handleChange}
                className="input"
                required
              />
              <input
                name="color"
                value={form.color}
                placeholder="Color"
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </section>

          <section>
            <h2 className="section-title">Materials & Fit</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="material"
                value={form.material}
                placeholder="Material"
                onChange={handleChange}
                className="input"
                required
              />
              <input
                name="fit"
                value={form.fit}
                placeholder="Fit"
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </section>

          <section>
            <h2 className="section-title">Product Image</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3">
                <label className="image-upload-box cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <p className="font-bold">Click to upload</p>
                      <p className="text-xs mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
              <div className="flex-1 space-y-4">
                <p className="text-sm text-gray-600">
                  Ensure your image has a clean background for the best look.
                </p>
                {message && (
                  <p className="text-sm font-bold text-orange-600 bg-orange-100 px-4 py-2 rounded-lg">
                    {message}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-4 bg-black text-white rounded-full font-black text-xl hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Create Product"}
                </button>
              </div>
            </div>
          </section>
        </form>
      ) : (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#f2efe9] p-4 rounded-2xl shadow-sm">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border-none focus:ring-2 focus:ring-black outline-none text-sm transition"
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {["ALL", "PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    statusFilter === status 
                      ? "bg-black text-white shadow-md" 
                      : "bg-white text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {loadingOrders ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-20 bg-[#f2efe9] rounded-2xl shadow-sm">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No orders found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#f2efe9] rounded-2xl overflow-hidden shadow-sm border border-transparent hover:border-black/10 transition-all"
                >
                  <div className="p-6 flex flex-wrap items-center justify-between gap-6 border-b border-black/5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-black uppercase tracking-tighter">
                          #{order.id.slice(0, 8)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Ordered by <span className="font-bold text-black">{order.user.name}</span> ({order.user.email})
                      </p>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total Amount</p>
                        <p className="text-xl font-black">₹{order.totalAmount}</p>
                      </div>

                      <div className="relative group">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all">
                          Update Status
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-10 py-2">
                          {["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => (
                            <button
                              key={s}
                              onClick={() => handleStatusUpdate(order.id, s)}
                              className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 transition-colors ${
                                order.status === s ? "text-orange-600 bg-orange-50" : "text-gray-600"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 grid md:grid-cols-2 gap-8 bg-white/30">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3">Items ({order.items.length})</p>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div className="w-12 h-12 rounded-lg bg-white overflow-hidden shrink-0 border border-gray-100 p-1">
                              <img src={item.cloth.image} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold truncate uppercase">{item.cloth.name}</p>
                              <p className="text-[10px] text-gray-500">
                                Size: {item.size} · Qty: {item.quantity} · ₹{item.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-l border-black/5 pl-8">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3">Shipping Address</p>
                      <div className="space-y-1">
                        <p className="text-xs font-bold">{order.address.fullName}</p>
                        <p className="text-xs text-gray-600">{order.address.phone}</p>
                        <p className="text-xs text-gray-600">
                          {order.address.street}, {order.address.city}, {order.address.state} {order.address.pincode}
                        </p>
                        <p className="text-xs text-gray-600">{order.address.country}</p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-[10px] text-gray-500 font-medium">
                            Placed on {new Date(order.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <span className="text-[10px] font-black uppercase text-gray-400">
                          Mode: {order.paymentMode}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
