import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";

export async function getServerSideProps() {
  let posts;
  try {
    const snapshot = await firebase.firestore().collection("posts").get();
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

export default function Post({ posts }) {
  const router = useRouter();
  const { id } = router.query;
  const post = posts.find((p) => p.id == id);

  return (
    <div className="w-75 container mt-5">
      <h1 className="text-primary">{post.title}</h1>
      <small className="text-muted">{post.author}</small>
      <p className="mt-4">{post.content}</p>
    </div>
  );
}
