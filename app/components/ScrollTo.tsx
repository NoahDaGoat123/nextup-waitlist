"use client";

import { usePathname, useRouter } from "next/navigation";

type ScrollToProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

export default function ScrollTo({ id, children, className = "" }: ScrollToProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
