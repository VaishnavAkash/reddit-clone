'use client';

import Link from 'next/link';
import React from 'react';
import SadAvatar from '@/assets/upsetLogo.jpg';
import Image from 'next/image';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div>
            <Image src={SadAvatar} className='w-[50rem] h-[30rem]' width='' height=''  alt='reddit logo'/>
        </div>
      <div className="text-4xl font-bold mb-4 text-red-500">Error</div>
      <p className="text-lg text-gray-700 mb-8">
        Oops! Something went wrong. Please try again later.
      </p>
      <Link href='/'><button
        className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
        Go Back
      </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
