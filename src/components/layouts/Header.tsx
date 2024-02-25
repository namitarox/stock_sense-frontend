import type { FC } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import Link from "next/link";
import {
  ArrowRightEndOnRectangleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";

export const Header: FC = ({}) => {
  const [isLogin, setLogin] = useState(false);
  return (
    <header>
      <nav className="flex item-center justify-between p-3 border-gray-100 border-b border-solid bg-white">
        <Logo />
        {!isLogin && (
          <div className="flex item-end gap-2">
            <Link href="/sign_in">
              <IconButton
                ripple={true}
                size="sm"
                variant="outlined"
                className="block sm:hidden border-gray-400"
              >
                <ArrowRightEndOnRectangleIcon className="h-4 w-4 text-gray-800" />
              </IconButton>
              <Button
                ripple={true}
                size="sm"
                variant="text"
                className="hidden sm:block text-gray-800"
              >
                ログイン
              </Button>
            </Link>
            <Link href="/sign_up">
              <Button
                ripple={true}
                className="flex items-center gap-1 border-yellow-800 text-yellow-800 bg-white"
                size="sm"
                variant="outlined"
                onClick={() => setLogin(true)}
              >
                <PencilSquareIcon className="h-4 w-4 hidden sm:block " />
                会員登録
              </Button>
            </Link>
          </div>
        )}
        {isLogin && (
          <Button
            ripple={true}
            size="sm"
            variant="outlined"
            className="text-gray-800"
            onClick={() => setLogin(false)}
          >
            マイページ
          </Button>
        )}
      </nav>
    </header>
  );
};
