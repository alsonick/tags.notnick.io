export interface TemplateStringFormatList {
  formats: Format[];
  filter: string;
  id: number;
}

export interface Format {
  constraint: string;
  template: string;
  id: number;
}
