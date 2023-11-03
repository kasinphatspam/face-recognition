import { createContext, useContext } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { login, register } from '@/api/post';
import { getUser, logout, organize } from "@/api/get"
import { queryClient } from '@/main';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const { data: user, refetch: fetchUser, error: userError } = useQuery({ 
        queryKey: ["user"],
        queryFn: getUser,
        onError: () => {
            queryClient.setQueriesData(["user"], null)
            return;
        },
    })

    const { data: organize, refetch: fetchOrg } = useQuery({
        enabled: !!user?.id, 
        queryKey: ["organize", user?.id],
        queryFn: () => organize(user.id),
    }) 

    const useLogin = useMutation({
        mutationKey: ["login"],
        mutationFn: async ({ email, password }) => {
            await login({email, password})
        },
        onSuccess: () => {
            fetchUser()
        },
    })

    const useSignup = useMutation({
        mutationKey:["signup"],
        mutationFn: async ({ email, password, firstname, lastname, personalId }) => {
            await register({email, password, firstname, lastname, personalId })
        },
        onSuccess: () => { 
            fetchUser() 
        }
    })

    const useLogout = async () => {
        const response = await logout()
        if (response.status === 200) {
            queryClient.setQueriesData(['user'], null);
            return;
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, organize, fetchOrg, useLogin, useSignup, useLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}