import React, { useState } from 'react';
import {updateCompleted, deleteTask} from "@/app/api/task/route";
import {useAuth} from "@/app/context/AuthContext";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface ShowTaskProps {
    data: { _id: string; title: string; completed: boolean }[];
    onUpdate: (newItem: { _id: string; title: string; completed: boolean }) => void;
    onDelete: (newItem: { _id: string; title: string; completed: boolean }) => void;
    onEdit: (_id: string, title: string) => void;
}

const ShowTask: React.FC<ShowTaskProps> = ({data, onUpdate, onDelete, onEdit}) => {

    const {access_token} = useAuth();

    const changeCompleted = async (id: string, completed: boolean) => {
        try {
            const task = await updateCompleted(access_token, completed, id);
            onUpdate(task);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const deleteData = async (id: string) => {
        try {
            const task = await deleteTask(access_token, id);
            onDelete(task);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const editData = async (id: string, title: string) => {
        onEdit(id, title);
    };
    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">N
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title
                                </th>

                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {data.length > 0 && data.map((item) => (

                                    <tr key={"tr"+item._id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            <div className="flex items-center space-x-2">
                                                <input type="checkbox" checked={item.completed}
                                                       onChange={() => changeCompleted(item._id, item.completed)}
                                                       className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"/>
                                            </div>
                                        </td>
                                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${item.completed ? 'line-through text-gray-500' : ''}`}>{item.title}
                                        </td>

                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <button type="button"
                                                    onClick={() => editData(item._id, item.title)}
                                                    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit
                                            </button>

                                            <button type="button"
                                                    onClick={() => deleteData(item._id)}
                                                    className="ml-2 rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Delete
                                            </button>


                                        </td>

                                    </tr>

                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
</div>
)
    ;
};

export default ShowTask;
