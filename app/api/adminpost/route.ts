export const runtime = "nodejs";

import { prisma } from "../../../lib/prisma";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      category,
      description,
      sizes,
      price,
      discount,
      finalPrice,
      image,
      color,
      sex,
      about,
      material,
      fit,
      adminEmail,
    } = body;
    // if (
    //   !adminEmail ||
    //   adminEmail.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()
    // ) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }
    if (
      !name ||
      !category ||
      !description ||
      !sizes ||
      sizes.length === 0 ||
      price === undefined ||
      discount === undefined ||
      finalPrice === undefined ||
      !image ||
      !color ||
      !sex ||
      !about
    ) {
      return NextResponse.json(
        { message: "All fields are mandatory" },
        { status: 400 }
      );
    }
    const newCloth = await prisma.cloth.create({
      data: {
        name,
        category,
        description,
        sizes,
        price,
        discount,
        finalPrice,
        image,
        color,
        sex, 
        about,
        details: material && fit ? {
          create: {
            material,
            fit,
          },
        } : undefined,
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
