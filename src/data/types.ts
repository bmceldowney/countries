export type Country = {
  name: string;
  borders: string[];
  alpha3Code: string;
  expandedBorderNames: string[];
  languages: Array<Language>;
};

export type CountriesByIdMap = {
  [id: string]: Country;
};

export type Language = {
  name: string;
  nativeName: string;
};
