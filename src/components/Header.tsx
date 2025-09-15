import { seo } from "@/lib/seo/seo";

export const Header = () => {
  return (
    <header className="flex flex-col items-center">
      <h1 className="text-6xl font-bold tracking-tighter">{seo.page.home.title} ✍️</h1>
      <p className="text-gray-800 mt-4 text-xl font-medium">{seo.page.home.description}</p>
    </header>
  );
};
