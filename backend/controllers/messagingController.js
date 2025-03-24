const db = require("../config/db");
const pusher = require("../config/pusher");

const sendMessage = async (req, res) => {
  const { sender_id, receiver_id, message } = req.body;
  try {
    await db.query("INSERT INTO Messages (sender_id, receiver_id, message) VALUES (?, ?, ?)", [
      sender_id,
      receiver_id,
      message,
    ]);
    pusher.trigger(`chat-${receiver_id}`, "new-message", { sender_id, message });
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getMessages = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [messages] = await db.query(
      "SELECT * FROM Messages WHERE sender_id = ? OR receiver_id = ? ORDER BY timestamp",
      [user_id, user_id]
    );
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { sendMessage, getMessages };