import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";

import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectToDB();

    const collection = await Collection.findById(params.collectionId).populate({
      path: "products",
      model: Product,
    });

    if (!collection) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("[collectionId_GET]", error);
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    // const userId = "a1ac5ddsd78b9c9c4";

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 403 });
    // }

    await connectToDB();

    let collection = await Collection.findById(params.collectionId);

    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    collection = await Collection.findByIdAndUpdate(
      params.collectionId,
      { title, description, image },
      { new: true }
    );

    await collection.save();

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("[collectionId_POST]", error);
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    // const userId = "a1ac5ddsd78b9c9c4";

    // if (!userId) {
    //     return new NextResponse("Unauthorized", { status: 403 });
    // }

    await connectToDB();

    await Collection.findByIdAndDelete(params.collectionId);

    await Product.updateMany(
      { collections: params.collectionId },
      { $pull: { collections: params.collectionId } }
    );

    return NextResponse.json(
      { message: "Collection is deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[collectionId_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
