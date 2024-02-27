import React, { FC, useEffect } from "react";
import { Header } from "@/components/layouts/Header";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Firebaseの設定をインポート（適宜変更してください）
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";

export const MyPage: FC = () => {
  const router = useRouter();
  const hundleSignOut = () => {
    signOut(auth).then(() => {
      router.push("/sign_in");
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // ユーザーがログインしている場合、マイページにリダイレクト
        router.push("/sign_in");
      }
    });
    return () => unsubscribe();
  }, [router]);
  return (
    <>
      <Header />
      <main>
        <p className="cursor-pointer" onClick={() => hundleSignOut()}>
          サインアウト
        </p>
      </main>
    </>
  );
};
