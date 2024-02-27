import React, { FC, useState, useEffect } from "react";
import { Header } from "@/components/layouts/Header";
import { List, ListItem, Card } from "@material-tailwind/react";
import Image from "next/image";
import {
  LightBulbIcon,
  PencilSquareIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { fetchStockCodes } from "@/utils/logics/stockCode";
import { SUGGESTION_LENGTH } from "@/constants";
import { StockSearchSuggestion } from "@/types/stockCode";

export const Top: FC = () => {
  const [inputValue, setInputValue] = useState(""); // 入力値の状態
  const [filteredStockSearchSuggestions, setFilteredStockSearchSuggestions] =
    useState<StockSearchSuggestion[]>([]); // フィルタリングされた提案の状態
  const [suggestions, setStockSearchSuggestions] = useState<
    StockSearchSuggestion[]
  >([]); // サーバーから取得した提案のリスト

  // コンポーネントがマウントされた時にデータをフェッチする
  useEffect(() => {
    fetchStockCodes()
      .then(setStockSearchSuggestions)
      .catch((error) => console.error("Fetching suggestions failed:", error));
  }, []);

  const normalizeString = (str: String) => {
    // 全角英数字を半角に変換し、英字を小文字にする
    const halfWidth = str
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) =>
        String.fromCharCode(s.charCodeAt(0) - 0xfee0)
      )
      .toLowerCase();
    // カタカナをひらがなに変換
    const hiragana = halfWidth.replace(/[\u30a1-\u30f6]/g, (match) =>
      String.fromCharCode(match.charCodeAt(0) - 0x60)
    );
    return hiragana;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const normalizedValue = normalizeString(value); // 入力値を正規化
    setInputValue(value);

    if (normalizedValue) {
      const filtered = suggestions.filter((suggestion: StockSearchSuggestion) =>
        normalizeString(suggestion.display).includes(normalizedValue)
      );
      setFilteredStockSearchSuggestions(filtered);
    } else {
      setFilteredStockSearchSuggestions([]);
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="p-3 pt-10 max-w-3xl mx-auto">
          <h2 className="font-bold text-2xl leading-loose">
            みんなの意見で
            <br />
            株のセンスを身につける
          </h2>
        </div>
        <div className="p-3 mt-5 h-64 max-w-3xl mx-auto min-height">
          <div>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="銘柄コードまたは会社名で検索"
              className="bg-white border rounded-lg border-gray-400 border-solid p-3 block w-full text-gray-800 text-sm"
            />
            <div className={`fixed top-0 left-0 w-full h-screen z-[-1]`}>
              <Image
                src="/images/bg.jpg"
                layout="fill"
                objectFit="cover"
                className="opacity-20 "
                alt=""
              />
            </div>
          </div>
          {filteredStockSearchSuggestions.length > 0 && (
            <div className="relative">
              <Card className="absolute w-full mt-2 max-h-64 overflow-hidden overflow-y-scroll z-10">
                <List>
                  {filteredStockSearchSuggestions
                    .slice(0, SUGGESTION_LENGTH)
                    .map((suggestion, index) => (
                      <ListItem
                        key={index}
                        className="p-0 cursor-pointer hover:bg-gray-200"
                      >
                        <Link
                          href={`/company/${suggestion.id}`}
                          className="block w-full p-3"
                        >
                          {suggestion.display}
                        </Link>
                      </ListItem>
                    ))}
                </List>
              </Card>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 bg-yellow-700 text-white px-3 py-10 bottom-0 w-full">
          <ul className="mx-auto max-w-3xl">
            <li className="flex items-center gap-2">
              <p className="flex item-center">
                <LightBulbIcon className="h-6 w-6" />
              </p>
              センスのあるレビューを見つける
            </li>
            <li className="flex items-center gap-2 mt-4">
              <p className="flex item-center">
                <PencilSquareIcon className="h-6 w-6" />
              </p>
              レビューを投稿してセンスを磨く
            </li>
            <li className="flex items-center gap-2 mt-4">
              <p className="flex item-center">
                <ChatBubbleLeftRightIcon className="h-6 w-6" />
              </p>
              レビューをディスカッションする
            </li>
          </ul>
        </div>
      </main>
    </>
  );
};
