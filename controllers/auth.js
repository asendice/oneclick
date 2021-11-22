const Header = require("../models/Header");

exports.getHeaders = (req, res) => {
  Header.find().then((header) => {
    if (!header) {
      return res.status(404).json({
        errors: [{ user: "Headers cannot be found" }],
      });
    } else {
      return res.status(200).json({
        success: true,
        message: header,
      });
    }
  });
};

