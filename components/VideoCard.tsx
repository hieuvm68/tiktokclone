import { NextPage } from 'next'
import React, { useState, useEffect, useRef } from 'react'
import { Video } from '../types';
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi"
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs"
import { GoVerified } from "react-icons/go"
import LikeButton from './LikeButton'
import useAuthStore from '../store/authStore'
import { BASE_URL } from '../utils'
import axios from 'axios'



interface IProps {
    post: Video
}
const VideoCard: NextPage<IProps> = ({ post }: IProps) => {
    const [postAt, setPostAt] = useState(post)
    // const [isHover, setIsHover] = useState(false);
    const [playing, setPlaying] = useState(false);
    // const [isVideoMuted, setIsVideoMuted] = useState(false);
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

    // const onVideoPress = () => {
    //     if (playing) {
    //         videoRef?.current?.pause();
    //         setPlaying(false);
    //     }
    //     else {
    //         videoRef?.current?.play();
    //         setPlaying(true);
    //     }
    // }
    // useEffect(() => {
    //     if (videoRef?.current) {
    //         videoRef.current.muted = isVideoMuted
    //     }
    // }, [postAt, isVideoMuted])

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
                    // onMouseEnter={() => setIsHover(true)}
                    // onMouseLeave={() => setIsHover(false)}
                    className='flex-initial flex-row h-[calc(450px+(100vw-768px)/1152*100)] w-[calc(100%+400px)]'>

                    <Link href={`/detail/${postAt._id}`} >
                        <video
                            playsInline={true}
                            tabIndex={2}
                            crossOrigin="anonymous"
                            controlsList='nodownload noremoteplayback noseeking'
                            loop
                            ref={videoRef}
                            className='w-auto h-[auto] pr-3 cursor-pointer bottom-0'
                            src={postAt.video.asset.url}
                        >

                        </video>

                    </Link>
                    {/* 
                    {isHover && (
                        <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between z-10'>
                            {!playing ? (
                                <button onClick={onVideoPress}>
                                    <BsFillPlayFill
                                        className='text-white text-2xl lg:text-4xl' />
                                </button>
                            ) : (
                                <button onClick={onVideoPress}>
                                    <BsFillPauseFill
                                        className='text-white text-2xl lg:text-4xl'
                                    />
                                </button>

                            )
                            }
                            {isVideoMuted ? (
                                <button onClick={() => setIsVideoMuted(false)}>
                                    <HiVolumeOff
                                        className='text-white text-2xl lg:text-4xl'
                                    />
                                </button>
                            ) : (
                                <button onClick={() => setIsVideoMuted(true)}>
                                    <HiVolumeUp
                                        className='text-white text-2xl lg:text-4xl' />
                                </button>
                            )
                            }
                        </div>
                    )} */}

                </div>
                <div className=' mt-10 px-10'>
                    {userProfile && (
                        <LikeButton
                            likes={postAt.likes}
                            handleLike={() => handleLike(true)}
                            handleDislike={() =>
                                handleLike(false)} />
                    )}
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