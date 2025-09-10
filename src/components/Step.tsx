export const Step = ({ step, text, children }: { step: number; text: string; children?: React.ReactNode }) => {
  return (
    <div className="flex flex-col mt-4">
      <div className="flex items-center mb-4">
        <div className="flex items-center font-semibold justify-center text-white bg-black rounded-full text-sm h-9 w-9">
          {step}
        </div>
        <p className="text-black ml-2">{text}</p>
      </div>
      {children}
    </div>
  );
};
