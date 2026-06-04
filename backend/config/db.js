const mongoose = require("mongoose");

let isConnecting = false;
let reconnectTimer = null;

const scheduleReconnect = (retryDelayMS) => {
  if (reconnectTimer) {
    return;
  }

  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    connectDB(retryDelayMS);
  }, retryDelayMS);
};

const connectDB = async (retryDelayMS = 5000) => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    console.error("MongoDB connection string missing. Set MONGO_URL in backend/.env");
    return;
  }

  if (isConnecting || mongoose.connection.readyState === 1) {
    return;
  }

  isConnecting = true;

  try {
    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    console.error(
      `Will retry MongoDB connection in ${retryDelayMS / 1000} seconds. If using Atlas, check IP allowlist and network access.`
    );
    scheduleReconnect(retryDelayMS);
  } finally {
    isConnecting = false;
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected. Attempting reconnect...");
  scheduleReconnect(5000);
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB runtime error:", err.message);
});

module.exports = connectDB;