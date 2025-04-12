import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || {};

  let response;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      response = await axios.post('http://localhost:3000/createUrl', {
        orgUrl: url
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      setError('Failed to shorten URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6 overflow-hidden text-white">

      {/* Floating background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-pink-300 rounded-full filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-[-120px] right-[-100px] w-[300px] h-[300px] bg-indigo-400 rounded-full filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-1/2 left-[-150px] w-[250px] h-[250px] bg-purple-400 rounded-full filter blur-2xl opacity-25 animate-bounce" style={{ animationDuration: '10s' }} />

      {/* Top welcome and dashboard button */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center px-4 z-10">
        <div className="text-xl font-semibold drop-shadow-md">
          👋 Welcome, <span className="font-bold">{name}</span>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium shadow-md hover:bg-gray-100 transition"
        >
          Dashboard
        </button>
      </div>

      {/* Main card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-gray-800 z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-indigo-600 mb-2">URL Shortener</h1>
          <p className="text-sm text-gray-600">Create short links and track their performance</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Paste your long URL
            </label>
            <div className="relative">
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very-long-url"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none pr-12"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
            </div>
            {error && <p className="mt-2 text-sm text-red-600 animate-pulse">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : 'shadow-md hover:shadow-lg'}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                Shorten URL
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>By shortening a URL, you agree to our Terms of Service</p>
        </div>
      </div>
    </div>
  );
};

export default UrlShortener;
