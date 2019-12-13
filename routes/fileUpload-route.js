const express = require("express");
const upload = require("../file-uploads");

const router = express.Router();
                                    //key
const singleUpload = upload.single("image");

router.post("/file-upload", (req, res) => {
  singleUpload(req, res, error => {

    if (error) {
      console.log("errors", error);
      return res.json({ error: error });
    }

    if (req.file === undefined) {
      return res.status(404).json({ msg: "No file Selected" });
    }

    const imageName = req.file.key;
    const file = req.file.location;
    res.json({
      imageName,
      file
    });

  });
});

module.exports = router;
