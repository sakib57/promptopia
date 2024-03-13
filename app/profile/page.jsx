"use client"
import Profile from '@/components/Profile';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const userId = session?.user.id;
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      setPosts(data);
    }
  
    if(userId) fetchPosts();
  },[userId])
  
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  }
  const handleDelete = async (post) => {
    const hasConfirmrd = confirm("Are you sure, want to delete this prompt?");
    if(hasConfirmrd){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`,{
          method: "DELETE",
        });
        const filteredPost = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPost);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Profile
      name="Sakibs"
      desc="description"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile