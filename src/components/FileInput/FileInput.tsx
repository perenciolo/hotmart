import React from 'react';

interface FileInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FileInput({ name, value, onChange }: FileInputProps) {
  return (
    <div className="border-2 border-dashed border-hotgray-dark relative flex items-center bg-offwhite rounded-lg p-4">
      <input
        type="file"
        className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
        name={name}
        value={value}
        onChange={onChange}
      />
      <div className="text-center absolute top-1/2 right-0 left-0 m-auto flex items-center justify-center">
        <h4 className="text-sm text-gray-700 border border-gray-500 rounded-lg px-3 py-2">
          Selecione um arquivo do seu computador
        </h4>
      </div>
    </div>
  );
}

export default FileInput;
