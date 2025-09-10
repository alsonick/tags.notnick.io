export const DevelopmentNav = () => {
  return (
    <>
      {process.env.NODE_ENV === "development" ? (
        <div className="flex fixed items-center font-light justify-center top-0 z-50 w-full bg-green-600">
          <span className="text-white text-sm">
            {" "}
            You're currently in <b>[{process.env.NODE_ENV.toUpperCase()}]</b> mode.{" "}
          </span>
        </div>
      ) : null}
    </>
  );
};
