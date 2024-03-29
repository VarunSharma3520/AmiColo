import React from 'react';
import Link from 'next/link';
import { ThumbsDown, ThumbsUp, Bookmark } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';


const Roomate = ({data}) => {

    /* send  a  matching request to a user */
    async function sendMatchingReq(data) {
        try {
            const response = await axios.post('/api/user/sendmatchingreq',{to_user_id:data} );
            console.log('Response:', response.data);
            if(response.data.status==='success'){
                toast.success(response.data.msg)
            }else{
                toast.error(response.data.msg)
            }
        
        } catch (error) {
            console.error('Error sending matching request:', error);
            toast.error(error.message)
            throw error; 
        }
    }

    return (

        <div
            className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
        >
            <a href="/">
                <img
                    className="mx-auto pt-4 rounded-full center w-40 h-40 "
                    src={data?.avatar ? `/uploads/${data?.avatar}` : "/images/lady.jpg"}
                
                    alt="Roommate photo"
                />
            </a>

            <div className="py-2 px-5">
                <div className="flex justify-center items-center mb-1">
                    <h5 className="text-center mb-2 mr-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {data.first_name+' '+ data.last_name} | 21M
                    </h5>
                    <button className="p-2 text-gray-700 dark:text-white bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-400 dark:focus:ring-gray-400">
                        <Bookmark />
                    </button>
                </div>
                <p className="text-justify mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Adventurer at heart 🌄 | Foodie by choice 🍜 | Storyteller 📖 | Finding joy in the little things | Chasing dreams and sunsets 🌅
                </p>

                <div className="flex justify-center space-x-4">
                    <button className="flex items-center justify-center w-10 h-10 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <ThumbsUp className="w-5 h-5" onClick={() => sendMatchingReq(data.id)} />
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <ThumbsDown className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Roomate;
