const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggendIn , isOwner , validateListing} = require("../middleware.js");
const listingControllers = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({storage});

// Index and creat Route
router
    .route("/")
    .get(wrapAsync(listingControllers.index))
    .post(isLoggendIn,upload.single("listing[image]"),validateListing,wrapAsync(listingControllers.creatListing));

// New Route
router.get("/new", isLoggendIn, listingControllers.renderNewForm);

// Show update and Delete Route
router.route("/:id")
.get(wrapAsync(listingControllers.showLinsing))
.put(isLoggendIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingControllers.updateListing))
.delete(isLoggendIn,isOwner, wrapAsync(listingControllers.destroyListing));

// Edit route
router.get("/:id/edit",isLoggendIn,isOwner,wrapAsync(listingControllers.renderEditForm));


module.exports = router;
