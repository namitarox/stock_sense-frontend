import { client } from "@/utils/api";
import { StockCode, StockSearchSuggestion } from "@/types/stockCode";

// StockSearchSuggestionオブジェクトの配列をフェッチする
export const fetchStockCodes = async (): Promise<StockSearchSuggestion[]> => {
  try {
    const response = await client.get<StockCode[]>("/api/v1/stock_codes");
    const suggestions = response.data.map((item) => ({
      id: item.id,
      display: `${item.id} : ${item.name}`,
    }));
    return suggestions;
  } catch (error) {
    console.error("Fetching Stock codes failed:", error);
    throw error; // 適切なエラーハンドリングを行う
  }
};

// 特定のcodeを持つStockCodeオブジェクトをフェッチする
export const fetchStockCode = async (id: string): Promise<StockCode> => {
  try {
    const response = await client.get<StockCode>(`/api/v1/stock_codes/${id}`);
    return response.data; // response.dataがStockCode型と一致することを確認
  } catch (error) {
    console.error("Fetching Stock code failed:", error);
    throw error; // 適切なエラーハンドリングを行う
  }
};
