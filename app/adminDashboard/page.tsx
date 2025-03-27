'use client';

import axios from 'axios';
import { Leaf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import logo from "../../public/Krishi Bhoomi AI.png"
export default function AdminDashboard() {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/admin/getbooks');
                setDataList(response.data.books);
                console.log(response.data.books)
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

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
            <div className="p-4">

                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-green-500">
                            <th className="border p-2">SL No</th>

                            <th className="border p-2">Name</th>
                            <th className="border p-2">Phone</th>
                            <th className="border p-2">State</th>
                            <th className="border p-2">Country</th>
                            <th className="border p-2">District</th>
                            <th className="border p-2">Land</th>
                            <th className="border p-2">Crop</th>
                            <th className="border p-2">Type</th>
                            <th className="border p-2">User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataList.map((book, index) => (
                            <tr key={book._id} className="hover:bg-orange-700">
                                <td className="border p-2">{index}</td>
                                <td className="border p-2">{book.name}</td>
                                <td className="border p-2">{book.phone}</td>
                                <td className="border p-2">{book.state}</td>
                                <td className="border p-2">{book.country}</td>
                                <td className="border p-2">{book.district}</td>
                                <td className="border p-2">{book.land}</td>
                                <td className="border p-2">{book.crop}</td>
                                <td className="border p-2">{book.type}</td>
                                <td className="border p-2">{book.userId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}