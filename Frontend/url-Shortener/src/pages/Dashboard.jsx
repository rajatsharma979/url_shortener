import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    const [urlData, setUrlData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleAnalyticsClick = (url) => {
        navigate("/urlanalytics", {
            state: {
                url
            }
        });
    };

    useEffect(() => {
        const fetchUrlData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/dashboard`, {
                    headers: {
                        'Content-Type': 'application/json',
                        // Add auth header if needed
                        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    withCredentials: true
                });

                console.log("All urls", response.data.data);

                setUrlData(response.data.data);
            } catch (error) {
                console.error('Failed to fetch URLs:', error);
                setError('Failed to load URL data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUrlData();
    }, []); // Empty dependency array means this runs once on mount

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
                    <p className="text-red-500 font-medium">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
            {/* Floating animated blobs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-0 left-0"></div>
                <div className="absolute w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-0 right-0 animation-delay-2000"></div>
                <div className="absolute w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob bottom-0 left-1/3 animation-delay-4000"></div>
            </div>

            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center">📊 URL Analytics Dashboard</h1>

                <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden">
                    <div className="p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">🔗 Your Short URLs</h2>

                        {urlData.length === 0 ? (
                            <p className="text-gray-500 text-center">No URLs found. Start by shortening one!</p>
                        ) : (
                            <div className="space-y-6">
                                {urlData.map((url) => (
                                    <div
                                        key={url.id}
                                        className="bg-white shadow-md hover:shadow-lg rounded-xl p-6 border border-gray-200 transition-transform hover:-translate-y-1"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">
                                                    <span className="font-medium">Original:</span> {url.orgUrl}
                                                </p>
                                                <p className="text-base font-semibold text-indigo-600 truncate">
                                                    Short URL: <a href={`${import.meta.env.VITE_BACKEND_URL}/dwarf_url/${url.shortUrl}`} className="hover:underline">{`${import.meta.env.VITE_BACKEND_URL}/dwarf_url/${url.shortUrl}`}</a>
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Created on: <span className="font-medium">{new Date(url.createdAt).toLocaleDateString()}</span>
                                                </p>
                                            </div>
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(`${import.meta.env.VITE_BACKEND_URL}/dwarf_url/${url.shortUrl}`)}
                                                    className="p-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-full transition"
                                                    title="Copy to clipboard"
                                                >
                                                    📋
                                                </button>
                                                <button
                                                    onClick={() => handleAnalyticsClick(url)}
                                                    className="p-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-full transition"
                                                    title="View analytics"
                                                >
                                                    📈
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Dashboard;