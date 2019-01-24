var express = require('express');
var router = express.Router();

var textinput_controller = require('../controllers/textinputController');


var multer = require('multer');
var storage = multer.memoryStorage();
    var upload = multer({ 
    storage: storage
});


// GET request for creating textinput. NOTE This must come before route for id (i.e. display textinput).
router.get('/', textinput_controller.upload_get);

// POST request for creating textinput.
router.post('/', upload.single('file-to-upload'), textinput_controller.upload_post);

module.exports = router;