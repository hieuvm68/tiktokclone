import { NextPage } from 'next'
import React, { useState, useEffect, useRef } from 'react'
import { Video } from '../types';
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from "react-icons/go"
import LikeButton from './LikeButton'
import useAuthStore from '../store/authStore'
import { BASE_URL } from '../utils'
import axios from 'axios'
import { debounce } from 'lodash';
import LengthComments from './LengthComment';

import ShareButton from './ShareButton';



interface IProps {
    post: Video,
    itemIndex: number,
}
const VideoCard: NextPage<IProps> = ({ post }: IProps) => {
    const [postAt, setPostAt] = useState(post)
    const [playing, setPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null)
    const { userProfile }: any = useAuthStore()

    const handleLike = async (like: boolean) => {
        if (userProfile) {
            const { data } = await axios.put(`${BASE_URL}/api/like`, {
                userId: userProfile._id,
                postId: postAt._id,
                like
            })
            setPostAt({ ...postAt, likes: data.likes })

        }

    }

    if (!postAt) return null;

    useEffect(() => {

        if (videoRef?.current) {
            videoRef.current.muted = !isVideoMuted;
        }
        window.addEventListener('scroll', debounce(handleScroll, 200))

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [isVideoMuted, postAt])

    const startVideo = () => {
        videoRef?.current?.play();
        setPlaying(false);

    }

    const pauseVideo = () => {
        videoRef?.current?.pause();
        setPlaying(true);
    }

    const handleScroll = () => {
        if (playing) {
            pauseVideo();
            setIsVideoMuted(true)
        }
        else {
            setIsVideoMuted(false)

            startVideo();
        }
    }

    const handleVideoPress = () => {
        if (playing) {
            startVideo();

        } else {

            pauseVideo();
        }
    };





    return (
        <div className='flex flex-col pb-6'>
            <div>
                <div className=' flex gap-3 p-2 cursor-pointer font-semibold rounded-full'>
                    <div className='md:w-16 md:h-16 w-10 h-10'>
                        <Link href={`/profile/${postAt.postedBy._id}`}>
                            <>
                                <Image
                                    width={62}
                                    height={62}
                                    className="rounded-full"
                                    src={postAt.postedBy.image}
                                    alt="profile phoot"
                                    layout='responsive'
                                />
                            </>
                        </Link>
                    </div>
                    <div>
                        <Link href={`/profile/${postAt.postedBy._id}`}>
                            <div className='flex items-center gap-2'>
                                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>{postAt.postedBy.userName}
                                    {``}
                                </p>
                                <GoVerified className='text-blue-400 text-md' />
                                <p className='capitalize text-[14px] font-medium text-xs text-primary hidden md:block '>{postAt.postedBy.userName}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='lg:ml-20 flex gap-4 relative max-w-[1071px] '>
                <div
                    className='flex-initial flex-row h-[calc(400px+(100vw-768px)/400*100)] w-[calc(100%+400px)]'>

                    <Link href={`/detail/${postAt._id}`}  >
                        <video
                            autoPlay
                            onClick={handleVideoPress}
                            loop
                            controls
                            ref={videoRef}
                            className='w-auto h-[100%] pr-3 cursor-pointer bottom-0 '
                            src={postAt.video.asset.url}
                        >

                        </video>

                    </Link>
                </div>
                <div className='flex flex-col mt-10 px-10 justify-end '>
                    {userProfile && (
                        <LikeButton
                            likes={postAt.likes}
                            handleLike={() => handleLike(true)}
                            handleDislike={() =>
                                handleLike(false)} />

                    )}
                    <LengthComments
                        comments={post.comments}
                    />
                    <ShareButton share={postAt._id} />

                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ params: { id }
}: { params: { id: string } }) => {
    const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

    return {
        props: { post: data }
    }
}
export default VideoCard

