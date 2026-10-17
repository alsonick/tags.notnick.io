import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from './shadcn/context-menu';
import { Key, SetStateAction } from 'react';
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
        // ContextMenu opens on right-click at the cursor; a left-click still deletes the tag.
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div
              className="group flex items-center gap-1.5 w-fit select-none rounded-lg border bg-gray-50 py-1.5 pl-3 pr-2 transition-colors duration-150 hover:cursor-pointer hover:border-red-200 hover:bg-red-50 dark:bg-neutral-900 dark:hover:border-red-900/60 dark:hover:bg-red-950/30"
              title="Click to delete, right-click for options"
              onClick={handleDelete}
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
          </ContextMenuTrigger>
          <ContextMenuContent className="min-w-0">
            <ContextMenuItem onSelect={handleCopy}>
              Copy <FiCopy className="ml-auto" />
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive" onSelect={handleDelete}>
              Delete <FiTrash2 className="ml-auto" />
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
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
