import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";

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

    return NextResponse.json(
      { message: "Collection is deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[collectionId_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
