"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Ticket, RefreshCw, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function HomePage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [points, setPoints] = useState(2500);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setPoints((prev) => prev + 150);
      setIsRefreshing(false);
    }, 800);
  };

  const memberNumber = "4912345678901";
  const currentRank = "ゴールド";
  const nextRank = "プラチナ";
  const rankProgress = 65;
  const pointsToNextRank = 3500;

  return (
    <div className="min-h-full bg-gray-50 pb-6">
      {/* ヘッダー */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b">
        <h1 className="font-bold text-gray-800">デジタル会員証</h1>
        <button
          onClick={handleRefresh}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          disabled={isRefreshing}
        >
          <RefreshCw
            className={`w-5 h-5 text-gray-500 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* 本会員証カード */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card
            className="border-2 border-amber-200"
            style={{
              background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="gold" className="font-bold">
                  <Crown className="w-3 h-3 mr-1" />
                  本会員
                </Badge>
                <Badge variant="gold" size="sm">
                  {currentRank}
                </Badge>
              </div>
              <span className="text-xs text-gray-500">会員番号</span>
            </div>

            {/* バーコード表示エリア */}
            <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <div className="flex flex-col items-center">
                {/* バーコードのシミュレーション */}
                <div className="w-full h-16 flex items-center justify-center gap-0.5 mb-2">
                  {memberNumber.split("").map((_, i) => (
                    <div
                      key={i}
                      className="h-full bg-black"
                      style={{
                        width: `${Math.random() * 2 + 1}px`,
                        marginRight: `${Math.random() * 2 + 1}px`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm font-mono text-gray-600 tracking-wider">
                  {memberNumber}
                </span>
              </div>
            </div>

            {/* ポイント表示 */}
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500 mb-1">保有ポイント</p>
              <motion.p
                key={points}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-4xl font-bold text-amber-700"
              >
                {points.toLocaleString()}
                <span className="text-lg font-normal ml-1">pt</span>
              </motion.p>
              <p className="text-xs text-green-600 mt-1 font-medium">
                ポイントを貯める・使う
              </p>
            </div>

            {/* ランク進捗 */}
            <div className="bg-white/60 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">
                  次のランク: {nextRank}
                </span>
                <span className="text-xs text-amber-600 font-medium">
                  あと{(pointsToNextRank - points).toLocaleString()}pt
                </span>
              </div>
              <Progress value={rankProgress} color="#F59E0B" size="md" />
            </div>
          </Card>
        </motion.div>

        {/* クーポン */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)",
                }}
              >
                <Ticket className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">保有クーポン</p>
                <p className="text-sm text-gray-500">
                  <span className="text-[#FF6B35] font-bold">1枚</span> 利用可能
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            {/* クーポン詳細 */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between bg-orange-50 rounded-lg p-3">
                <div>
                  <p className="font-bold text-[#FF6B35]">500円OFF</p>
                  <p className="text-xs text-gray-500">有効期限: 30日後まで</p>
                </div>
                <Badge variant="warning" size="sm">
                  未使用
                </Badge>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 本会員でできること */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3 className="font-bold text-gray-800 mb-3">本会員の特典</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
                <span className="text-sm text-gray-600">
                  お買い物でポイントが貯まる
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
                <span className="text-sm text-gray-600">
                  ポイントを使ってお得にお買い物
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
                <span className="text-sm text-gray-600">
                  会員限定クーポンをGET
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
                <span className="text-sm text-gray-600">
                  ランクアップでさらにお得に
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
