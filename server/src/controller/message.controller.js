const pool = require('../config/connectDB');
const { statusCode } = require('../until/httpResponse');
const appError = require('../errors/appError');
require('dotenv').config();

const messageController = {
    getMessagesOfRoom: async (req, res, next) => {
        try {
            const {roomId} = req.params;

            const query = 'select r.*, m.content, m.is_latest_message, m.created_at as messageCreated, u.user_name, u.avatar from tb_message m inner join tb_room r on m.room_id = r.room_id inner join tb_user u on m.sender_id = u.user_id where r.room_id = ?';

            const [data] = await pool.query(query, [roomId]);

            // Check if data is empty or not
            if (data.length === 0) {
                return res.status(statusCode.OK).json({ message: 'You do not have any message.' });
            }

            // If there are rooms, return the data
            return res.status(statusCode.OK).json({message: "Get messages of room successfully.", rooms: data});
        } catch (err) {
            next(new appError(err));
        }
    },

    sendMessage: async (req, res, next) => {
        try {
            // Get data that client sends
            const {senderId, roomId, content} = req.body;

            const query =
                'insert into tb_message (`content`, `sender_id`, `room_id`) values (?, ?, ?)';
            
            const values = [content, senderId, roomId];

            // Execute the query using your database library
            pool.query(query, values, (err, result) => {
                if (err) {
                  // Handle the error appropriately
                  console.error('Error creating message:', err);
                  return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create message.' });
                }
              });

            // If the query is successful, return a response indicating success
            return res.status(statusCode.OK).json({ message: 'Message created successfully.' });
        } catch (err) {
            next(new appError(err));
        }
    },
};

module.exports = messageController;
