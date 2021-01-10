import Link from "next/link";
import firebase from "firebase/app";
import "firebase/firestore";

export async function getServerSideProps() {
  let posts;
  try {
    const snapshot = await firebase
      .firestore()
      .collection("posts")
      .orderBy("timestamp", "desc")
      .get();
    posts = snapshot.docs.map((doc) => {
      const data = doc.data();
      data.timestamp = data.timestamp.valueOf();
      data.id = doc.id;
      return data;
    });
  } catch (error) {
    console.log(error.message);
  }
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <div className="container">
      <div className="list-group mt-4">
        {posts.map((post) => (
          <Link href={`/posts/${encodeURIComponent(post.id)}`} key={post.id}>
            <a
              id="post"
              className="list-group-item list-group-item-action mb-3"
            >
              <h3 className="text-primary">{post.title}</h3>
              <small className="text-muted">{post.author}</small>
              <p>{post.content.slice(0, 35)}...</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
