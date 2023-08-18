type TestType = 'component' | 'hook' | 'module' | 'util';
export type TemplateTestOptions = {
  name: string;
  type: TestType;
  beforeCode?: string;
  afterCode?: string;
};
