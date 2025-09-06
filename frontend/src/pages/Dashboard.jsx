import React, { useState, useEffect } from 'react';
import { auth } from '../firebase.js'; // Adjust path if needed
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [backendResponse, setBackendResponse] = useState('Click the button to fetch data...');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            } else {
                navigate('/auth');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully.");
            navigate('/auth');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const fetchProfileData = async () => {
        if (!user) {
            setBackendResponse("You are not logged in!");
            return;
        }

        try {
            setBackendResponse('Fetching...');
            const idToken = await user.getIdToken();

            const response = await axios.get('http://localhost:8080/api/profile', {
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            });

            setBackendResponse(JSON.stringify(response.data, null, 2));

        } catch (error) {
            console.error("Error calling protected API:", error);
            setBackendResponse(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <section className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.displayName}!</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Logout
                    </button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Your Profile Details</h2>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Firebase UID:</strong> {user?.uid}</p>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Backend Data</h2>
                    <button
                        onClick={fetchProfileData}
                        className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors mb-4"
                    >
                        Fetch Protected Data from Server
                    </button>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg text-sm whitespace-pre-wrap">
                        {backendResponse}
                    </pre>
                </div>
            </div>
        </section>
    );
}
