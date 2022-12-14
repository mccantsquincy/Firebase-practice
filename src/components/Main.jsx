import React from "react";
import "../App.css";
import { db } from "../firebase/init";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import userEvent from "@testing-library/user-event";

function Main() {

  // function to update posts
  function updatePost() {
    const Id = 'Fq2IrpN9zYqLCmTpkGZV'
    const postRef = doc(db, "posts", Id);
    const newPost = {
        description: "finish frontend simplified",
        uid: "2",
        title: "Land a $300k job as a Blockchain dev",
    };
    updateDoc(postRef, newPost);
  }

  // Delete post
  function deletePost() {
    const Id = 'Fq2IrpN9zYqLCmTpkGZV'
    const postRef = doc(db, "posts", Id);
    deleteDoc(postRef)
  }

  // function to create post in posts collection  
  function createPost(user) {
    const post = {
      title: "Create my very own DAPP",
      description: "Become a Web3 developer",
      uid: user.Uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  // Read all posts
  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id 
    }))
    console.log(posts)
  }

  // Read posts by ID
  async function getPostById() {
    const Id = 'Fq2IrpN9zYqLCmTpkGZV'
    const postRef = doc(db, "posts", Id);
    const postSnap = await getDoc(postRef);
    const post = postSnap.data();
    console.log(post);
    }

  // Read post by Query
  async function getPostByUid(user) {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", "1")  
    )
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()))
  }
  

  return (
    <div className="main">
      <h1>Create Post</h1>
      <button className="main__btn" onClick={createPost}>Create post</button>
      <h1>Get all Posts</h1>
      <button className="main__btn" onClick={getAllPosts}>Get posts</button>
      <h1>Get Post by ID</h1>
      <button className="main__btn" onClick={getPostById}>Get post by ID</button>
      <h1>Get Post by UID</h1>
      <button className="main__btn" onClick={getPostByUid}>Get post by ID</button>
      <h1>Update Post</h1>
      <button className="main__btn" onClick={updatePost}>Update post</button>
      <h1>Delete Post</h1>
      <button className="main__btn" onClick={deletePost}>Delete post</button>
    </div>
  );
}

export default Main;
