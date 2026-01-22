const products = [
  {
    id: 1,
    name: "Flux Core Hoodie",
    category: "Hoodies",
    description: "Premium heavyweight hoodie built for urban winters.",
    sizes: ["S", "M", "L", "XL"],
    price: 3499,
    discount: 20,
    finalPrice: 2799,
    image: "/Asset/hoddie1.png",
    details: {
      material: "Cotton Fleece",
      fit: "Regular",
      color: "Black"
    }
  },
  {
    id: 2,
    name: "Flux Shadow Hoodie",
    category: "Hoodies",
    description: "Minimal hoodie with bold Flux branding.",
    sizes: ["M", "L", "XL"],
    price: 3299,
    discount: 15,
    finalPrice: 2804,
    image: "/Asset/hoodie2.png",
    details: {
      material: "Cotton Blend",
      fit: "Oversized",
      color: "Charcoal"
    }
  },
  {
    id: 3,
    name: "Flux Urban Hoodie",
    category: "Hoodies",
    description: "Street-ready hoodie with a soft interior.",
    sizes: ["S", "M", "L"],
    price: 3199,
    discount: 10,
    finalPrice: 2879,
    image: "/Asset/hoodie3.png",
    details: {
      material: "French Terry",
      fit: "Regular",
      color: "Olive"
    }
  },

  // 👕 T-SHIRTS
  {
    id: 4,
    name: "Flux Essential Tee",
    category: "T-Shirts",
    description: "Everyday tee with breathable fabric.",
    sizes: ["S", "M", "L", "XL"],
    price: 1499,
    discount: 20,
    finalPrice: 1199,
    image: "/Asset/flux-tee-1.png",
    details: {
      material: "100% Cotton",
      fit: "Slim",
      color: "White"
    }
  },
  {
    id: 5,
    name: "Flux Street Tee",
    category: "T-Shirts",
    description: "Urban graphic tee with bold typography.",
    sizes: ["M", "L", "XL"],
    price: 1699,
    discount: 15,
    finalPrice: 1444,
    image: "/Asset/flux-tee-2.png",
    details: {
      material: "Cotton Jersey",
      fit: "Regular",
      color: "Black"
    }
  },

  // 👖 JOGGERS
  {
    id: 6,
    name: "Flux Motion Joggers",
    category: "Joggers",
    description: "Flexible joggers designed for movement.",
    sizes: ["S", "M", "L", "XL"],
    price: 2999,
    discount: 20,
    finalPrice: 2399,
    image: "/Asset/flux-jogger-1.png",
    details: {
      material: "Poly Cotton",
      fit: "Tapered",
      color: "Black"
    }
  },
  {
    id: 7,
    name: "Flux Urban Joggers",
    category: "Joggers",
    description: "Everyday joggers with zipper pockets.",
    sizes: ["M", "L", "XL"],
    price: 2799,
    discount: 10,
    finalPrice: 2519,
    image: "/Asset/flux-jogger-2.png",
    details: {
      material: "Cotton Blend",
      fit: "Regular",
      color: "Grey"
    }
  },


  {
    id: 8,
    name: "Flux Snapback Cap",
    category: "Caps",
    description: "Classic snapback with embroidered logo.",
    sizes: ["Free Size"],
    price: 1299,
    discount: 15,
    finalPrice: 1104,
    image: "/Asset/flux-cap-1.png",
    details: {
      material: "Canvas",
      fit: "Adjustable",
      color: "Black"
    }
  },
  {
    id: 9,
    name: "Flux Urban Cap",
    category: "Caps",
    description: "Minimal cap for daily wear.",
    sizes: ["Free Size"],
    price: 1199,
    discount: 10,
    finalPrice: 1079,
    image: "/Asset/flux-cap-2.png",
    details: {
      material: "Cotton",
      fit: "Adjustable",
      color: "Beige"
    }
  },

 
  {
    id: 10,
    name: "Flux Street Sneakers",
    category: "Footwear",
    description: "Lightweight sneakers for everyday comfort.",
    sizes: ["7", "8", "9", "10", "11"],
    price: 4999,
    discount: 25,
    finalPrice: 3749,
    image: "/Asset/flux-shoes-1.png",
    details: {
      material: "Mesh + Rubber",
      fit: "Standard",
      color: "White"
    }
  },


  {
    id: 11,
    name: "Flux Utility Backpack",
    category: "Accessories",
    description: "Spacious backpack for urban travel.",
    sizes: ["Free Size"],
    price: 3499,
    discount: 20,
    finalPrice: 2799,
    image: "/Asset/flux-bag-1.png",
    details: {
      material: "Nylon",
      capacity: "22L",
      color: "Black"
    }
  }
];

export default products;
