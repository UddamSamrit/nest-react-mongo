"use client";

import Layout from './components/Layout';
import React, { useState, useEffect } from 'react';
import ShowTask from "@/app/components/task/ShowTask";
import FormInput from "@/app/components/task/FormInput";
import { getAll } from './api/task/route';
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from 'next/navigation';


interface DataItem {
    _id: string;
    title: string;
    completed: boolean;
}

const Home: React.FC = () => {
    const { access_token } = useAuth();
    const router = useRouter();
    const [data, setData] = useState<DataItem[]>([]);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (access_token){
                const tasks = await getAll(access_token);
                setData(tasks);

            }
        };
        fetchData();
    }, [access_token]);


    const handleSave = (newItem: DataItem) => {
        setData((prevData) => {
            const itemExists = prevData.some((item) => item._id === newItem._id);
            if (itemExists) {
                return prevData.map((item) =>
                    item._id === newItem._id ? { ...item, ...newItem } : item
                );
            } else {
                return [newItem, ...prevData];
            }
        });
        setTitle("");
        setId("");
    };
    const handleUpdate = (newItem: DataItem) => {
        setData((prevData) =>
            prevData.map((item) =>
                item._id === newItem._id ? { ...item, ...newItem } : item
            )
        );
    };
    const handleDelete = (newItem: DataItem) => {
        setData((prevData) => prevData.filter((item) => item._id !== newItem._id));
    };

    const onEdit = (id: string, title: string) => {
         setId(id);
         setTitle(title);
    };
    const onChangeValueTitle = (title: string) => {
         setTitle(title);
    };


    return (
        <Layout>
            <div className="mx-auto max-w-7xl items-center mt-5">
                <div className="px-4 sm:px-6 lg:px-8">
                    <FormInput onSave={handleSave} _id={id} title={title} onChangeValue={onChangeValueTitle}/>
                    <ShowTask data={data} onUpdate={handleUpdate} onDelete={handleDelete} onEdit={onEdit}/>
                </div>
            </div>

        </Layout>
    );
};

export default Home;
