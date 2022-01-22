import { GenericElement, PageType } from "./types";

// Structure Constructors

export interface RouterConstructor {
  pages: PageType[];
  notFound: PageType;
}

export interface PageConstructor {
  title?: string;
  description?: string;
  path: string;
  cssFiles?: string[];
  jsFiles?: string[];
}

// Element Constructors

export interface CommonConstructor {
  id?: string;
  classes?: string;
  children?: GenericElement[];
}

export interface TextConstructor extends CommonConstructor {
  textContent?: string;
}

export interface TitleConstructor extends TextConstructor {
  level: number;
}


export interface ContainerConstructor extends TextConstructor {}
export interface InsertConstructor extends TextConstructor {}
export interface GenericStructureConstructor extends TextConstructor {}

export interface LinkConstructor extends TextConstructor {
  target?: string;
}
