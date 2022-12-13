import React, { Dispatch, SetStateAction } from 'react'
import { AiFillMessage } from 'react-icons/ai'


interface IProps {
    comments: IComment[]
}

interface IComment {
    comment: string,
    length?: number;
    _key: string;
    postedBy: { _ref: string; _id: string }
}

const LengthComments = ({ comments }: IProps) => {



    return (
        <div className=' flex gap-6'>
            <div className='mt-4 flex justify-center items-center cursor-pointer '>

                <div className=' bg-primary rounded-full justify-center p-2 md:p-4 '


                >
                    <AiFillMessage className='text-lg w-[20px] h-[20px] md:text-2xl' />
                </div>

                <p className=' text-md font-semibold '>
                    {
                        comments?.length || 0
                    }
                </p>
            </div>
        </div>
    )
}

export default LengthComments
