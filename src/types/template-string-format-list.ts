export interface TemplateStringFormatList {
  formats: Format[];
  format: string;
  filter: string;
  id: number;
}

export interface Format {
  constraint: string;
  template: string;
  id: number;
}
