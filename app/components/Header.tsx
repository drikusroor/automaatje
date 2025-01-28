import Link from "next/link";
import WishlistCounter from "./wishlist/WishlistCounter";

export default function Header() {
  return (
    <header className="bg-bovag-yellow text-bovag-red p-4 shadow-md">
      <nav className="flex justify-between items-end">
        <Link href="/" className="bg-white px-2 py-1 rounded-3xl font-bold text-xl border-2 border-bovag-red">
          Automaatje 
          <span className="drop-shadow">🫰</span>
        </Link>
        <WishlistCounter />
      </nav>
    </header>
  );
}