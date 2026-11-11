"use client";

import { GrowthSceneProps } from "../types";
import dynamic from "next/dynamic";

// three.js is the heaviest code on the page: load it after the copy is
// interactive instead of in the first bundle. The ink ground shows meanwhile.
const GrowthScene = dynamic(() => import("../growth-scene"), { ssr: false });

function LazyGrowthScene(props: GrowthSceneProps) {
  return <GrowthScene {...props} />;
}

export default LazyGrowthScene;
