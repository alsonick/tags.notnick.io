import { Endpoint } from "@/types/documentation/endpoint";
import { ENDPOINTS } from "@/lib/documentation/endpoints";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/Button";
import { FiCopy } from "react-icons/fi";
import { Tag } from "@/components/Tag";
import copy from "copy-to-clipboard";

export const Endpoints = () => {
  return (
    <>
      <div className="flex flex-col">
        {ENDPOINTS.map((endpoint: Endpoint) => (
          <div key={endpoint.endpoint} className="flex items-center mb-4 justify-between">
            <Tag deletable={false} tag={`${endpoint.method} ${endpoint.endpoint}`} />
            <Button
              onClick={() => {
                const endpointToCopy = endpoint.endpoint;
                toast.success("Copied to clipboard.");
                copy(endpointToCopy);
              }}
            >
              Copy <FiCopy className="ml-2 hover:scale-110 duration-150" />
            </Button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
};
