import React, { useState, useEffect } from 'react'
import { MdFavorite } from 'react-icons/md'
import useAuthStore from '../store/authStore'

interface IProps {
    likes: any[]
    handleLike: () => void;
    handleDislike: () => void;
}


const LikeButton = ({ likes, handleLike, handleDislike }: IProps) => {
    const [alreaduLiked, setAlreadyLiked] = useState(false)
    const { userProfile }: any = useAuthStore();
    const filterLikes = likes?.filter((item) => item._ref === userProfile?._id)

    useEffect(() => {
        if (filterLikes?.length > 0) {
            setAlreadyLiked(true)
        } else (setAlreadyLiked(false))
    }, [filterLikes, likes])


    return (
        <div className=' flex gap-6'>
            <div className='mt-4 flex justify-center items-center cursor-pointer '>
                {alreaduLiked ? (
                    <div className=' bg-primary rounded-full justify-center p-2 md:p-4 text-[#fe2c55] '
                        onClick={handleDislike}

                    >
                        <MdFavorite className='text-lg w-[20px] h-[20px] md:text-2xl' />
                    </div>
                ) : (
                    <div className=' bg-primary rounded-full justify-center p-2 md:p-4 '
                        onClick={handleLike}

                    >
                        <MdFavorite className='text-lg w-[20px] h-[20px] md:text-2xl' />
                    </div>
                )}
                <p className=' text-md font-semibold '>
                    {likes?.length || 0}
                </p>
            </div>
        </div>
    )
}

export default LikeButton
