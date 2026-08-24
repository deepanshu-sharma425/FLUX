"use client";

import React, { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "@/actions/order";
import { Loader2, Package, User, MapPin, CheckCircle2, Truck, XCircle, Clock } from "lucide-react";
import Image from "next/image";

const statusIcons = {
  PENDING: <Clock className="w-4 h-4 text-orange-500" />,
  CONFIRMED: <CheckCircle2 className="w-4 h-4 text-blue-500" />,
  SHIPPED: <Truck className="w-4 h-4 text-purple-500" />,
  DELIVERED: <CheckCircle2 className="w-4 h-4 text-green-500" />,
  CANCELLED: <XCircle className="w-4 h-4 text-red-500" />,
};

const statusLabels = {
  PENDING: "Waiting to be Confirmed",
  CONFIRMED: "Confirmed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const result = await getAllOrders();
    if (result.success) {
      setOrders(result.orders);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdating(orderId);
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } else {
      alert(result.error);
    }
    setUpdating(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
        <p className="font-bold text-gray-500 uppercase tracking-widest text-xs">Loading all orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100">
        <p className="font-bold">{error}</p>
        <button onClick={fetchOrders} className="mt-4 text-sm underline font-black uppercase">Try Again</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2">
          <Package className="w-6 h-6 text-orange-500" />
          Recent Orders ({orders.length})
        </h2>
        <button onClick={fetchOrders} className="text-xs font-bold underline hover:text-orange-500 transition-colors uppercase">
          Refresh List
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-20 text-center border border-black/5 shadow-sm">
          <p className="text-gray-400 font-bold uppercase tracking-widest">No orders placed yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
              {/* Order Header */}
              <div className="bg-[#f2efe9] p-4 flex flex-wrap items-center justify-between gap-4 border-b border-black/5">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">Order ID</p>
                    <p className="text-xs font-black truncate max-w-[120px]">{order.id}</p>
                  </div>
                  <div className="h-8 w-px bg-black/10" />
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">Date</p>
                    <p className="text-xs font-black">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="h-8 w-px bg-black/10" />
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">Amount</p>
                    <p className="text-xs font-black text-orange-600">₹{order.totalAmount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 border ${
                    order.status === 'PENDING' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                    order.status === 'CONFIRMED' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    order.status === 'SHIPPED' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                    order.status === 'DELIVERED' ? 'bg-green-50 text-green-600 border-green-100' :
                    'bg-red-50 text-red-600 border-red-100'
                  }`}>
                    {statusIcons[order.status]}
                    {statusLabels[order.status]}
                  </div>

                  <select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                    disabled={updating === order.id}
                    className="bg-white border border-black/10 rounded-lg text-[10px] font-bold px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    {Object.keys(statusLabels).map(s => (
                      <option key={s} value={s}>{statusLabels[s]}</option>
                    ))}
                  </select>
                  {updating === order.id && <Loader2 className="w-3 h-3 animate-spin" />}
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* User & Address */}
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <User className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">Customer</p>
                      <p className="text-xs font-black">{order.user.name}</p>
                      <p className="text-[10px] text-gray-500 truncate">{order.user.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">Shipping to</p>
                      <p className="text-xs font-black">{order.address.fullName}</p>
                      <p className="text-[10px] text-gray-500 leading-tight">
                        {order.address.street}, {order.address.city}, {order.address.state} {order.address.pincode}
                      </p>
                      <p className="text-[10px] font-bold mt-1">📞 {order.address.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="md:col-span-2">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-3">Order Items</p>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-2 rounded-xl">
                        <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden border border-black/5 shrink-0">
                          <Image src={item.cloth.image} alt={item.cloth.name} fill className="object-contain p-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[10px] font-black uppercase truncate">{item.cloth.name}</h4>
                          <p className="text-[9px] text-gray-500 font-bold">
                            SIZE: {item.size} • QTY: {item.quantity} • PRICE: ₹{item.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-black">₹{(item.quantity * item.price).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
