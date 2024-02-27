import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router"; // Next.jsのルーターフックをインポート
import { Header } from "@/components/layouts/Header";
import { fetchStockCode } from "@/utils/logics/stockCode";
import { StockCode } from "@/types/stockCode";

export const Company: FC = () => {
  const router = useRouter();
  const { id } = router.query; // URLからcodeパラメータを取得
  const [stockCode, setStockCode] = useState<StockCode | null>(null);
  useEffect(() => {
    if (typeof id === "string") {
      // codeがstring型であることを確認
      fetchStockCode(id)
        .then(setStockCode)
        .catch((error) => console.error("Fetching Stock code failed:", error));
    }
  }, [id]);

  return (
    <>
      <Header />
      <main>
        {stockCode ? (
          <div>
            <h1>{stockCode.name}</h1>
            <p>Code: {stockCode.id}</p>
            <p>Market: {stockCode.market}</p>
            <p>Category: {stockCode.category}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </>
  );
};
