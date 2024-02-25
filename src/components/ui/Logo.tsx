import type { FC } from "react";
import Link from "next/link";
import { CurrencyYenIcon } from "@heroicons/react/24/outline";
export const Logo: FC = () => {
  return (
    <h1 className="flex items-center justify-center">
      <Link
        href="/"
        className="flex items-center justify-center text-md font-bold gap-1 "
      >
        <CurrencyYenIcon className="h-6 w-6 text-yellow-800 font-bold" />
        STOCK SENSE
      </Link>
    </h1>
  );
};
