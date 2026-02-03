"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Barcode } from "@/components/ui/barcode";
import type { BasePathProps } from "@/types/navigation";

export function TemporaryHomeContent({ basePath }: BasePathProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [points, setPoints] = useState(500);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setPoints((prev) => prev + 100);
      setIsRefreshing(false);
    }, 800);
  };

  const memberNumber = "4912345678901";

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

      <div className="p-4 space-y-3">
        {/* 仮会員証カード */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gray-100 border-gray-300">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="gray" className="font-bold">
                仮会員
              </Badge>
            </div>

            {/* バーコード表示エリア */}
            <div className="bg-white rounded-xl p-4 mb-4">
              <div className="flex flex-col items-center">
                {/* Code-128形式バーコード */}
                <Barcode
                  value={memberNumber}
                  format="CODE128"
                  width={2}
                  height={60}
                  displayValue={false}
                  className="w-full max-w-[250px]"
                />
                <span className="text-sm font-mono text-gray-600 tracking-wider mt-2">
                  {memberNumber}
                </span>
              </div>
            </div>

            {/* ポイント表示 */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">保有ポイント</p>
              <motion.p
                key={points}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-3xl font-bold text-gray-700"
              >
                {points.toLocaleString()}
                <span className="text-lg font-normal ml-1">pt</span>
              </motion.p>
              <p className="text-xs text-amber-600 mt-2 font-medium">
                ※ ポイントを使うには本会員登録が必要です
              </p>
            </div>
          </Card>
        </motion.div>

        {/* 機能説明 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card elevation="flat">
            <h3 className="font-bold text-gray-800 mb-3">仮会員でできること</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-800">お買い物でポイントが貯まる</p>
              </div>
              <div className="border-t pt-3">
                <p className="text-xs text-gray-400 mb-2">本会員登録が必要</p>
                <ul className="space-y-1 pl-0">
                  <li className="text-sm text-gray-500">・ポイントを使う</li>
                  <li className="text-sm text-gray-500">・クーポン利用</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 本会員登録ボタン */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-2">
            <Button
              size="lg"
              className="w-full"
              onClick={() => router.push(`${basePath}/register`)}
            >
              本会員登録して特典を受け取る
            </Button>
            <p className="text-xs text-center text-gray-500">
              登録後すぐに500円OFFクーポンがもらえます
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
