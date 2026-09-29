/* Mirrors TanzaniaRegion on the backend; sent verbatim as `region`. */
export const TANZANIA_REGIONS = [
  'ARUSHA',
  'DAR_ES_SALAAM',
  'DODOMA',
  'GEITA',
  'IRINGA',
  'KAGERA',
  'KATAVI',
  'KIGOMA',
  'KILIMANJARO',
  'LINDI',
  'MANYARA',
  'MARA',
  'MBEYA',
  'MOROGORO',
  'MTWARA',
  'MWANZA',
  'NJOMBE',
  'PWANI',
  'RUKWA',
  'RUVUMA',
  'SHINYANGA',
  'SIMIYU',
  'SINGIDA',
  'TABORA',
  'TANGA',
  'UNGUJA_KASKAZINI',
  'UNGUJA_KUSINI',
  'UNGUJA_MJINI_MAGHARIBI',
  'PEMBA',
];

export const regionLabel = (region) =>
  region
    ? region
        .split('_')
        .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
        .join(' ')
    : '';
