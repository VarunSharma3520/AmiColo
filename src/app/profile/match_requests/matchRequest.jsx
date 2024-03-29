
import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const MatchRequest = ({ user, handlematchReq }) => {
    const acceptFriendReq = async (from_id) => {
        try {
            const response = await axios.post("/api/user/matchrequest/accept", {
                from_id: from_id,
            });
            handlematchReq(from_id);
            toast.success("Friend request accepted");
            // Add any additional logic upon successful acceptance
        } catch (error) {
            console.error("Error accepting friend request:", error.message);
            // Notify the user of the error
            toast.error("Failed to accept friend request");
        }
    };

    const declineFriendReq = async (from_id) => {
        try {
            const response = await axios.post("/api/user/matchrequest/decline", {
                from_id: from_id,
            });
            handlematchReq(from_id);
            toast.success("Friend request decline");
            // Add any additional logic upon successful decline
        } catch (error) {
            console.error("Error declining friend request:", error.message);
            // Notify the user of the error
            toast.error("Failed to decline friend request");
        }
    };

    return (
        <div className="bg-white p-4 shadow-md rounded-md">
            <div className="flex items-center">
                <img
                    src={`https://placekitten.com/50/50?image=${user.id}`} // Replace with your actual user avatar
                    alt={`Avatar of ${user.first_name}`}
                    className="rounded-full h-10 w-10 object-cover"
                />
                <div className="ml-4">
                    <h2 className="text-lg font-semibold">
                        {user.first_name} {user.last_name}
                    </h2>
                    <p className="text-gray-500">{user.email}</p>
                </div>
            </div>

            {/* Add buttons or other actions as needed */}
            <div className="mt-4">
                <button
                    onClick={() => acceptFriendReq(user.from_id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md">
                    Accept
                </button>
                <button
                    onClick={() => declineFriendReq(user.from_id)}
                    className="bg-gray-300 text-gray-700 ml-2 px-3 py-1 rounded-md">
                    Decline
                </button>
            </div>
        </div>
    );
};

export default MatchRequest;
