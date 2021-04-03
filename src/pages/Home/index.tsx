import { useState } from "react";
import Gallery, { PhotoClickHandler } from "react-photo-gallery";
import {
  Container,
  Box,
  Button,
  LinearProgress,
  Grid,
  Typography,
  Fab,
  Fade,
  Modal,
} from "@material-ui/core";
import useStyles from "../Home/home.styles";
import NavBar from "../../components/NavBar";
import { Navigation } from "@material-ui/icons";
import useDetectScroll from "../../hooks/useDetectScroll";
import usePixelPhoto from "../../hooks/usePixelPhoto";
import { photo } from "../../services/pexels/photo/photo.types";
import clsx from "clsx";
import formatNumber from "../../utils/formatter";

const Home = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<photo>();
  const {
    photos,
    totalImages,
    searchTerm,
    nextPage,
    prevPage,
    loading,
    search,
    page,
    maxPage,
  } = usePixelPhoto();
  const classes = useStyles();
  const { scrolling } = useDetectScroll();

  const handleClick: PhotoClickHandler = (e, { index }) => {
    setSelectedPhoto(photos[index]);
    setShowModal(true);
  };

  const buildPhotos = () => {
    return photos.map(({ src, width, height }) => {
      return {
        src: src.medium,
        width: width / 3,
        height: height / 3,
      };
    });
  };

  const renderModalBody = () => {
    if (selectedPhoto) {
      const { photographer, photographer_url } = selectedPhoto;
      return (
        <>
          <Typography variant="h6">Photo Details</Typography>
          <Typography>{photographer}</Typography>
          <Typography style={{ wordWrap: "break-word" }}>
            <a href={photographer_url} target="_blank" rel="noreferrer">
              {photographer_url}
            </a>
          </Typography>
        </>
      );
    }
    return null;
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
            <Grid container justify="center">
              <Grid item>
                <Button
                  className={classes.paginationButton}
                  variant="contained"
                  color="primary"
                  onClick={prevPage}
                  disabled={page === 1}
                >
                  Previous
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.paginationButton}
                  variant="contained"
                  color="primary"
                  disabled={page === maxPage}
                  onClick={nextPage}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
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
    <Box>
      <NavBar
        title="Phototastic!"
        onSearch={(userInput) => search(userInput)}
      />
      {loading && <LinearProgress />}
      {renderGallery()}
      <hr />
      <Container>
        <Typography>{formatNumber(totalImages)} Free images</Typography>
      </Container>
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
      <Modal
        className={classes.modal}
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <div className={clsx(classes.paper)}>{renderModalBody()}</div>
      </Modal>
    </Box>
  );
};

export default Home;
