import { seo } from "@/lib/seo/seo";

export const Header = () => {
  return (
    <header className="flex flex-col items-center mt-10">
      <h1 className="text-6xl font-bold tracking-tighter justify-center flex items-center">{seo.page.home.title}</h1>
      <p className="text-gray-800 mt-2 text-xl font-medium">{seo.page.home.description}</p>
    </header>
  );
};
