"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import gluten from '../../../../public/images/gluten.jpeg'
import vegan from '../../../../public/images/vegan.jpeg'
import vegetarian from '../../../../public/images/vegetarian.jpeg'
import nonvegetarian from '../../../../public/images/nonvegetarian.jpeg'

import new_york from '../../../../public/images/newyouk.jpg'
import london from '../../../../public/images/london.jpeg'
import tokyo from '../../../../public/images/tokyo.jpeg'
import dubai from '../../../../public/images/Dubai.jpeg'

import beach from '../../../../public/images/beach.jpg'
import mountains from '../../../../public/images/mountains.jpeg'
import cityscape from '../../../../public/images/cityscape.jpeg'
import countryside from '../../../../public/images/countryside.jpeg'

import { useUserContext } from '@/context/context';



const Preference = () => {
    const { user, setUser } = useUserContext();
    const [form, setForm] = useState({
        place: "",
        food: "",
        city: "",
    });

    useEffect(() => {
        if (user) {
            setForm({
                place: user?.place || "",
                food: user?.food || "",
                city: user?.city || "",
            })
        }
    }, [user])

    const prefence = [
        {
            heading: "What best describes your place preferences?",
            type: "place",
            data: [
                {
                    img: beach,
                    value: "Beach"
                },
                {
                    img: mountains,
                    value: "Mountains"
                },
                {
                    img: cityscape,
                    value: "Cityscape"
                },
                {
                    img: countryside,
                    value: "Countryside"

                }
            ]
        },
        {

            heading: "What best describes your food preferences?",
            type: "food",
            data: [
                {
                    img: vegetarian,
                    value: "vegetarian"
                },
                {
                    img: nonvegetarian,
                    value: "non-vegetarian"
                },
                {
                    img: vegan,
                    value: "vegan"
                },
                {
                    img: gluten,
                    value: "gluten-free"
                }
            ]
        },
        {
            heading: "What best describes your City preferences?",
            type: "city",
            data: [
                {
                    img: new_york,
                    value: "New York"
                },
                {
                    img: london,
                    value: "London"
                },
                {
                    img: tokyo,
                    value: "Tokyo"
                },
                {
                    img: dubai,
                    value: "Dubai"
                }
            ]
        }
    ];


    const handleSubmit = async () => {
        try {
            console.log("Enter")
            const formData = new FormData();
            // Append form data
            formData.append("place", form.place);
            formData.append("city", form.city);
            formData.append("food", form.food);

            console.log("object", formData)
            const res = await axios.post(`/api/user/update_profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            // Handle response
            console.log(res.data);
            setUser(res.data?.getUser[0])
            if (res.success) {
                toast.success("Profile Update Successfully")
            }
        } catch (e) {
            // Handle errors here
            console.error(e);
        }
    };



    return (
        <div className="w-2/4 mx-auto mt-10 leading-10">
            <div className="w-full flex items-center justify-between mb-4 gap-2">
                <Link href="/profile/edit" className="w-1/2 text-center bg-gray-300 text-2xl font-bold px-3 py-2 rounded-3xl">
                    Edit Profile
                </Link>
                <Link href="/profile/preference" className="w-1/2 text-center bg-gray-300 text-2xl font-bold px-3 py-2 rounded-3xl">
                    Your Preferences
                </Link>
            </div>
            <div>
                {prefence.map((data, index) => (
                    <div
                        className="leading-10"
                        key={index}
                    >
                        <p className="font-semibold">
                            {data.heading}
                        </p>
                        <div className="flex items-center justify-around">
                            {data.data.map((value, index) => (
                                <span
                                    className="flex flex-col items-center gap-3 "
                                    key={index}
                                    onClick={() => setForm(prevForm => ({ ...prevForm, [data.type]: value.value }))}
                                >
                                    <Image
                                        className="w-24 h-20  transition-all duration-300 ease-linear hover:scale-110"
                                        src={value.img}
                                        alt="Image"
                                        width={96}
                                        height={80}
                                    />
                                    {console.log("Form DATA", form?.[data.type])}
                                    {value.value === form?.[data.type] || value.value === user?.[data.type] ?

                                        < FaHeart className={`${value.value === form?.[data.type] ? "fill-red-700" : ""} text-xl transition-all duration-300 ease-linear hover:text-2xl`} /> :
                                        <FaRegHeart className={`${value.value === form?.[data.type] ? "fill-red-700" : ""}  transition-all duration-300 ease-linear hover:text-2xl`} />
                                    }
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="flex justify-end mt-6">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Preference;
