const express=require('express');
const authMiddleware =require('../middleware/auth')
const User =require('../models/User')
const router=express.Router()
router.put('/profile', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'Invalid name' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { name: name.trim() } },
      { new: true }
    ).select('-password').lean();

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;
   
  try {
    const user = await User.findById(userId).select('-password').lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// for http://localhost:3000/api/user/${id}
router.get('/:id', authMiddleware, async (req, res) => {
  const userId = req.params.id;

  if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(userId).select('-password').lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Get user by ID error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports=router