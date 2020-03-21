const express = require('express');
const router = express.Router();
const verify = require('../../middleware/verifyToken');

// Models
const User = require('../../models/User');

// Validation
const { profileValidation } = require('../../middleware/validation');

/**
 * @route PUT api/users/profile
 * @desc Update User Profile
 * @access Private
 */
router.put('/', verify, async (req, res) => {
  // Get User Details
  const user = await User.findById(req.user);

  // Validate the data before we create a user
  const { error } = profileValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const entry = await user.updateOne(
      // set criteria
      {
        $set: {
          profile: {
            bio: req.body.bio,
            instagram: req.body.instagram
          }
        }
      }
    );
    res.send({
      profile: {
        bio: req.body.bio,
        instagram: req.body.instagram
      }
    });
    console.log('profile updated');
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
