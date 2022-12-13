import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

import Comments from '../../components/Comments';
import { BASE_URL } from '../../utils';
import LikeButton from '../../components/LikeButton';
import useAuthStore from '../../store/authStore';
import { Video } from '../../types';
import axios from 'axios';
import LengthComments from '../../components/LengthComment';

interface IProps {
    postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
    const [post, setPost] = useState(postDetails);
    const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
    const [comment, setComment] = useState<string>('');

    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();

    const { userProfile }: any = useAuthStore();


    const handleLike = async (like: boolean) => {
        if (userProfile) {
            const res = await axios.put(`${BASE_URL}/api/like`, {
                userId: userProfile._id,
                postId: post._id,
                like
            });
            setPost({ ...post, likes: res.data.likes });
        }
    };

    const addComment = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (userProfile) {
            if (comment) {
                setIsPostingComment(true);
                const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
                    userId: userProfile._id,
                    comment,
                });

                setPost({ ...post, comments: res.data.comments });
                setComment('');
                setIsPostingComment(false);
            }
        }
    };

    return (
        <>
            {post && (
                <div className='flex flex-shrink-0 flex-grow-0 flex-[544px] w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
                    <div className='relative w-[1000px] lg:w-10/12 flex justify-center items-center bg-black bg-cover bg-center'>
                        <div className='opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
                            <p className='cursor-pointer ' onClick={() => router.back()}>
                                <MdOutlineCancel className='text-white text-[35px] hover:opacity-90' />
                            </p>
                        </div>
                        <div className='relative'>
                            <div className='lg:h-[100vh] h-[60vh]'>
                                <video
                                    autoPlay
                                    controls
                                    ref={videoRef}
                                    // onClick={onVideoClick}
                                    loop
                                    src={post?.video?.asset.url}
                                    className=' h-full cursor-pointer'
                                ></video>
                            </div>
                        </div>

                    </div>
                    <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
                        <div className='lg:mt-20 mt-10'>
                            <Link href={`/profile/${post.postedBy._id}`}>
                                <div className='flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer'>
                                    <Image
                                        width={60}
                                        height={60}
                                        alt='user-profile'
                                        className='rounded-full'
                                        src={post.postedBy.image}
                                    />
                                    <div>
                                        <div className='text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center'>
                                            {post.postedBy.userName.replace(/\s+/g, '')}{' '}
                                            <GoVerified className='text-blue-400 text-xl' />
                                        </div>
                                        <p className='text-md'> {post.postedBy.userName}</p>
                                    </div>
                                </div>
                            </Link>
                            <div className='px-10  '>
                                <p className='line-clamp-2 text-md text-gray-600 box-border overflow-hidden'>{post.caption}</p>
                            </div>
                            <div className='flex '>
                                <div className='mt-10 px-5'>
                                    {userProfile &&

                                        <LikeButton
                                            likes={post.likes}
                                            handleLike={() => handleLike(true)}
                                            handleDislike={() => handleLike(false)}
                                        />
                                    }
                                </div>
                                <div className='mt-10'>
                                    <LengthComments
                                        comments={post.comments}
                                    />
                                </div>
                            </div>

                            <Comments


                                comment={comment}
                                setComment={setComment}
                                addComment={addComment}
                                comments={post.comments}
                                isPostingComment={isPostingComment}

                            />

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export const getServerSideProps = async ({
    params: { id },
}: {
    params: { id: string };
}) => {
    const res = await axios.get(`${BASE_URL}/api/post/${id}`);

    return {
        props: { postDetails: res.data },
    };
};

export default Detail;