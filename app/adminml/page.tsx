"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function SoilInputForm() {
    const [formData, setFormData] = useState({
        userId: '',
        pH: '',
        Nitrogen: '',
        Phosphorus: '',
        Potassium: '',
        CO2: '',
        Humidity: '',
        Temperature: '',
        Rainfall: '',
    });

    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get('http://localhost:4000/admin/getbooks');
                setDataList(response.data.books);
                console.log(response.data.books);
            } catch (err) {
                console.error(err);
            }
        }
        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [summary,setSummary] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/chatbot/croprecommend', {

                userId: formData.userId,
                pH: formData.pH,
                Nitrogen: formData.Nitrogen,
                Phosphorus: formData.Phosphorus,
                Potassium: formData.Potassium,
                CO2: formData.CO2,
                Humidity: formData.Humidity,
                Temperature: formData.Temperature,
                Rainfall: formData.Rainfall,

            });
            console.log(response.data);
            setSummary(response.data.summary)
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='flex'>
            <div className="w-1/2 p-6">
                <Card className='p-5' >
                    <h1 className="text-2xl font-bold mb-4">Soil Input Form</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label className="font-medium mb-1">User ID</label>
                            <select
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                                className="p-3 border rounded"
                            >
                                <option value="" disabled>Select User ID</option>
                                {dataList.map((user) => (
                                    <option key={user._id} value={user._id}>{user._id} - {user.name}</option>
                                ))}
                            </select>
                        </div>
                        {Object.keys(formData).filter(key => key !== 'userId').map((key) => (
                            <div key={key} className="flex flex-col">
                                <label className="font-medium mb-1">{key}</label>
                                <Input
                                    type="number"
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    className="p-2 border rounded"
                                />
                            </div>
                        ))}
                        <button type="submit" className="bg-green-500 w-full text-white p-2 rounded">Submit</button>
                    </form>
                </Card>
            </div>
            <div className='w-1/2 p-6 min-h-screen'>
                        <Card className='p-5 h-full'>
                            <h1 className="text-2xl font-bold mb-4">Soil Data Analysis</h1>
                            <CardContent>
                                {summary}
                            </CardContent>
                        </Card>
            </div>
        </div>
    );
}
