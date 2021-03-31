import { useEffect } from "react";
import { PexelsPhotoAPI } from "../../services/pexels";

const Home = () => {
  useEffect(() => {
    const getInitialData = async () => {
      const response = await PexelsPhotoAPI.search({
        query: "beach",
        per_page: 10,
      });
      console.log(response);
    };
    getInitialData();
  }, []);
  return <div>Hello</div>;
};

export default Home;
