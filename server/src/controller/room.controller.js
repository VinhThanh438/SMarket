const pool = require('../config/connectDB');
const { statusCode } = require('../until/httpResponse');
const appError = require('../errors/appError');
require('dotenv').config();

const roomController = {
    getRoomsOfUser: async (req, res, next) => {
        try {
            const {userId} = req.body;

            const query = 'select r.* from tb_room r inner join tb_user u on u.user_id = r.sender_id or u.user_id = r.receiver_id where u.user_id = ?';
            
            const [data] = await pool.query(query, [userId]);

            // Check if data is empty or not
            if (data.length === 0) {
                return res.status(statusCode.OK).json({ message: 'You do not have any room.' });
            }

            // If there are rooms, return the data
            return res.status(statusCode.OK).json({message: "Get rooms of you successfully.", rooms: data});
        } catch (err) {
            next(new appError(err));
        }
    },

    // roomName: name of friend (receiver)
    createRoom: async (req, res, next) => {
        try {
            // Get data that client sends
            const {senderId, receiverId, roomName} = req.body;

            // Check room exists ?
            const q = 'select * from tb_room where sender_id = ? and receiver_id = ?';
            const [roomExists] = await pool.query(q, [senderId, receiverId]);
            if (roomExists.length > 0) {
                return res.status(statusCode.OK).json({ message: 'Get room existing', room: roomExists });
            }

            // Create a new room
            const query =
                'insert into tb_room (room_name, sender_id, receiver_id) values (?, ?, ?)';
            
            const values = [roomName, senderId, receiverId];

            // Execute the query using your database library
            pool.query(query, values, (err, result) => {
                if (err) {
                    // Handle the error appropriately
                    console.error('Error creating room:', err);
                    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create room.' });
                }
            });
            // If the query is successful, return a response indicating success
            return res.status(statusCode.OK).json({ message: 'Room created successfully.' });
        } catch (err) {
            next(new appError(err));
        }
    },

    /*
    Clients:
        - When clicks remove room, call api `remove all messages`
        - Check messages in room: empty ? hidden room : show room
    */
    removeRoom: (req, res, next) => {
        try {
          
      } catch (err) {
          next(new appError(err));
      }
  },
};

module.exports = roomController;
