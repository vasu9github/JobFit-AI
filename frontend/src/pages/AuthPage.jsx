import React from 'react';
import { BACKEND_URL } from '../api.js'; 

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 8.841C34.524 4.962 29.582 3 24 3C12.438 3 3 12.438 3 24s9.438 21 21 21s21-9.438 21-21c0-1.341-.138-2.65-.389-3.917z" />
        <path fill="#FF3D00" d="M6.306 14.691c-1.229 2.52-1.921 5.385-1.921 8.309c0 2.924.692 5.789 1.921 8.309L.927 35.72C-.321 32.645-1 29.384-1 26c0-3.384.321-6.645.927-9.72L6.306 14.691z" />
        <path fill="#4CAF50" d="M24 48c5.522 0 10.525-2.052 14.135-5.411L33.35 37.199c-2.31 1.539-5.163 2.415-8.35 2.415c-5.223 0-9.655-3.344-11.233-7.91l-5.397 4.175C8.807 42.612 15.827 48 24 48z" />
        <path fill="#1976D2" d="M43.611 20.083L48 20v-2h-4.389A20.94 20.94 0 0 0 24 3v0c-5.582 0-10.624 1.962-14.804 5.841L14.039 14.8C16.158 12.961 18.941 12 22 12c3.059 0 5.842 1.154 7.961 3.039L38.804 8.841A20.94 20.94 0 0 0 24 3c-5.582 0-10.624 1.962-14.804 5.841" />
    </svg>
);

export default function AuthPage() {
    const googleLoginUrl = `${BACKEND_URL}/api/auth/google`;

    return (
        <section className="bg-gradient-to-br from-white to-sky-100 font-sans min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 text-center">
                <img src="/logo.png" alt="JobFit-AI Logo" className="w-20 h-20 mx-auto mb-4" />
                <h1 className='text-3xl font-bold text-gray-800'>Welcome to JobFit-AI</h1>
                <p className='text-gray-500 mt-2 mb-8'>Sign in to continue.</p>

                <a
                    href={googleLoginUrl}
                    className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 active:scale-95 transition-all duration-150 shadow-sm"
                >
                    <GoogleIcon />
                    Sign in with Google
                </a>

                <p className="text-xs text-gray-400 mt-8">
                    By signing in, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </section>
    );
}

