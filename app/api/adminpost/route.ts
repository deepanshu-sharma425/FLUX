export const runtime = "nodejs";

import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

const VALID_SEX = ["Male", "Female", "Unisex"];

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let {
      name,
      category,
      description,
      sizes,
      price,
      discount,
      image,
      color,
      sex,
      about,
      material,
      fit,
    } = body;

    // 🔒 BASIC VALIDATION
    if (
      !name ||
      !category ||
      !description ||
      !image ||
      !color ||
      !sex ||
      !about ||
      price === undefined ||
      discount === undefined
    ) {
      return NextResponse.json(
        { message: "All fields are mandatory" },
        { status: 400 }
      );
    }

    // ✅ Validate enum
    if (!VALID_SEX.includes(sex)) {
      return NextResponse.json(
        { message: "Invalid sex value" },
        { status: 400 }
      );
    }

    // ✅ Normalize sizes
    if (typeof sizes === "string") {
      sizes = sizes.split(",").map((s: string) => s.trim());
    }

    if (!Array.isArray(sizes) || sizes.length === 0) {
      return NextResponse.json(
        { message: "Sizes must be a non-empty array" },
        { status: 400 }
      );
    }

    // ✅ Normalize numbers
    price = Number(price);
    discount = Number(discount);

    if (isNaN(price) || isNaN(discount)) {
      return NextResponse.json(
        { message: "Price and discount must be numbers" },
        { status: 400 }
      );
    }

    if (price < 0 || discount < 0 || discount > 100) {
      return NextResponse.json(
        { message: "Invalid price or discount" },
        { status: 400 }
      );
    }

    // 🧮 Calculate final price in backend
    const finalPrice = Math.round(price - (price * discount) / 100);

    // ✅ CREATE CLOTH
    const newCloth = await prisma.cloth.create({
      data: {
        name: name.trim(),
        category: category.trim(),
        description: description.trim(),
        sizes,
        price,
        discount,
        finalPrice,
        image,
        color,
        sex,
        about,
        details:
          material && fit
            ? {
                create: {
                  material: material.trim(),
                  fit: fit.trim(),
                },
              }
            : undefined,
      },
    });

    return NextResponse.json(
      { message: "Cloth created successfully", newCloth },
      { status: 201 }
    );
  } catch (error) {
    console.error("ADMIN POST ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
