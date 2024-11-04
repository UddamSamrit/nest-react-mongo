
import React from 'react';

interface InputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, value, onChange }) => {
    return (
        <div>
            <label>
                {label}
                <input type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" value={value} onChange={onChange} />
            </label>
        </div>
    );
};

export default Input;
