import React from "react";
import Navbar from "@/Components/Navbar";
import { getUserOrders } from "@/actions/order";
import { Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const statusIcons = {
  PENDING: <Clock className="w-4 h-4 text-orange-500" />,
  CONFIRMED: <CheckCircle className="w-4 h-4 text-blue-500" />,
  SHIPPED: <Truck className="w-4 h-4 text-purple-500" />,
  DELIVERED: <CheckCircle className="w-4 h-4 text-green-500" />,
  CANCELLED: <XCircle className="w-4 h-4 text-red-500" />,
};

const statusColors = {
  PENDING: "bg-orange-100 text-orange-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default async function OrdersPage() {
  const orders = await getUserOrders();

  return (
    <>
      <Navbar />
      <div className="h-24" />
      <section className="min-h-screen bg-[#f6ecdf] px-6 pt-10 pb-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-wide mb-8">
            My Orders
          </h1>

          {orders.length === 0 ? (
            <div className="text-center py-20 bg-[#f2efe9] rounded-2xl shadow-sm">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 mb-6">You haven&apos;t placed any orders yet.</p>
              <Link
                href="/AllCloth"
                className="inline-flex items-center justify-center px-8 py-3 bg-black text-white rounded-full font-bold text-sm hover:bg-[#FF8A00] transition"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#f2efe9] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-6 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                        Order ID: {order.id.slice(0, 8)}...
                      </p>
                      <p className="text-sm text-gray-700 font-semibold">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">
                          Total Amount
                        </p>
                        <p className="text-lg font-bold">₹{order.totalAmount}</p>
                      </div>
                      
                      <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${statusColors[order.status]}`}>
                        {statusIcons[order.status]}
                        {order.status}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-100">
                            <Image
                              src={item.cloth.image}
                              alt={item.cloth.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-bold uppercase tracking-wide">
                              {item.cloth.name}
                            </h3>
                            <p className="text-xs text-gray-600 mt-1">
                              Size: <span className="font-semibold">{item.size}</span> · 
                              Qty: <span className="font-semibold">{item.quantity}</span>
                            </p>
                            <p className="text-sm font-bold mt-2">₹{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">
                            Delivery Address
                          </p>
                          <p className="text-sm text-gray-800">
                            {order.address.fullName}, {order.address.street}, {order.address.city}, {order.address.state} {order.address.pincode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function MapPin(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
