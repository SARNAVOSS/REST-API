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
  createCertificateService,
  publishCertificateService,
  unlistCertificateService,
  getTopNCertificatesService
} = require('../services/certificate.service');

// certificate create controller

exports.createCertificate = async (req, res) => {
  const {name, image, description, price, company, overall_difficulty, num_questions, certificate_image, category} = req.body;

  // checks if any of the required fields are empty
  if (!name || !image || !description || !price || !company || !overall_difficulty || !num_questions || !certificate_image || !category) {
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
    category: category
  };

  try {
    // save certificate to database
    const savedCertificate = await createCertificateService(certificateObject);
    
    // create custom message to send back with data and token
    const message = {
      error: false,
      message: 'Certificate created successfully',
      data: {
        id: savedCertificate._id,
        name: savedCertificate.name,
        image: savedCertificate.image,
        description: savedCertificate.description,
        price: savedCertificate.price,
        company: savedCertificate.company,
        overall_difficulty: savedCertificate.overall_difficulty,
        num_questions: savedCertificate.num_questions,
        category: savedCertificate.category,
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

  const {company} = req.body;


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

// publish certificate controller

exports.publishCertificate = async (req, res) => {
  const {certificate} = req.body;

  try {
    const data = await publishCertificateService({name: certificate});

    if (!data) {
      return messageError(res, BAD_REQUEST, 'Certificate does not have enough questions');
    }
    return message(res, OK, data);
  } catch (error) {
    return messageError(res, SERVER_ERROR, error.message);
  }
}

// unlist certificate controller

exports.unlistCertificate = async (req, res) => {
  const {certificate} = req.body;

  try {
    const data = await unlistCertificateService({name: certificate});
    return message(res, OK, data);
  } catch (error) {
    return messageError(res, SERVER_ERROR, error.message);
  }
}

// search top n certificates controller

exports.getTopNCertificates = async (req, res) => {
  const {n} = req.params;
  const user = req.user;

  try {
    const data = await getTopNCertificatesService({n, user});
    return message(res, OK, data);
  } catch (error) {
    return messageError(res, SERVER_ERROR, error.message);
  }
}