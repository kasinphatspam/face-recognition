import { createContext, useContext } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { login, register } from '@/api/post';
import { getUser, Logout } from "@/api/get"
import { queryClient } from '@/main';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const { data: user, refetch } = useQuery({ 
        queryKey: ["user"],
        queryFn: getUser,
    })

    const useLogin = useMutation({
        mutationKey: ["login"],
        mutationFn: async ({ email, password }) => {
            await login({email, password})
        },
        onSuccess: () => {
            refetch()
        },
    })

    const useSignup = useMutation({
        mutationKey:["signup"],
        mutationFn: async ({ email, password, firstname, lastname, personalId }) => {
            await register({email, password, firstname, lastname, personalId })
        },
        onSuccess: () => { 
            refetch() 
        }
    })

    const logout = async () => {
        const response = await Logout()
        if (response.status === 200) {
            queryClient.setQueriesData(['user'], null);
            return;
        }
    };

    return (
        <AuthContext.Provider
            value={{ user , useLogin, useSignup, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}