import PostList from "../_components/PostList";

export default async function page() {
    const response = await fetch('https://sqlite-example-vh7p.vercel.app/api/post', {
        cache: 'no-store', // Prevent caching for dynamic SSR
    });
    const data = await response.json();

    return (
        <>
            <h1 className="text-4xl">All Articles</h1>
            <PostList posts={data} />
        </>
    );
}
