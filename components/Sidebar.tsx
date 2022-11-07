import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiFillHome, AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { RiLiveLine } from 'react-icons/ri';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';

import Footer from './Footer';
import useAuthStore from '../store/authStore';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

import { createOrGetUser } from '../utils';
const Sidebar: NextPage = () => {
    const [showSidebar, setShowSidebar] = useState<Boolean>(true);
    const { pathname } = useRouter();
    // const { fetchAllUsers, allUsers }: any = useAuthStore();

    const activeLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#fe2c55] rounded';

    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded';
    const { userProfile, addUser, removeUser } = useAuthStore()

    return (
        <div>
            {/* <div
                className='block xl:hidden m-2 ml-4 mt-3 text-xl'
                onClick={() => setShowSidebar(!showSidebar)}
            >
                {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
            </div> */}
            {showSidebar && (
                <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 '>
                    <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
                        <Link href='/'>
                            <div className={pathname === '/' ? activeLink : normalLink}>
                                <p className='text-2xl font-bold'>
                                    <AiFillHome />
                                </p>
                                <span className='capitalize text-[18px] hidden xl:block font-bold'>
                                    For You
                                </span>

                            </div>
                        </Link>
                        <Link href='/following'>
                            <div className={pathname === '/following' ? activeLink : normalLink}>
                                <p className='text-2xl font-bold'>
                                    <BsPeople />
                                </p>
                                <span className='capitalize text-[18px] hidden xl:block font-bold'>
                                    Following
                                </span>

                            </div>


                        </Link>
                        <Link href='/live'>
                            <div className={pathname === '/live' ? activeLink : normalLink}>

                                <p className='text-2xl font-bold'>
                                    <RiLiveLine />
                                </p>
                                <span className='capitalize text-[18px] hidden xl:block font-bold'>
                                    LIVE
                                </span>

                            </div>


                        </Link>




                    </div>
                    {
                        userProfile ? (
                            <div
                                className="flex gap-5 md:gap-10">


                            </div>
                        ) : (
                            <div className='px-2 py-4 hidden xl:block'>
                                <p className='text-gray-400 '>Login to like and comment on videos</p>

                                <div className='text-[#fe2c55] bg-[#ffffff] border-2 border-solid	rounded border-[#fe2c55] min-w-[168px] min-h-[48px] text-=[18px] font-bold leading-6 flex relative justify-center items-center py-[6px] px-[8px] cursor-pointer select-none w-full mt-[20px] hover:bg-[#fe2c550f] '>


                                    <button onClick={() => { }}>Login</button>
                                </div>
                            </div>

                        )
                    }
                    <Discover />
                    <SuggestedAccounts
                    // fetchAllUsers={fetchAllUsers}
                    // allUsers={allUsers}
                    />
                    <Footer />
                </div>
            )
            }
        </div >
    );
};

export default Sidebar;