import React from "react";
import { Box, Text } from "zmp-ui";

export type InputBoxProps = {
    label: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    error?: boolean;
    errorMessage?: string;
};

const InputBox: React.FC<InputBoxProps> = ({ label, icon, children, error, errorMessage }) => (
    <Box className="space-y-1 mb-4">
        <Text className="text-sm font-medium text-gray-600">{label}</Text>
        <Box
            className={`input-wrapper ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`}
        >
            <span className={`mr-2 flex items-center ${error ? 'text-red-500' : 'text-gray-400'}`}>{icon}</span>
            <Box className="flex-1 flex items-center h-full">{children}</Box>
        </Box>
        {error && errorMessage && (
            <Text className="error-text">{errorMessage}</Text>
        )}
    </Box>
);

export default InputBox;
