import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import CustomAlert from '../../../Components/CustomAlert/CustomAlert';

const PostList = () => {
    const { data: posts = [], refetch } = useQuery({
      queryKey: ["posts"],
      queryFn: () =>
        fetch(
          `https://kin-server-side-rejoyanislam.vercel.app/api/v1/post`
        ).then((res) => res.json()),
    });

    const postDelete = (id) => {
      axios
        .delete(
          `https://kin-server-side-rejoyanislam.vercel.app/api/v1/post/${id}`
        )
        .then((res) => {
          if (res.status === 200) {
            refetch();
            toast.custom(<CustomAlert>Successfully Deleted</CustomAlert>, {
              duration: 1000,
            });
           
            console.log(res);
          }
        })
        .catch((result) => console.log(result));
    };
    return (
      <section>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="">
              <tr>
                <th></th>
                <th>Title</th>
                <th>Photo</th>
                <th>Publish Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.result?.map((post, index) => (
                <tr className="hover" key={post?._id}>
                  <th>{index + 1}</th>
                  <td>{post?.title}</td>
                  <td>
                    <PhotoProvider>
                      <PhotoView src={post?.photo}>
                        <img
                          src={post?.photo}
                          className="w-16 cursor-pointer"
                          alt=""
                        />
                      </PhotoView>
                    </PhotoProvider>
                  </td>
                  <td>
                    {" "}
                    {post?.time?.day} &nbsp;
                    {post?.time?.publish} {post?.time?.month} &nbsp;
                    {post?.time?.year}
                  </td>
                  <td>
                    <button
                      className="mx-2 border px-3 py-1 border-zinc-300 bg-zinc-200"
                      onClick={() => postDelete(post._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
};

export default PostList;