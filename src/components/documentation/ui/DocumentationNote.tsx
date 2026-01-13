export const DocumentationNote = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-l-4 border-blue-500 bg-blue-50 pl-3 mb-3 p-3">
      <p className="font-light text-blue-700 mb-2">Note:</p>
      <div className="text-blue-700">{children}</div>
    </div>
  );
};
