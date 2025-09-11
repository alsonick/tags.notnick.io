import { useRouter } from "next/router";

export const DevelopmentNav = () => {
  const router = useRouter();

  return (
    <>
      {process.env.NODE_ENV === "development" || router.query.debug === "true" ? (
        <div className="flex fixed items-center font-light justify-center top-0 z-50 w-full bg-green-600">
          <span className="text-white text-sm">
            {" "}
            You're currently in{" "}
            <b>
              [
              {process.env.NODE_ENV === "development"
                ? process.env.NODE_ENV.toUpperCase()
                : `${router.query.debug}`.toUpperCase()}
              ]
            </b>{" "}
            mode.{" "}
          </span>
        </div>
      ) : null}
    </>
  );
};
