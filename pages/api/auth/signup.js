import User from '../../../models/User';
import db from '../../../utils/db';
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return;
  }
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(422).json({ message: 'Validation error' });

  await db.connect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(422).json({ message: 'User already exists' });
    await db.disconnect();
    return;
  }

  const newUser = new User({
    name,
    email,
    password: bcrypt.hashSync(password, 12),
    isAdmin: false,
  });
  const user = await newUser.save();

  await db.disconnect();

  res
    .status(201)
    .json({
      message: 'User created',
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
};
export default handler;
