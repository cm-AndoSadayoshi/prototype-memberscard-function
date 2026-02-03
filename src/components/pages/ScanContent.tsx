"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Camera, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BasePathProps } from "@/types/navigation";

export function ScanContent({ basePath }: BasePathProps) {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setTimeout(() => {
        router.push(`${basePath}/temporary-home`);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-full bg-black flex flex-col">
      {/* ヘッダー */}
      <div className="p-4">
        <h1 className="text-white text-lg font-bold text-center">
          QRコード読み取り
        </h1>
        <p className="text-white/60 text-sm text-center mt-1">
          店頭のQRコードを読み取ってください
        </p>
      </div>

      {/* カメラプレビューエリア */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative">
          {/* スキャンフレーム */}
          <motion.div
            className="w-64 h-64 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {/* コーナーマーク */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#06C755] rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#06C755] rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#06C755] rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#06C755] rounded-br-lg" />

            {/* スキャンライン */}
            {isScanning && (
              <motion.div
                className="absolute left-2 right-2 h-0.5 bg-[#06C755]"
                initial={{ top: "10%" }}
                animate={{ top: ["10%", "90%", "10%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* 完了アイコン */}
            {scanComplete && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <div className="bg-[#06C755] rounded-full p-4">
                  <CheckCircle2 className="w-16 h-16 text-white" />
                </div>
              </motion.div>
            )}

            {/* カメラアイコン(初期状態) */}
            {!isScanning && !scanComplete && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-16 h-16 text-white/30" />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* 下部エリア */}
      <div className="p-6 space-y-4">
        {scanComplete ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-[#06C755] font-bold text-lg">読み取り完了!</p>
            <p className="text-white/60 text-sm mt-1">
              仮会員証を発行しています...
            </p>
          </motion.div>
        ) : (
          <>
            <Button
              size="lg"
              onClick={handleScan}
              disabled={isScanning}
              className="w-full"
            >
              {isScanning ? "読み取り中..." : "QRコードをスキャン"}
            </Button>
            <p className="text-white/40 text-xs text-center">
              ※ デモ用のシミュレーションです
            </p>
          </>
        )}
      </div>
    </div>
  );
}
