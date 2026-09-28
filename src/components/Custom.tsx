import { ResultSection } from './sections/ResultSection';
import { Response } from '@/types/response';
import { Tag } from './Tag';

interface Props {
  data: Response;
  actions?: React.ReactNode;
}

export const Custom = (props: Props) => {
  return (
    <ResultSection
      title="Custom"
      description="The format string template used to generate your custom tags."
      actions={props.actions}
    >
      <div className="flex flex-wrap gap-2">
        <Tag deletable={false} tag={props.data.customFormat} />
      </div>
    </ResultSection>
  );
};
