"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Gift, ChevronRight, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Barcode } from "@/components/ui/barcode";

export default function TemporaryHomePage() {
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

      <div className="p-4 space-y-4">
        {/* 仮会員証カード */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300">
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

        {/* 本会員登録バナー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Card
              className="cursor-pointer border-2 border-[#FF6B35]/30"
              style={{
                background: "linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)",
              }}
              onClick={() => router.push("/demo/register")}
            >
              <div className="flex items-center gap-4 text-white">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Gift className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg">今すぐ本会員登録で</p>
                  <p className="text-white/90 text-sm">
                    <span className="font-bold text-xl">500円OFF</span>{" "}
                    クーポンをGET！
                  </p>
                </div>
                <ChevronRight className="w-6 h-6 text-white/60" />
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* 機能説明 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3 className="font-bold text-gray-800 mb-3">仮会員でできること</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">○</span>
                </div>
                <span className="text-sm text-gray-600">
                  お買い物でポイントが貯まる
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-500 text-lg">×</span>
                </div>
                <span className="text-sm text-gray-600">
                  ポイントを使う（本会員登録が必要）
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-500 text-lg">×</span>
                </div>
                <span className="text-sm text-gray-600">
                  クーポン利用（本会員登録が必要）
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 本会員登録ボタン */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            size="lg"
            className="w-full"
            onClick={() => router.push("/demo/register")}
          >
            本会員登録してポイントを使う
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
