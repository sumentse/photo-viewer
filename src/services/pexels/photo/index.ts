import { get } from "../base";
import {
  CuratedParams,
  PIXEL_PHOTO_ENDPOINTS,
  SearchParams,
  BasePhotoResponse,
} from "./photo.types";

// default params
const PER_PAGE = 10;
const QUERY = "Ocean";
const PAGE = 1;

const PexelsPhotoAPI = {
  search: (
    params: SearchParams = {
      per_page: PER_PAGE,
      query: QUERY,
      page: PAGE,
    }
  ) =>
    get<BasePhotoResponse>(PIXEL_PHOTO_ENDPOINTS.SEARCH, {
      params,
    }),
  curated: (params: CuratedParams = { per_page: PER_PAGE, page: PAGE }) =>
    get<BasePhotoResponse>(PIXEL_PHOTO_ENDPOINTS.CURATED, {
      params,
    }),
};

export default PexelsPhotoAPI;
