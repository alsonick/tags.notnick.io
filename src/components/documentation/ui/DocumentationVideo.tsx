export const DocumentationVideo = ({
  src,
  label,
  width,
  height,
  poster,
  caption,
  className,
}: {
  src: string;
  label: string;
  width: number;
  height: number;
  poster: string;
  caption: React.ReactNode;
  className?: string;
}) => {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-neutral-800 dark:bg-neutral-900 shadow-sm">
        <video
          src={src}
          aria-label={label}
          poster={poster}
          playsInline
          controls
          preload="metadata"
          className="h-auto w-full"
          style={{ aspectRatio: `${width} / ${height}` }}
        />
      </div>
      <figcaption className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">{caption}</figcaption>
    </figure>
  );
};
