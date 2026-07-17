require('dotenv').config({ path: './backend/.env' });
const mongoose = require('./backend/node_modules/mongoose');
const User = require('./backend/models/User');
const dns = require('dns');

// Force Node.js to use Google public DNS to bypass local DNS resolution/SRV lookups failing on Windows
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  console.warn("Could not set custom DNS servers, using system default.");
}

const email = process.argv[2];
if (!email) {
  console.log("Usage: node promoteAdmin.js <email_address>");
  process.exit(1);
}

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("Error: MONGODB_URI is not defined in backend/.env");
  process.exit(1);
}

mongoose.connection.on('connecting', () => console.log('Connecting to MongoDB...'));
mongoose.connection.on('connected', () => console.log('Mongoose connected successfully!'));
mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected.'));

console.log("Using URI:", mongoUri);

mongoose.connect(mongoUri)
  .then(async () => {
    console.log("Connection promise resolved. Executing update...");
    const res = await User.updateOne({ email: email.toLowerCase().trim() }, { role: 'admin' });
    if (res.matchedCount > 0) {
      console.log(`\n🎉 Success! ${email} has been promoted to Admin role.\n`);
    } else {
      console.log(`\n❌ Error: No user found with email address: "${email}"`);
      // Fetch and display all registered users to assist the user
      const users = await User.find({}, 'email');
      if (users.length > 0) {
        console.log("\nRegistered emails in database:");
        users.forEach(u => console.log(` - ${u.email}`));
      } else {
        console.log("\nNo registered users found in the database. Please sign up on the website first!");
      }
      console.log();
    }
    process.exit(0);
  })
  .catch(err => {
    console.error("\n❌ Database connection failed:", err.message);
    process.exit(1);
  });
