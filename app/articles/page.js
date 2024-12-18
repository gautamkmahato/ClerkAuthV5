import PostList from "../_components/PostList";

export default async function page() {
    const response = await fetch('http://localhost:8000/api/post', {
        cache: 'no-store', // Prevent caching for dynamic SSR
    });
    const data = await response.json();

    return (
        <>
            <PostList posts={data} />
        </>
    );
}
