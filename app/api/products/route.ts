import Product from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // const userId = {}

    // if(!userId) {
    //     return new NextResponse("Unauthorized", { status : 401 })
    // }

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enoughg data to create a product", {
        status: 400,
      });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    });

    await newProduct.save();

    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.log("[products_post]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
