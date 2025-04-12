import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLocation } from "react-router-dom";

const UrlAnalytics = () => {
    const location = useLocation();
    const { url } = location.state || {};

    const locationData = url.location || [];
    const deviceData = url.device || [];
    let totalClicks = 0;

    if(deviceData.length > 0){
        deviceData.map(element => totalClicks += element.clicks);
    }

    return (
        <div>
            <div className="mt-2 bg-white p-4 rounded-lg shadow-md"> <h3 className="text-lg font-semibold mb-4">Total Clicks :: {totalClicks}</h3> </div>
            <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Clicks by Location for:: {`${import.meta.env.VITE_BACKEND_URL}/dwarf_url/${url.shortUrl}`}</h3>

                {locationData.length > 0 ? (

                    <div className="h-64">
                        <ResponsiveContainer width="80%" height="100%">
                            <BarChart
                                data={locationData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="place" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="clicks" fill="#34d399" name="Clicks" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <p className="text-gray-500 py-4">No location analytics available</p>
                )}
            </div>

            <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Clicks by Device for:: {`${import.meta.env.VITE_BACKEND_URL}/dwarf_url/${url.shortUrl}`}</h3>

                {deviceData.length > 0 ? (
                    <div className="h-64">
                        <ResponsiveContainer width="80%" height="100%">
                            <BarChart
                                data={deviceData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="deviceType" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="clicks" fill="#34d399" name="Clicks" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <p className="text-gray-500 py-4">No location analytics available</p>
                )}
            </div>
        </div>
    );
};

export default UrlAnalytics;
