export interface PageType {
  title: string;
  description?: string;
  path: string;
  cssFiles?: string[];
  jsFiles?: string[];
  populate: () => void;
  mount: () => void;
  unmount: () => void;
}

export interface RouterConstructor {
  pages: PageType[];
  notFound: PageType;
}

export interface PageConstructor {
  title: string;
  description?: string;
  path: string;
  cssFiles?: string[];
  jsFiles?: string[];
}
