'use client'
import React from 'react';
import { Text } from 'rizzui';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { useSearchParams } from 'next/navigation';


interface VerifyEmailProps {
}
function VerifyEmail(props: VerifyEmailProps) {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg">
        <div className='flex'>
          {/* <svg
            className='mx-auto'
            xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 962 489" version="1.1"><path d="M 659 78.663 C 613.890 83.080, 573.378 99.918, 538.064 128.928 C 533.091 133.013, 529.173 136.507, 529.358 136.691 C 529.542 136.875, 532.615 135.926, 536.186 134.582 C 568.535 122.406, 599.530 126.328, 631.155 146.600 C 661.804 166.245, 691.942 201.947, 718.063 249.553 C 726.943 265.737, 736.828 286.567, 742.118 300.243 L 745.500 308.987 847.750 308.993 C 903.987 308.997, 950 308.765, 950 308.478 C 950 307.265, 941.541 291.324, 932.572 275.636 C 863.127 154.171, 781.508 87.328, 692.500 79.027 C 682.144 78.062, 666.840 77.895, 659 78.663" stroke="none" fill="#1c4463" fillRule="evenodd" /><path d="M 512.884 2.560 C 428.326 10.585, 355.961 37.507, 278 89.942 C 227.351 124.008, 170.279 177.432, 128.746 229.658 C 77.430 294.188, 39.026 363.174, 15.827 432.500 C 8.290 455.025, -0.203 487.987, 1.377 488.587 C 1.995 488.821, 81.475 488.898, 178 488.757 L 353.500 488.500 355.629 480 C 356.799 475.325, 359.899 462.725, 362.516 452 C 374.175 404.225, 392.698 343.458, 407.326 305 C 442.420 212.733, 479.619 149.626, 524.632 105.996 C 545.377 85.888, 561.701 74.110, 583.500 63.521 C 601.602 54.727, 617.800 49.605, 636.094 46.891 C 648.036 45.119, 676.198 45.397, 689 47.412 C 728.192 53.584, 773.464 74.343, 811 103.355 C 814.575 106.118, 816.866 107.599, 816.091 106.645 C 815.315 105.691, 807.890 99.823, 799.591 93.604 C 734.215 44.622, 666.390 15.357, 595.415 5.506 C 563.269 1.045, 538.256 0.152, 512.884 2.560" stroke="none" fill="#246c94" fillRule="evenodd" /></svg> */}
        </div>
        <h1 className="text-2xl font-semibold mb-4">Please verify your email</h1>
        <p className="text-gray-600 leading-loose">
          {`You're almost there! We sent an email to `}
        </p>
        <span className="font-semibold text-black ">{email}</span>.
        <p className="text-gray-600 mt-6 leading-tight">
          {`
           Just click on the link in that email to complete your signup. If you
          don't see it, you may need to check your spam folder.
          `}
        </p>

        <p className="mx-auto mt-6 text-center leading-loose text-gray-500 lg:mt-8 ">
          Already verified your account?{' '}
          <Link
            href={routes.signIn}
            className="font-semibold text-gray-700 transition-colors hover:text-blue"
          >
            Login
          </Link>
        </p>
        {/* <p className="text-gray-600 mt-4">Still can't find the email? No problem.</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
          Resend Verification Email
        </button> */}
      </div>
    </div>
  );
};

export default VerifyEmail;
