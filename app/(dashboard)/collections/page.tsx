"use client";

import { useEffect, useState } from "react";

const Collections = () => {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.log("[getCollections]", error);
    }
  };

  console.log("collections", collections);

  useEffect(() => {
    getCollections();
  }, []);
  return <div>Collection</div>;
};

export default Collections;
