const mongoose = require("mongoose");

module.exports = mongoose.model("Warn", new mongoose.Schema({
    id: { type: String },
    staff: { type: String },
    registeredAt: { type: Number, default: Date.now() },
}));