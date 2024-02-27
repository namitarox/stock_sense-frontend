import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase"; // Firebaseの設定をインポート（適宜変更してください）
import { Button, Input } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { sendSignInLinkToEmail, onAuthStateChanged } from "firebase/auth";
import { Logo } from "@/components/ui/Logo";
import { toast } from "react-toastify";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { error } = router.query;

  useEffect(() => {
    if (error) {
      const errorMessage =
        typeof error === "string" ? decodeURIComponent(error) : error[0];
      toast.error(decodeURIComponent(errorMessage));
    }
  }, [error]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ユーザーがログインしている場合、マイページにリダイレクト
        router.push("/mypage");
      }
    });
    return () => unsubscribe();
  }, [router]);
  const handleGoogleLogin = async () => {
    router.push({
      pathname: "/auth",
      query: {
        type: "googleAuth",
      },
    });
  };

  const handleMailLogin = () => {
    if (!email) {
      toast.error("メールアドレスが入力されていません。");
      return;
    }
    handleSendSignInLinkToEmail(email);
  };

  const handleSendSignInLinkToEmail = async (email: string) => {
    const actionCodeSettings = {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth`, // リダイレクト先のURL
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      toast.success("ログインリンクをメールに送信しました。");
    } catch (error) {
      toast.error("ログインリンクの送信に失敗しました");
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen min-w-xs p-3">
      <section className="w-full max-w-sm">
        <Logo />
        <div className="p-4 bg-white rounded-lg border mt-6">
          <header className="text-center">
            <h2 className="text-md font-bold mt-4">ログイン</h2>
          </header>
          <div className="mt-6 grid grid-cols-1 gap-3">
            <Button
              size="md"
              variant="outlined"
              className="flex items-center justify-center border-gray-300 gap-3 focus:ring-transparent"
              onClick={handleGoogleLogin}
            >
              <Image
                src="https://docs.material-tailwind.com/icons/google.svg"
                alt="Googleでログイン"
                width={24}
                height={24}
              />
              Googleでログイン
            </Button>
          </div>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">または</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <form method="POST" className="space-y-4">
              <Input
                label="メールアドレス"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                size="md"
                variant="outlined"
                className="w-full gap-1 text-white center bg-yellow-800 border-transparent focus:ring-transparent"
                onClick={handleMailLogin}
              >
                メールリンクでログイン
              </Button>
            </form>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm">
              アカウントをお持ちでない方は
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                こちら
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
