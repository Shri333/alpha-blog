import React from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default function NewPost({ user }) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [validation, setValidation] = React.useState("needs-validation");
  const router = useRouter();

  async function addPost(event) {
    event.preventDefault();
    if (title && content) {
      try {
        await firebase.firestore().collection("posts").add({
          timestamp: firebase.firestore.Timestamp.now(),
          author_uid: user.uid,
          title: title,
          author: user.displayName,
          content: content,
        });
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      setValidation("has-validated");
    }
  }

  return (
    <div className="container mt-4">
      <h1 className="text-primary">Create a New Post</h1>
      <form className={validation} onSubmit={addPost} noValidate>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content:
          </label>
          <textarea
            className="form-control"
            id="content"
            rows="7"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
