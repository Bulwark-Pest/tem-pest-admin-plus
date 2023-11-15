import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"
import {useConfigStore} from "@/stores/config.js";
import axiosInstance from "@/services/axios-instance";

const configStore = useConfigStore();
const axiosServerInstance = axiosInstance(configStore.fetchServerConfig());

export const useUserLoginStore = defineStore("userLogin", {
    state: () => ({
        users: [],
        loginData: []

    }),
    getters: {
        getLoginData(state) {
            return state.loginData;
        },
        getLoginDataBySalesman(state) {
            return state.loginBySalesmanData;
        }
    },
    actions: {
        async fetchLoginData(token) {
            this.loginData = []
            try {
                const data = await axiosServerInstance.post('api/cc/cc_salesmen/find_salesman_by_google_token',{
                        token: token,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'withCredentials': true
                        }
                })
                this.loginData = data.data
                return data;

            } catch(error) {
                console.log(error);
            }
        },
        async fetchLoginDataBySalesman(salesmanId) { // https://app.localhost:4443/api/cc/cc_salesmen?page=1&vgId=1690
            this.loginBySalesmanData = []
            try {
                const data = await axiosServerInstance.post('api/cc/cc_salesmen/get_salesman_information',{
                    salesmanId: parseInt(salesmanId),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'withCredentials': true
                    }
                })
                this.loginBySalesmanData = data.data.items
                return this.loginBySalesmanData;

            } catch(error) {
                console.log(error);
            }
        }
    },
})
