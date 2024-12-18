import PostList from "../_components/PostList";

export default async function page() {
    const response = await fetch('http://localhost:8000/api/post');
    const data = await response.json();
    //console.log(data);

    return(
        <>
            <PostList posts={data} />
        </>
    )
}