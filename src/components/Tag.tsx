import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './shadcn/dropdown-menu';
import { Key, SetStateAction, useState } from 'react';
import { FiCopy, FiTrash2, FiX } from 'react-icons/fi';
import { success } from '@/lib/success';
import copy from 'copy-to-clipboard';
import { TagText } from './TagText';
import { toast } from 'sonner';

interface Props {
  setTags?: (value: SetStateAction<string[]>) => void;
  key?: Key | null | undefined;
  deletable: boolean;
  tags?: string[];
  tag: string;
}

export const Tag = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  // Only allow closing via onOpenChange — opening is handled exclusively
  // by handleContextMenu calling setOpen(true) directly, so we ignore
  // any open attempts from the trigger's click handler here.
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) setOpen(false);
  };

  const handleCopy = () => {
    copy(props.tag);
    toast.success(success.message.copied);
  };

  const handleDelete = () => {
    const filtered = props.tags ? props.tags.filter((t) => t !== props.tag) : [];
    props.setTags && props.setTags(filtered);
    toast.success(`'${props.tag}' tag deleted.`);
  };

  return (
    <>
      {props.deletable ? (
        <DropdownMenu open={open} onOpenChange={handleOpenChange}>
          <DropdownMenuTrigger asChild>
            <div
              className="flex items-center border p-2 px-4 rounded-lg hover:cursor-pointer w-fit duration-300 hover:shadow-lg select-none"
              title="Right-click for options"
              onClick={handleDelete}
              onContextMenu={handleContextMenu}
            >
              <TagText text={props.tag} />
              <FiX
                className="text-lg ml-1 hover:scale-110 duration-150"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={handleCopy}>
              <FiCopy className="transition-transform duration-150 group-hover:scale-110" /> Copy
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={handleDelete}>
              <FiTrash2 className="transition-transform duration-150 group-hover:scale-110" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center border p-2 px-4 rounded-lg w-fit">
          <TagText text={props.tag} />
        </div>
      )}
    </>
  );
};
