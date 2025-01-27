
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-bovag-yellow text-bovag-red p-4">
      <nav className="flex justify-between items-center">
        <Link href="/" className="bg-white px-2 py-1 rounded-3xl font-bold text-xl border-2 border-bovag-red">
          Automaatje 🫰
        </Link>
      </nav>
    </header>
  );
}