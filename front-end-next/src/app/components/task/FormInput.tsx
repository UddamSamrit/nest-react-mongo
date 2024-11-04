import React, { useState } from 'react';
import { useAuth } from "@/app/context/AuthContext";
import {create, update} from "@/app/api/task/route";

interface FormInputProps {
    _id: string;
    title: string;
    onSave: (newItem: { _id: string; title: string; completed: boolean }) => void;
    onChangeValue: (title: string) => void;
}

const FormInput: React.FC<FormInputProps> = ({ onSave, _id, title , onChangeValue}) => {
    const { access_token } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedTitle = title.trim();
        if (trimmedTitle.length === 0) {
            alert('Title is required.');
            return;
        }
        const isAlphanumeric = /^[a-zA-Z0-9 ]*$/.test(trimmedTitle);
        if (!isAlphanumeric) {
            alert('Title must contain only letters and numbers.');
            return;
        }
        setLoading(true);
        try {
            if (access_token) {
                if (_id){
                    const task = await update(access_token, title, _id);
                    onSave(task);
                }else{
                    const task = await create(access_token, title);
                    onSave(task);
                }
                setLoading(false);
            }
        }catch (error) {
            setLoading(false);
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="sm:flex sm:items-center bg-gray-100 p-5 rounded">
            <div className="sm:flex-auto ">
                <form onSubmit={handleSubmit} className="flex items-center justify-end w-full">
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none max-w-full">
                        <input
                            type="text"
                            value={ title}
                            onChange={(e) => onChangeValue(e.target.value)}
                            className="pl-2 block w-full rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"/>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button disabled={loading} type="submit"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            {_id ? "Update Task" : "Add Task"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default FormInput;