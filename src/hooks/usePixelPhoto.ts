import { useState, useEffect, useRef } from "react";
import PexelsPhotoAPI from "../services/pexels/photo";
import { photo } from "../services/pexels/photo/photo.types";

// seperating the logic for api calling and pagination
const usePixelPhoto = () => {
  const [photos, setPhotos] = useState<photo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const totalPagesRef = useRef<number>(0);
  const totalImages = useRef<number>(0);
  const perPage = 10; // we can add a per page picker in future iteration

  useEffect(() => {
    const getCuratedPhoto = async () => {
      try {
        setLoading(true);
        const response = await PexelsPhotoAPI.curated({
          page,
          per_page: perPage,
        });
        setPhotos(response.data.photos);
        totalImages.current = response.data.total_results;
        totalPagesRef.current = Math.ceil(
          response.data.total_results / perPage
        );
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    if (!searchTerm) {
      getCuratedPhoto();
    }
  }, [page, perPage, searchTerm]);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        setLoading(true);
        const response = await PexelsPhotoAPI.search({
          page,
          query: searchTerm,
          per_page: perPage,
        });
        setPhotos(response.data.photos);
        totalImages.current = response.data.total_results;
        totalPagesRef.current = Math.ceil(
          response.data.total_results / perPage
        );
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    if (searchTerm) {
      getPhotos();
    }
  }, [page, perPage, searchTerm]);

  const nextPage = () => {
    setPage((prevNum) => {
      // prevent page from exceeding
      if (prevNum + 1 > totalPagesRef.current) {
        return prevNum;
      }
      return prevNum + 1;
    });
  };

  const prevPage = () => {
    // prevent page from going below 1
    setPage((prevNum) => {
      if (prevNum - 1 < 1) {
        return prevNum;
      }
      return prevNum - 1;
    });
  };

  const lastPage = () => {
    setPage(totalPagesRef.current);
  };

  const firstPage = () => {
    setPage(1);
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPagesRef.current) {
      setPage(pageNumber);
    }
  };

  return {
    photos,
    page,
    loading,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    goToPage,
    searchTerm,
    totalImages: totalImages.current,
    maxPage: totalPagesRef.current,
    search: (input: string) => setSearchTerm(input),
  };
};

export default usePixelPhoto;
