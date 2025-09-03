let onlineUsers = new Map();

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("⚡ New client connected:", socket.id);

    socket.on("addUser", (userId) => {
      if (!userId) return;
      onlineUsers.set(userId, socket.id);
      io.emit("getUsers", Array.from(onlineUsers.keys()));
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("getMessage", { senderId, text });
      }
    });

    socket.on("disconnect", () => {
      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("getUsers", Array.from(onlineUsers.keys()));
    });
  });
};

module.exports.onlineUsers = onlineUsers;
