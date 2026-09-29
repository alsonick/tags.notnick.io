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
  // Brand-tinted, used in examples to show which tags were added.
  highlighted?: boolean;
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
              className="group flex items-center gap-1.5 w-fit select-none rounded-lg border bg-gray-50 py-1.5 pl-3 pr-2 transition-colors duration-150 hover:cursor-pointer hover:border-red-200 hover:bg-red-50 dark:bg-neutral-900 dark:hover:border-red-900/60 dark:hover:bg-red-950/30"
              title="Click to delete, right-click for options"
              onClick={handleDelete}
              onContextMenu={handleContextMenu}
            >
              <TagText text={props.tag} />
              <FiX
                className="text-base text-gray-400 transition-colors duration-150 group-hover:text-red-500 dark:text-neutral-500"
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
        <div
          className={
            props.highlighted
              ? 'flex items-center w-fit rounded-lg border border-brand-200 bg-brand-50 px-3 py-1.5 text-brand-800 dark:border-brand-900 dark:bg-brand-500/10 [&_p]:text-brand-800 dark:[&_p]:text-brand-300'
              : 'flex items-center w-fit rounded-lg border bg-gray-50 px-3 py-1.5 dark:bg-neutral-900'
          }
        >
          <TagText text={props.tag} />
        </div>
      )}
    </>
  );
};
