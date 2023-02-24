const express = require("express");
const router = express.Router();

// middleware for company
const { companyAuthorization } = require("../middlewares/company.authorization");

//service
const { createCertificate,
 getCertificates,
 getCertificateByName,
 publishCertificate,
 unlistCertificate,
 getTopNCertificates
} = require("../controllers/certificate.controller");

// create certificate route
router.post("/create", createCertificate);

// get all certificates route
router.get("/get/all", getCertificates);

// get certificate by id route
router.get("/get/:name", getCertificateByName);

//public certificate
router.put("/publish", publishCertificate);

// unlist certificate
router.put("/unlist", unlistCertificate);

// search top n certificates
router.get("/search/top/:n", getTopNCertificates);

module.exports = router;