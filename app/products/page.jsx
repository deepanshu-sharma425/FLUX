import { prisma } from "../../lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.cloth.findMany();
  console.log(products);

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "24px" }}>
        All Products
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "24px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #eee",
              padding: "16px",
              borderRadius: "12px",
              background: "#fafafa",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              style={{
                width: "100%",
                height: "260px",
                objectFit: "cover",
                borderRadius: "8px",
                background: "#f0f0f0",
              }}
            />
            <h3 style={{ marginTop: "12px", fontSize: "18px" }}>
              {product.name}
            </h3>

            <p style={{ fontSize: "14px", opacity: 0.7 }}>
              {product.category}
            </p>

            <p style={{ fontWeight: "600", marginTop: "6px" }}>
              ₹{product.finalPrice}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
