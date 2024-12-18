import React from 'react'

export default function PostCard({ id, title, content, created_at }) {
    return (
        <>
            <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    className="h-56 w-full object-cover"
                />

                <div className="bg-white p-4 sm:p-6">
                    <time  className="block text-xs text-gray-500">{created_at}</time>

                    <a href={`articles/${id}`}>
                        <h3 className="mt-0.5 text-lg text-gray-900">{title}</h3>
                    </a>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">{content}</p>
                </div>
            </article>
        </>
    )
}
