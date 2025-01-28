import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const WEEK_IN_SECONDS = 7 * 24 * 60 * 60;

export async function GET() {
  const resolvedCookies = await cookies();
  const wishlistCookie = resolvedCookies.get('wishlist')?.value;
  return NextResponse.json({ items: wishlistCookie ? JSON.parse(wishlistCookie) : [] });
}

export async function POST(request: Request) {
  const { productId } = await request.json();
  const resolvedCookies = await cookies();
  const wishlistCookie = resolvedCookies.get('wishlist')?.value;
  const wishlist = wishlistCookie ? JSON.parse(wishlistCookie) : [];
  
  const updatedWishlist = wishlist.includes(productId)
    ? wishlist.filter((id: number) => id !== productId)
    : [...wishlist, productId];

  resolvedCookies.set('wishlist', JSON.stringify(updatedWishlist), {
    maxAge: WEEK_IN_SECONDS,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  
  return NextResponse.json({ items: updatedWishlist });
}
