import React from "react";
import Link from "next/link";
import Navbar from "@/Components/Navbar";
import { getAddresses, deleteAddress } from "@/actions/address";
import { Trash2, Plus } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function AddressPage() {
  const addresses = await getAddresses();

  async function handleDelete(id) {
    "use server";
    await deleteAddress(id);
    revalidatePath("/Account/Address");
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#f6ecdf] px-4 sm:px-6 pt-20 sm:pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold tracking-wide">
              My Addresses
            </h1>
            <Link
              href="/Account/Address/Add"
              className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full font-medium text-sm hover:bg-[#FF8A00] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New
            </Link>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center py-20 bg-[#f2efe9] rounded-2xl">
              <p className="text-gray-500 mb-4">No addresses found.</p>
              <Link
                href="/Account/Address/Add"
                className="text-black font-semibold underline hover:text-[#FF8A00]"
              >
                Add your first address
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-[#f2efe9] p-6 rounded-2xl relative group hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <form action={handleDelete.bind(null, addr.id)}>
                      <button
                        type="submit"
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>

                  <h3 className="font-bold text-lg mb-1">{addr.fullName}</h3>
                  <p className="text-sm text-gray-600 mb-4">{addr.phone}</p>
                  
                  <div className="text-sm text-gray-800 space-y-1">
                    <p>{addr.street}</p>
                    <p>
                      {addr.city}, {addr.state} {addr.pincode}
                    </p>
                    <p>{addr.country}</p>
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
