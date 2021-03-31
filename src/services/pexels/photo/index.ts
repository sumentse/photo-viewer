import { AxiosResponse } from "axios";
import { get } from "../base";
import {
  CuratedParams,
  CuratedResponse,
  PIXEL_PHOTO_ENDPOINTS,
  SearchParams,
  SearchResponse,
} from "./photo.types";

const PexelsPhotoAPI = {
  search: (params?: SearchParams) =>
    get<AxiosResponse<SearchResponse>>(PIXEL_PHOTO_ENDPOINTS.SEARCH, {
      params,
    }),
  curated: (params?: CuratedParams) =>
    get<AxiosResponse<CuratedResponse>>(PIXEL_PHOTO_ENDPOINTS.CURATED, {
      params,
    }),
};

export default PexelsPhotoAPI;
