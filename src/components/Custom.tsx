import { Response } from "@/types/response";
import { Tag } from "./Tag";

interface Props {
  data: Response;
}

export const Custom = (props: Props) => {
  return (
    <div className="border p-4 mt-4 rounded-lg">
      <h2 className="text-2xl font-medium text-left">Custom 🤖</h2>
      <p className="mt-1 border-b pb-2 text-gray-800">The format string template used to generate your custom tags.</p>
      <div className="flex flex-wrap gap-4 my-4 mt-6">
        <Tag deletable={false} tag={props.data.customFormat} />
      </div>
    </div>
  );
};
