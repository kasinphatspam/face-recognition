import { createContext, useContext } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { login, register } from '@/api/post';
import { getUser, logout, organize as organizeFn } from "@/api/get"
import { queryClient } from '@/main';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const { data: user, refetch: fetchUser } = useQuery({ 
        queryKey: ["user"],
        queryFn: async () => {
            return getUser()
        },
       onError: () => {
            queryClient.setQueriesData(["user"], null)
            return;
        },
    })

    const { data: organizeData, refetch: fetchOrg } = useQuery({
        enabled: !!user?.id, 
        queryKey: ["organize", user?.id],
        queryFn: async () => {
            return organizeFn(user.id)
        },
        onError: () => {
            queryClient.setQueriesData(["organize", user?.id], null)
            return;
        },
    }) 

    const useLogin = useMutation({
        mutationKey: ["login"],
        mutationFn: async ({ email, password }) => {
            return login({email, password})
        },
        onError: () => {
            queryClient.setQueriesData(["user"], null)
            return;
        },
    })

    const useSignup = useMutation({
        mutationKey:["signup"],
        mutationFn: async ({ email, password, firstname, lastname, personalId }) => {
            return register({email, password, firstname, lastname, personalId })
        },
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
            value={{ user, organizeData, fetchOrg, fetchUser, useLogin, useSignup, useLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}