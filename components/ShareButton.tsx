import React, { useState } from 'react'
import { IoMdShareAlt } from 'react-icons/io'
import {
    EmailIcon,
    EmailShareButton,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";
import FacebookIcon from 'react-share/lib/FacebookIcon';

interface IProps {
    share: any

}
const ShareButton = ({ share }: IProps) => {
    const [openShare, setOpenShare] = useState(false)
    const [isHover, setIsHover] = useState(false);

    const handleOpenShare = () => {
        setOpenShare(true)
    }
    return (
        <div onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
            {
                !isHover ? (
                    <div className='absolute flex gap-6'>
                        <div className='mt-4 flex justify-center items-center cursor-pointer '>
                            <div className=' bg-primary rounded-full justify-center p-2 md:p-4 '>
                                <IoMdShareAlt className='text-lg w-[20px] h-[20px] md:text-2xl' onClick={handleOpenShare} />
                            </div>
                        </div>
                    </div>

                ) :
                    (
                        <div className='absolute flex gap-6'>
                            <div className=' mt-4 flex justify-center items-center cursor-pointer '>
                                <div className=' bg-primary flex rounded-full justify-center p-1 md:p-4   '>

                                    <FacebookShareButton className='m-0' url={`https://tiktokclone-olive.vercel.app/detail/${share}`}>
                                        <FacebookIcon size={28} className='rounded-full ' />
                                    </FacebookShareButton>
                                    <EmailShareButton className='m-0' url={`https://tiktokclone-olive.vercel.app/detail/${share}`}>
                                        <EmailIcon size={28} className='rounded-full ' />
                                    </EmailShareButton>

                                    <TwitterShareButton className='m-0' url={`https://tiktokclone-olive.vercel.app/detail/${share}`}>
                                        <TwitterIcon size={28} className='rounded-full my-0 ' />
                                    </TwitterShareButton>
                                    <TelegramShareButton className='m-0' url={`https://tiktokclone-olive.vercel.app/detail/${share}`}>
                                        <TelegramIcon size={28} className='rounded-full ' />
                                    </TelegramShareButton>

                                    <LinkedinShareButton className='m-0' url={`https://tiktokclone-olive.vercel.app/detail/${share}`}>
                                        <LinkedinIcon size={28} className='rounded-full ' />
                                    </LinkedinShareButton>
                                    <WhatsappShareButton className='m-0' url={`https://tiktokclone-olive.vercel.app/detail/${share}`}>
                                        <WhatsappIcon size={28} className='rounded-full ' />
                                    </WhatsappShareButton>
                                </div>
                            </div>
                        </div>


                    )

            }
        </div>
        // <div className=' flex gap-6' >
        //     <div className='mt-4 flex justify-center items-center cursor-pointer '>
        //         <div className=' bg-primary rounded-full justify-center p-2 md:p-4 ' onMouseEnter={() => setIsHover(true)}
        //             onMouseLeave={() => setIsHover(false)}>


        //             {
        //                 isHover ? (
        //                     <div className='z-4 flex bg-red-900'>

        //                         <FacebookShareButton className='m-0' url={`https://tiktokclone-olive.vercel.app/detail/${share}`}>
        //                             <FacebookIcon className='text-lg w-[20px] h-[20px] md:text-2xl' />
        //                         </FacebookShareButton>
        //                         <EmailShareButton className='m-0' url={`https://tiktokclone-olive.vercel.app/detail/${share}`}>
        //                             <EmailIcon className='text-lg w-[20px] h-[20px] md:text-2xl' />
        //                         </EmailShareButton>

        //                         <TwitterShareButton className='m-0' url={`https://tiktokclone-olive.vercel.app/detail/${share}`}>
        //                             <TwitterIcon className='text-lg w-[20px] h-[20px] md:text-2xl' />
        //                         </TwitterShareButton>
        //                         <TelegramShareButton className='m-0' url={`https://tiktokclone-olive.vercel.app/detail/${share}`}>
        //                             <TelegramIcon className='text-lg w-[20px] h-[20px] md:text-2xl' />
        //                         </TelegramShareButton>

        //                         <LinkedinShareButton className='m-0' url={`https://tiktokclone-olive.vercel.app/detail/${share}`}>
        //                             <LinkedinIcon className='text-lg w-[20px] h-[20px] md:text-2xl' />
        //                         </LinkedinShareButton>
        //                         <WhatsappShareButton className='m-0' url={`https://tiktokclone-olive.vercel.app/detail/${share}`}>
        //                             <WhatsappIcon className='text-lg w-[20px] h-[20px] md:text-2xl' />
        //                         </WhatsappShareButton>

        //                     </div>
        //                 ) : (

        //                     <IoMdShareAlt className='text-lg w-[20px] h-[20px] md:text-2xl' onClick={handleOpenShare} />
        //                 )
        //             }


        //         </div>
        //     </div>
        // </div >

    )
}

export default ShareButton

