"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Leaf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import logo from "../../public/Krishi Bhoomi AI.png"
export default function ImageInputForm() {
    const [formData, setFormData] = useState({
        userId: '',
        imageUrl: '',
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
    const [summary, setSummary] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/service/saveImage', {
                id: formData.userId,
                imageKey: formData.imageUrl
            });
            console.log(response.data);
            setSummary(response.data.message.answer)
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            <nav>
                <div className='
                flex gap-6 bg-green-400 p-5 justify-between'>
                    <div className='flex gap-4'>
                        <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                            <Image
                                src={logo}
                                alt="Logo"
                                className="h-8 w-8 rounded-full"
                            />
                        </div>
                        <span className="font-bold text-lg">Krishi Bhoomi AI</span>
                    </div>
                    <div className='flex gap-6'>
                        <Link href={"/adminDashboard"}> Dashboard</Link>
                        <Link href={"/adminml"}>Machine Learning Model</Link>
                        <Link href={"/admindl"}> Deep Learing Model</Link>
                    </div>
                </div>
            </nav>
            <div className='flex'>
                <div className="w-1/2 p-6">
                    <Card className='p-5' >
                        <h1 className="text-2xl font-bold mb-4">Image Key Input Form</h1>
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
                                        <option key={user._id} value={user.userId}>{user.userId} - {user.name}</option>
                                    ))}
                                </select>
                            </div>
                            {Object.keys(formData).filter(key => key !== 'userId').map((key) => (
                                <div key={key} className="flex flex-col">
                                    <label className="font-medium mb-1">{key}</label>
                                    <Input
                                        type="text"
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
        </>
    );
}