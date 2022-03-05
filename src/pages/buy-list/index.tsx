import * as React from "react";
import { VFC } from "react";
import dynamic from "next/dynamic";

const BuyListContents = dynamic(
  () => import("@/pages/buy-list/BuyListContents"),
  {
    ssr: false,
  },
);

const BuyList: VFC = () => {
  return <BuyListContents />;
};

export default BuyList;
