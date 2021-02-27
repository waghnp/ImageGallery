import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { listImages } from "../redux/actionCreators/imageActionCreator";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  root: {
    maxWidth: 345,
    margin: 20,
    width: 350,
    height: 350
  },
  cardImage: {
    height: 250
  },
  avatar: {
    display: "flex"
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: 15,
    border: "2px solid black"
  },
  image: {
    margin: "auto",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export default function ImgMediaCard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [likes, setLikes] = useState(0);
  const [userName, setUserName] = useState("");
  const [instaId, setInstaId] = useState("");
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [twitterUserName, setTwitterUserName] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const handleOpen = (info) => {
    setOpen(true);
    setImg(info.urls.thumb);
    setFirst_name(info.user.first_name);
    setLast_name(info.user.last_name);
    setLikes(info.likes);
    setInstaId(info.user.instagram_username);
    setPortfolioUrl(info.user.portfolio_url);
    setProfileImg(info.user.profile_image.small);
    setTwitterUserName(info.user.twitter_username);
    setUserName(info.user.username);
    setTotalPhotos(info.user.total_photos);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const imageList = useSelector((state) => state.imageList);
  const { loading, images, error } = imageList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listImages());
    return () => {
      //   cleanup
    };
  }, [dispatch]);
  return error ? (
    <div className="loadingMsg">{error}</div>
  ) : loading ? (
    <div className="loadingMsg">Loading......Please wait</div>
  ) : (
    <div className="images-list">
      {images.map((x) => (
        <Card className={classes.root} key={x.id}>
          <CardActionArea>
            <CardMedia
              className={classes.cardImage}
              onClick={() => handleOpen(x)}
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={x.urls.thumb}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <span>
                  Name : {x.user.first_name} {x.user.last_name}
                </span>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <span>Likes : {x.likes}</span>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <img className={classes.image} src={img} alt="error to show" />
              <div className={classes.avatar}>
                {" "}
                <Avatar
                  className={classes.small}
                  alt="Remy Sharp"
                  src={profileImg}
                />{" "}
                <span>
                  {first_name} {last_name}
                </span>{" "}
              </div>
              <div>User Name : {userName} </div>
              <div>Total Photos : {totalPhotos} </div>
              <div>Likes : {likes}</div>
              <div>Insta Id : {instaId} </div>
              <div>Twitter Id : {twitterUserName} </div>
              <div>Portfolio URL : {portfolioUrl} </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
