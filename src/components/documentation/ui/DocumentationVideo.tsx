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
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm">
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
      <figcaption className="mt-3 text-center text-xs text-gray-500">{caption}</figcaption>
    </figure>
  );
};
