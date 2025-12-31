"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Gift, Ticket, PartyPopper } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "complete">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthday: "",
    agree: false,
  });

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setStep("complete");
      setIsSubmitting(false);
    }, 1500);
  };

  const isFormValid =
    formData.name && formData.phone && formData.birthday && formData.agree;

  return (
    <div className="min-h-full bg-gray-50">
      <AnimatePresence mode="wait">
        {step === "form" ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* ヘッダー */}
            <div className="bg-white px-4 py-3 flex items-center gap-3 border-b">
              <button
                onClick={() => router.push("/demo/temporary-home")}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="font-bold text-gray-800">本会員登録</h1>
            </div>

            <div className="p-4 space-y-4">
              {/* 特典バナー */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card
                  className="border-2 border-[#FF6B35]/20"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#FF6B35] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-[#FF6B35]">登録完了特典</p>
                      <p className="text-sm text-gray-600">
                        <span className="font-bold text-lg text-[#FF6B35]">
                          500円OFF
                        </span>{" "}
                        クーポンプレゼント！
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* 登録フォーム */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <h3 className="font-bold text-gray-800 mb-4">
                    会員情報を入力
                  </h3>
                  <div className="space-y-4">
                    <Input
                      label="お名前"
                      placeholder="山田 太郎"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <Input
                      label="電話番号"
                      type="tel"
                      placeholder="090-1234-5678"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                    <Input
                      label="生年月日"
                      type="date"
                      value={formData.birthday}
                      onChange={(e) =>
                        setFormData({ ...formData, birthday: e.target.value })
                      }
                    />

                    {/* 利用規約同意 */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agree}
                        onChange={(e) =>
                          setFormData({ ...formData, agree: e.target.checked })
                        }
                        className="w-5 h-5 mt-0.5 accent-[#06C755]"
                      />
                      <span className="text-sm text-gray-600">
                        <span className="text-[#06C755] underline">
                          利用規約
                        </span>
                        および
                        <span className="text-[#06C755] underline">
                          プライバシーポリシー
                        </span>
                        に同意します
                      </span>
                    </label>
                  </div>
                </Card>
              </motion.div>

              {/* 登録ボタン */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? "登録中..." : "本会員登録を完了する"}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-full flex flex-col"
          >
            {/* 完了画面 */}
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              {/* 紙吹雪エフェクト */}
              <div className="relative">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: ["#FF6B35", "#06C755", "#FFD700"][i % 3],
                      left: "50%",
                      top: "50%",
                    }}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos((i * 30 * Math.PI) / 180) * 100,
                      y: Math.sin((i * 30 * Math.PI) / 180) * 100 - 50,
                      opacity: 0,
                    }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                ))}

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-24 h-24 bg-[#06C755] rounded-full flex items-center justify-center"
                >
                  <PartyPopper className="w-12 h-12 text-white" />
                </motion.div>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-gray-800 mt-6"
              >
                登録完了！
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-500 mt-2 text-center"
              >
                本会員登録が完了しました
                <br />
                ポイントが使えるようになりました！
              </motion.p>

              {/* クーポンカード */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: 0.6 }}
                className="w-full mt-6"
              >
                <Card
                  className="border-2 border-dashed border-[#FF6B35]"
                  style={{
                    background:
                      "linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)",
                  }}
                >
                  <div className="text-white text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Ticket className="w-5 h-5" />
                      <span className="text-sm font-medium">登録完了特典</span>
                    </div>
                    <p className="text-4xl font-bold">500円OFF</p>
                    <p className="text-sm text-white/80 mt-2">
                      有効期限: 発行から30日間
                    </p>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="w-full mt-6"
              >
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => router.push("/demo/home")}
                >
                  会員証を確認する
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
