import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";
import {
  isSignInWithEmailLink,
  onAuthStateChanged,
  signInWithEmailLink,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import { auth, provider } from "@/lib/firebase";

export const Auth: FC = () => {
  const router = useRouter();
  const { type } = router.query;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        router.push("/mypage");
      } else {
        if (type === "googleAuth" && !user) {
          signInWithRedirect(auth, provider);
        }
        // Google認証のリダイレクト結果を処理
        getRedirectResult(auth)
          .then((result) => {
            if (result) {
              console.log(user);
            }
          })
          .catch((error) => {
            console.log("test");
            console.error("Google認証に失敗しました", error);
          });

        // メールリンク認証の処理
        if (isSignInWithEmailLink(auth, window.location.href)) {
          const emailForSignIn = window.localStorage.getItem("emailForSignIn");
          if (emailForSignIn) {
            signInWithEmailLink(auth, emailForSignIn, window.location.href)
              .then(() => {
                window.localStorage.removeItem("emailForSignIn");
                router.push("/mypage");
              })
              .catch((error) => {
                window.localStorage.removeItem("emailForSignIn");
                router.push({
                  pathname: "/sign_in",
                  query: {
                    error: encodeURIComponent(
                      "メールリンクによるログインに失敗しました"
                    ),
                  },
                });
              });
          } else {
            router.push({
              pathname: "/sign_in",
              query: {
                error: encodeURIComponent(
                  "ログインに失敗しました。同じ端末、同じブラウザでログインしてください。"
                ),
              },
            });
          }
        }
        if (!isSignInWithEmailLink(auth, window.location.href) && !type) {
          router.push("/sign_in");
        }
      }
    });
    return () => unsubscribe();
  }, [router, type]);

  return (
    <>
      <p>authentication...</p>
    </>
  );
};
