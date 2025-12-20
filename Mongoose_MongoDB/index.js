const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://devansh:Devansh2110@cluster0.jygpcdr.mongodb.net/user_app?retryWrites=true&w=majority"
    );
    console.log("Connected to MongoDB");

    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
    });

    const User = mongoose.model("Users", userSchema);

    const user = new User({
      name: "Rid Jain",
      email: "rid@gmail.com",
      password: "1232cs1",
    });

    await user.save();
    console.log("User saved successfully");
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
