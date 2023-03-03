export type Car = {
  id: string,
  modelName: string,
  bodyType: string,
  modelType: string;
  imageUrl: string;
}

export type Format = 'mobile' | 'tablet' | 'desktop';

export type SiteSettings = {
  format: Format
  visibleCarouselItems: number;
}
