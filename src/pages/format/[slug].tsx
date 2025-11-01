import { NextPage } from "next";
import { useRouter } from "next/router";

const Slug: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug;
  return <div>{slug}</div>;
};

export default Slug;
