const User = require("../model/User");
const bcryptjs = require("bcryptjs");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "stizzle",
  api_key: "443826261983922",
  api_secret: "JD3HcPpLGUmZPPlcHeHKC4JSL_Q"
});

exports.index = (req, res) => {
  User.find().exec((err, doc) => {
    if (err)
      return res
        .status(400)
        .send({ success: false, msg: "Bad Request: Failed to load resource" });
    return res.send({ success: true, doc });
  });
};

exports.create = (req, res) => {
  const user = new User();
  user.email = req.body.email;

  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(req.body.password, salt, (err, hash) => {
      user.password = hash;
      const file = req.files.file;

      // console.log(file);
      cloudinary.uploader.upload(file.tempFilePath, function(err, result) {
        // console.log(result);
        user.avatar = result.secure_url;
        user
          .save()
          .then(doc => res.send({ success: true, doc }))
          .catch(err => res.status(500).send(err));
      });
    });
  });
};
