
export default async function page({ params }) {
    const { id } = await params;
    const response = await fetch(`http://localhost:8000/api/post/${id}`);
    const data = await response.json();
    //console.log(data)
    return (
        <>
            <h1>{data.title}</h1>
            <p>{data.created_at}</p>
            <p>{data.content}</p>
        </>
    )
}
