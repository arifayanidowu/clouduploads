const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "stizzle",
  api_key: "443826261983922",
  api_secret: "JD3HcPpLGUmZPPlcHeHKC4JSL_Q"
});

exports.upload = file => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No File exists");
    } else {
      cloudinary.uploader.upload(
        file,
        result => {
          resolve({ url: result.url });
        },
        { resource_type: "auto" }
      );
    }
  });
};
