import { useEffect, useState, useRef } from "react";
import { PexelsPhotoAPI } from "../../services/pexels";
import Gallery from "react-photo-gallery";
import { photo } from "../../services/pexels/photo/photo.types";
import {
  Container,
  Box,
  Button,
  LinearProgress,
  Grid,
  Typography,
  Fab,
  Fade,
} from "@material-ui/core";
import useStyles from "../Home/home.styles";
import NavBar from "../../components/NavBar";
import { Navigation } from "@material-ui/icons";
import useDetectScroll from "../../hooks/useDetectScroll";

const Home = () => {
  const [photos, setPhotos] = useState<photo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const totalPagesRef = useRef<number>(0);

  const perPage = 10; // we can add a per page picker in future iteration

  const classes = useStyles();
  const { scrolling } = useDetectScroll();

  useEffect(() => {
    const getCuratedPhoto = async () => {
      try {
        setLoading(true);
        const response = await PexelsPhotoAPI.curated({
          page,
          per_page: perPage,
        });
        setPhotos(response.data.photos);
        totalPagesRef.current = Math.ceil(
          response.data.total_results / perPage
        );
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    getCuratedPhoto();
  }, [page, perPage]);

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

  const handleClick = (e: any) => {};

  const buildPhotos = () => {
    return photos.map(({ src, width, height }) => {
      return {
        src: src.medium,
        width: width / 3,
        height: height / 3,
      };
    });
  };

  const nextPage = () => {
    setPage((prevNum) => {
      // prevent page from exceeding
      if (prevNum + 1 > totalPagesRef.current) {
        return prevNum;
      }
      return prevNum + 1;
    });
  };

  const renderGallery = () => {
    if (photos.length > 0) {
      return (
        <>
          <Box className={classes.photoContainer} py={3}>
            <Container>
              <Gallery photos={buildPhotos()} onClick={handleClick} />
            </Container>
          </Box>
          <Box className={classes.nextPageContainer} my={5}>
            <Button
              className={classes.nextButton}
              variant="contained"
              color="primary"
              onClick={nextPage}
            >
              Next Page
            </Button>
          </Box>
        </>
      );
    }
    if (searchTerm && photos.length === 0) {
      return (
        <Box mx={3}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{ minHeight: "100vh", marginTop: "130px" }}
          >
            <Grid item xs={12}>
              <Typography variant="h5">
                Sorry we could not find any matches
              </Typography>
            </Grid>
          </Grid>
        </Box>
      );
    }
    return null;
  };

  return (
    <div>
      <NavBar
        title="Phototastic!"
        onSearch={(userInput) => setSearchTerm(userInput)}
      />
      {loading && <LinearProgress />}
      {renderGallery()}
      <Fade in={scrolling}>
        <Fab
          className={classes.fab}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="scroll top"
        >
          <Navigation className={classes.navigationIcon} />
        </Fab>
      </Fade>
    </div>
  );
};

export default Home;
