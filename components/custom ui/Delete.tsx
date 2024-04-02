import React from "react";
import { LuTrash } from "react-icons/lu";

import { Button } from "../ui/button";

const Delete = () => {
  return (
    <Button className="bg-red-1 text-white">
      <LuTrash className="h-4 w-4" />
    </Button>
  );
};

export default Delete;
