# Automaatje

Is a Next.js-based prototype developed as a technical assessment for a 2nd interview at viaBovag. It demonstrates a minimal Product Listing Page (PLP) with a wishlist feature and is built with Next.js, TypeScript, and Tailwind CSS.

## Key Features

- Fetching product data from a custom JSON file or API.
- Free-text search, filtering, and sorting on the product listing.
- Wishlist mechanism persisted across browsing sessions.
- Header with a favorites icon, including a badge displaying wishlist item count.
- Separate page to view and manage wishlist items.

## Getting Started

1. Clone this repository.  
2. Install dependencies using your preferred package manager.  
3. Run the development server with:
   ```bash
   # the project was originally configured using bun
   bun dev
   # or
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- **app**: Contains pages built with Next.js App Router.  
- **app/api**: Provides a simple products API featuring search, filtering, and sorting.  
- **app/components**: Holds reusable UI components like the Header.  
- **public**: Stores static files, including custom icons and images.  

## Notes

- This prototype is meant to showcase a possible approach and is not production-ready.
- Additional customization or scaling may be required for real-world use cases.

## Acknowledgments

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
