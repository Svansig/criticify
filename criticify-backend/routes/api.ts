var express = require("express");
var router = express.Router();

const artistRouter = require("./api/artist.ts");
const albumRouter = require("./api/album.ts");
const songRouter = require("./api/song.ts");
const reviewRouter = require("./api/review.ts");

router.use("/artist", artistRouter);
router.use("/review", reviewRouter);
// router.use("/album", albumRouter);
// router.use("/song", songRouter);

module.exports = router;
