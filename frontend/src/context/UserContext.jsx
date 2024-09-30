import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from '@/utils/axios';

// Create a context for user data
const UserContext = createContext();

// Hook to use the UserContext in other components
export const useUser = () => useContext(UserContext);

// Context provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the current logged-in user
    const fetchCurrentUser = async () => {
        if(user) return

        try {
            const response = await api.get('/users/current-user');
            setUser(response.data.data);  // Assuming the response structure has data
        } catch (error) {
            console.error('Error fetching current user:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch user details by ID
    const fetchUserById = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/users/${userId}`);
            setUser(response.data.data);  // Set the fetched user data
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            setError(error);
        }
    };

    // Automatically fetch current user when the component mounts
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, error, fetchUserById }}>
            {children}
        </UserContext.Provider>
    );
};
