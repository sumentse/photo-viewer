export enum PIXEL_PHOTO_ENDPOINTS {
  SEARCH = "/search",
  CURATED = "/curated",
}

export type SearchParams = {
  query?: string;
  orientation?: "landscape" | "portrait" | "square";
  size?: "small" | "medium" | "large";
  color?: string;
  locale?: string;
  per_page?: number;
  page?: number;
};

export type CuratedParams = {
  per_page?: number;
  page?: number;
};

export type photo = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
};

export type SearchResponse = {
  total_result: number;
  page: number;
  per_page: number;
  photos: photo[];
  next_page: string;
};

export type CuratedResponse = {
  page: number;
  per_page: number;
  photo: photo[];
  next_page: string;
};
