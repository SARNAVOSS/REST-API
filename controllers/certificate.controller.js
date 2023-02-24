require('dotenv/config');
const { message, messageCustom, messageError } = require('../functions/message');
const {
  OK,
  CREATED,
  BAD_REQUEST,
  CONFLICT,
  SERVER_ERROR,
  UNAUTHORIZED,
} = require('../functions/messageType');

const {
  findCertificateService,
  getCertificatesService,
  createCertificateService
} = require('../services/certificate.service');

// certificate create controller

exports.createCertificate = async (req, res) => {
  const {name, image, description, price, company, overall_difficulty, num_questions, certificate_image} = req.body;

  // checks if any of the required fields are empty
  if (!name || !image || !description || !price || !company || !overall_difficulty || !num_questions || !certificate_image) {
    return messageError(res, BAD_REQUEST, 'All fields are required');
  }

  // check if certificate already exists
  const certificate_data = await findCertificateService({name: name, company: company});

  if (certificate_data) {
    return messageError(res, CONFLICT, 'Certificate already exists');
  }

  // create new certificate
  const certificateObject = {
    name: name,
    image: image,
    description: description,
    price: price,
    company: company,
    overall_difficulty: overall_difficulty,
    num_questions: num_questions,
    certificate_image: certificate_image,
  };

  try {
    // save certificate to database
    const savedCertificate = await createCertificateService(certificateObject);
    
    // create custom message to send back with data and token
    const message = {
      error: false,
      message: 'Certificate created successfully',
      data: {
        name: savedCertificate.name,
        image: savedCertificate.image,
        description: savedCertificate.description,
        price: savedCertificate.price,
        company: savedCertificate.company,
        overall_difficulty: savedCertificate.overall_difficulty,
        num_questions: savedCertificate.num_questions,
      },
    };

    return messageCustom(res, CREATED, "Certificate Created Successfully", message);
  } catch (error) {
    return messageError(res, SERVER_ERROR, error.message);
  }
};

// get all certificates controller

exports.getCertificates = async (req, res) => {
  
  // get company id from middleware

  const company = req.company;


  try {
    const certificates = await getCertificatesService({company: company});
    return message(res, OK, certificates);
  } catch (error) {
    return messageError(res, SERVER_ERROR, error.message);
  }
}

// get certificate by id controller

exports.getCertificateByName = async (req, res) => {
  const {name} = req.params;

  try {
    const certificate = await getCertificateDetailsService({name: name});
    return message(res, OK, certificate);
  } catch (error) {
    return messageError(res, SERVER_ERROR, error.message);
  }
}
