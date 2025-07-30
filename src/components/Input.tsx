import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export const Input = (props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  return <input className="flex border items-center p-2 rounded-lg focus:outline-2 px-4" {...props} />;
};
