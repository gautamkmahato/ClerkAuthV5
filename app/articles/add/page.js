'use client'

import { useAuth } from "@clerk/nextjs";
import { useState } from "react"

export default function Add() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const { userId } = useAuth();

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const data = {
            title: title,
            content: content,
            user_id: userId, 
            category_id: "2", 
            image_url: "https://www.youtube.com"
        }
        console.log(data)
        const response = await fetch('https://sqlite-example-vh7p.vercel.app/api/post/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        })
        const result = await response.json();
        console.log(result);
    }

    const demo = () =>{
        console.log(title);
        console.log(content)
    }

    return (
        <>
            <section className="bg-gray-100">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                        <div className="lg:col-span-2 lg:py-12">
                            <p className="max-w-xl text-lg">
                                At the same time, the fact that we are wholly owned and totally independent from
                                manufacturer and other group control gives you confidence that we will only recommend what
                                is right for you.
                            </p>

                            <div className="mt-8">
                                <a href="#" className="text-2xl font-bold text-pink-600"> 0151 475 4450 </a>

                                <address className="mt-2 not-italic">282 Kevin Brook, Imogeneborough, CA 58517</address>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                            <form onSubmit={handleSubmit}  className="space-y-4">
                                <div>
                                    <label className="sr-only" htmlFor="Title">Title</label>
                                    <input
                                        className="w-full rounded-lg border-red-400 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Title"
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => {setTitle(e.target.value)}}
                                    />
                                </div>

                                <div>
                                    <label className="sr-only" htmlFor="Content">Content</label>

                                    <textarea
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Content"
                                        rows="8"
                                        id="content"
                                        value={content}
                                        onChange={(e) => {setContent(e.target.value)}}
                                    ></textarea>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                    >
                                    Add New Post
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
