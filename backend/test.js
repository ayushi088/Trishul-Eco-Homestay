import mongoose from "mongoose";

const uri =
    "mongodb+srv://ayushi31saini_db_user:W2U72hu1LkXYfNqs@homestay.wyc4jx3.mongodb.net/HomeStay?retryWrites=true&w=majority&appName=HomeStay";

try {
    console.log("Connecting...");
    await mongoose.connect(uri);
    console.log("✅ Connected Successfully");
    process.exit(0);
} catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
}