const db = require("../config/db");

const sendMessage = async (req, res) => {
  const { sender_id, receiver_id, message } = req.body;
  try {
    await db.query(
      "INSERT INTO Messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
      [sender_id, receiver_id, message]
    );
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getMessages = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [messages] = await db.query("SELECT * FROM Messages WHERE receiver_id = ?", [user_id]);
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { sendMessage, getMessages };