"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Gift, Ticket, PartyPopper, X, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// プロフィールデータ
const profiles = [
  { id: 1, name: "田中 美咲", phone: "080-1111-2222", birthday: "1988-07-10" },
  { id: 2, name: "鈴木 健太", phone: "090-3333-4444", birthday: "1992-12-25" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "complete">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProfile(null);
  };

  const handleSelectProfile = (profileId: number) => {
    setSelectedProfile(profileId);
  };

  const handleAutoFill = () => {
    if (selectedProfile) {
      const profile = profiles.find((p) => p.id === selectedProfile);
      if (profile) {
        setFormData({
          ...formData,
          name: profile.name,
          phone: profile.phone,
          birthday: profile.birthday,
        });
      }
    }
    closeModal();
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
                  {/* Account Center 自動入力ボタン */}
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={openModal}
                      className="w-full flex items-center justify-between bg-gray-900 text-white rounded-full px-5 py-3 hover:bg-gray-800 transition-colors"
                    >
                      <span className="font-medium tracking-wide">account center</span>
                      <span className="bg-white text-gray-900 text-sm font-medium px-3 py-1 rounded-full">
                        自動入力
                      </span>
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      LINEやYahoo! JAPANの登録情報を自動で入力できます。
                    </p>
                  </div>

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

      {/* ハーフモーダル（ボトムシート） */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* オーバーレイ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/50 z-40"
            />

            {/* モーダル本体 */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[80%] overflow-hidden"
            >
              {/* モーダルヘッダー */}
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <h3 className="font-bold text-gray-900">account center</h3>
                <button
                  onClick={closeModal}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* モーダルコンテンツ */}
              <div className="p-5">
                <h4 className="text-lg font-bold text-gray-900 mb-1">
                  クイック入力機能を使って
                </h4>
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  自動で入力しますか？
                </h4>
                <p className="text-sm text-gray-500 mb-6">
                  アカウントセンターで管理するLINEやYahoo!JAPAN
                  のプロフィール情報を利用した機能です。
                </p>

                {/* プロフィール選択 */}
                <div className="border rounded-xl overflow-hidden mb-4">
                  {profiles.map((profile, index) => (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => handleSelectProfile(profile.id)}
                      className={`w-full flex items-center justify-between px-4 py-4 hover:bg-gray-100 transition-colors ${
                        index !== profiles.length - 1 ? "border-b" : ""
                      } ${selectedProfile === profile.id ? "bg-gray-200" : ""}`}
                    >
                      <span className={`font-medium ${
                        selectedProfile === profile.id
                          ? "text-gray-900"
                          : "text-gray-800"
                      }`}>
                        {profile.name}
                      </span>
                      <ChevronRight
                        className={`w-5 h-5 ${
                          selectedProfile === profile.id
                            ? "text-gray-900"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <p className="text-xs text-gray-400 mb-6">
                  ※プロフィールの各項目を選択するか、LINEの設定＞アカウントセンター
                  ＞共通プロフィールから変更できます。
                </p>

                {/* 自動入力ボタン */}
                <button
                  type="button"
                  onClick={handleAutoFill}
                  disabled={!selectedProfile}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-colors ${
                    selectedProfile
                      ? "bg-gray-900 hover:bg-gray-800"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  自動で入力する
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
