export interface AstrologyDateDataResponse {
  sign: string;
  date: string;
  motto: string;
  planet: string;
  element: string;
  comment: string;
}

export interface AstrologyFeatureDataResponse {
  sign: string;
  feature: string;
  title: string;
  comment: string;
}

export enum AstrologySign {
  'koc',
  'boga',
  'ikizler',
  'yengec',
  'aslan',
  'basak',
  'terazi',
  'akrep',
  'yay',
  'oglak',
  'kova',
  'balik',
}

export enum AstrologyFeature {
  'ask',
  'kariyer',
  'olumlu-yonler',
  'olumsuz-yonler',
  'saglik',
  'stil',
  'unluler',
  'diyet',
  'zit-burclar',
  'eglence-hayati',
  'makyaj',
  'sac-stili',
  'sifali-bitkiler',
  'film-onerileri',
  'cocuklugu',
  'kadini',
  'erkegi',
  'gezegeni',
  'tasi',
}

export enum DateType {
  Daily = 'gunluk',
  Weekly = 'haftalik',
  Monthly = 'aylik',
  Yearly = 'yillik',
}

export enum Type {
  Date = 'date',
  Feature = 'feature',
}
