import express from "express";
import request from "request";
import config from "config";
import auth from "../../middleware/auth.js";
import Profile from "../../Models/Profile.js";
import User from "../../Models/User.js";
import { check, validationResult } from "express-validator";
const router = express.Router();

// @route GET api/profile/me
// @desc Test route
// @access public

router.get("/me", auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    "user",
    ["name", "avatar"]
  );
  if (!profile) {
    return res.status(400).send("Profile doesn't exist");
  }
  try {
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({msg:"Server error"});
  }
});

// @ /api/proile
// public route

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find({}).populate("user", [
      "name",
      "avatar",
    ]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({msg:"Server error"});
  }
});

//  @/api/profile/user/:user_id
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (profile) {
      return res.json(profile);
    }
    res.status(400).json({ msg: "profile doesn't exist" });
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId")
      return res.status(400).json({ msg: "profile doesn't exist" });
    res.status(500).json({msg:"Server error"});
  }
});
router.delete("/", auth, async (req, res) => {
  await Profile.findOneAndRemove({ user: req.user.id });
  await User.findByIdAndRemove({ _id: req.user.id });
  res.send("User has been deleted sucesfully");
});

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status cannot be empty").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      company,
      website,
      location,
      bio,
      status,
      skills,
      githubusername,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    company && (profileFields.company = company);
    website && (profileFields.website = website);
    location && (profileFields.location = location);
    bio && (profileFields.bio = bio);
    status && (profileFields.status = status);
    // const skillsArray = skills.toString().split(',').map(e => e.trim())
    profileFields.skills = skills
    githubusername && (profileFields.githubusername = githubusername);

    profileFields.social = {};

    youtube && (profileFields.social.youtube = youtube);
    facebook && (profileFields.social.facebook = facebook);
    twitter && (profileFields.social.twitter = twitter);
    instagram && (profileFields.social.instagram = instagram);
    linkedin && (profileFields.social.linkedin = linkedin);
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      } else {
        const pro = new Profile(profileFields);
        await pro.save();
        return res.json(pro);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({msg:"server error"});
    }
  }
);

router.put(
  "/experience",
  [
    auth,
    [
      check("from", "From date cannot be empty").not().isEmpty(),
      check("title", "Title cannot be empty").not().isEmpty(),
      check("company", "Company cannot be empty").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });
    const { title, company, location, from, to, current, description } =
      req.body;
    const expProfile = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(expProfile);
      await profile.save();
      res.send(expProfile);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({msg:"Server error"});
    }
  }
);

router.delete("/experience/delete/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const index = profile.experience
      .map((element) => element.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(index, 1);
    await profile.save();
    res.status(200).send("Updated the experience section");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({msg:"Server error"});
  }
});

router.put(
  "/education",
  [
    auth,
    [
      check("school", "School field cannot be empty").not().isEmpty(),
      check("degree", "Degree field cannot be empty").not().isEmpty(),
      check("fieldofstudy", "Field of study field cannot be empty")
        .not()
        .isEmpty(),
      check("from", "From field cannot be empty").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    const edProfile = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(edProfile);
      await profile.save();
      res.send(edProfile);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({msg:"Server error"});
    }
  }
);

router.delete("/education/delete/:ed_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const index = profile.education.map((e) => e.id).indexOf(req.params.ed_id);
    profile.education.splice(index, 1);
    await profile.save();
    res.status(200).send("Updated the education section");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({msg:"Server error"});
  }
});

router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=
      ${config.get("githubclientid")}&client_secret=${config.get(
        "githubsecretkey"
      )}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200)
        return res.status(404).send("profile not found");

      res.status(200).json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
