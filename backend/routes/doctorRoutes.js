require("dotenv").config();
const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const { v2: cloudinary } = require("cloudinary");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });
// POST /add-doctor
router.post("/add-doctor", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      speciality,
      experience,
      location,
      qualification,
      clinicName,
      reviewCount,
      fee,
      rating,
      language,
      mode,
      badge,
    } = req.body;

    let imageURL = "";
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      imageURL = imageUpload.secure_url;
    }

    const newDoctor = new Doctor({
      name,
      speciality,
      experience,
      location,
      qualification,
      clinicName,
      reviewCount,
      fee,
      rating,
      image: imageURL,
      language,
      mode,
      badge,
    });

    await newDoctor.save();
    res
      .status(201)
      .send({ message: "Doctor added successfully", doctor: newDoctor });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/list-doctors-with-filter", async (req, res) => {
  const {
    page = 1,
    limit = 10,
    speciality,
    location,
    rating,
    fee,
    mode,
    sortBy,
  } = req.query;

  let filter = {};

  if (speciality) filter.speciality = speciality;
  if (location) filter.location = location;
  if (mode) filter.mode = mode;
  // if (rating) filter.rating = rating;

  if (fee) {
    if (fee === "0-500") {
      filter.fee = { $lte: 500 };
    } else if (fee === "500-1000") {
      filter.fee = { $gte: 500, $lte: 1000 };
    } else if (fee === "1000+") {
      filter.fee = { $gte: 1000 };
    }
  }
  if (rating) {
    const ratingValue = parseInt(rating);
    if (ratingValue === 70) {
      filter.rating = { $gte: 70, $lte: 80 };
    } else if (ratingValue === 80) {
      filter.rating = { $gte: 80, $lte: 90 };
    } else if (ratingValue === 90) {
      filter.rating = { $gte: 90 };
    }
  }
  let sort = {};

  if (sortBy === "Price: Low to High") {
    sort.fee = 1;
  } else if (sortBy === "Price: High to Low") {
    sort.fee = -1;
  } else if (sortBy === "Rating") {
    sort.rating = -1;
  } else if (sortBy === "Experience") {
    sort.experience = -1;
  }

  try {
    const doctors = await Doctor.find(filter)
      .sort(sort) // <- NEW
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Doctor.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page),
      doctors,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
