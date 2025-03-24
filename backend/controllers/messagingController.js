const db = require("../config/db");
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

const sendMessage = async (req, res) => {
  const { sender_id, receiver_id, message, material_id } = req.body;
  try {
    // Insert message into database
    const [result] = await db.query(
      "INSERT INTO Messages (sender_id, receiver_id, material_id, message) VALUES (?, ?, ?, ?)",
      [sender_id, receiver_id, material_id, message]
    );

    // Get sender's name
    const [senders] = await db.query("SELECT name FROM Users WHERE user_id = ?", [sender_id]);
    const senderName = senders[0].name;

    // Trigger Pusher event
    pusher.trigger(`chat-${receiver_id}`, "new-message", {
      message_id: result.insertId,
      sender_id,
      sender_name: senderName,
      message,
      material_id,
      timestamp: new Date()
    });

    res.status(201).json({ 
      message: "Message sent successfully",
      message_id: result.insertId
    });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getMessages = async (req, res) => {
  const { user_id } = req.params;
  try {
    // Get all messages where user is either sender or receiver
    const [messages] = await db.query(
      `SELECT m.*, 
        u1.name as sender_name,
        u2.name as receiver_name,
        mat.material_type
       FROM Messages m
       JOIN Users u1 ON m.sender_id = u1.user_id
       JOIN Users u2 ON m.receiver_id = u2.user_id
       LEFT JOIN Materials mat ON m.material_id = mat.material_id
       WHERE m.sender_id = ? OR m.receiver_id = ?
       ORDER BY m.created_at DESC`,
      [user_id, user_id]
    );

    // Mark messages as read
    await db.query(
      "UPDATE Messages SET is_read = TRUE WHERE receiver_id = ? AND is_read = FALSE",
      [user_id]
    );

    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getUnreadCount = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [result] = await db.query(
      "SELECT COUNT(*) as count FROM Messages WHERE receiver_id = ? AND is_read = FALSE",
      [user_id]
    );
    res.status(200).json({ count: result[0].count });
  } catch (err) {
    console.error("Error fetching unread count:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { sendMessage, getMessages, getUnreadCount };