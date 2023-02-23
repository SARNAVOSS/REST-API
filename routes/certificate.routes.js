const express = require("express");
const router = express.Router();

const {createCertificate, getCertificates, getCertificateByName} = require("../controllers/certificate.controller");

// create certificate route

router.post("/create", createCertificate);


// get all certificates route

router.get("/get/all", getCertificates);

// get certificate by id route

router.get("/get/:name", getCertificateByName);

