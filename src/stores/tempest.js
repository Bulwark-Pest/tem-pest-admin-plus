import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"
import {useConfigStore} from "@/stores/config.js";
import axiosInstance from "@/services/axios-instance";

const configStore = useConfigStore();
const axiosServerInstance = axiosInstance(configStore.fetchServerConfig());

export const useTempestStore = defineStore("tempest", {
    state: () => ({
        responseNewCustomer: [],
        responseUpdatedCustomer: [],
        version: '0.0.0',

    }),
    getters: {
        getNewCustomerData(state) {
            return state.responseNewCustomer;
        },
        getUpdatedCustomerData(state) {
            return state.responseUpdateCustomer;
        },
        getVersion(state){
          return state.version;
        }
    },
    actions: {
      async checkVersionUpdate(){
        return await fetch('version.json')
        .then(response => response.json())
        .then(data =>{
          this.version = data.version;
          return data.version;
        });
      },
        async fetchNewCustomerOrLead(parameters) {
            this.responseNewCustomer = [];
            try {
                //axios.defaults.headers.common['withCredentials'] = true;
                const data = await axiosServerInstance.post('api/cc/cc_tempests/store_new_customer_or_lead',{
                    parameters: encodeURIComponent(JSON.stringify(parameters)),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'withCredentials': true
                    }
                }, {
                    timeout: 1200000
                });
                //console.log( data.data.items.getTop10average);
                this.responseNewCustomer = data.data.items;
                return this.responseNewCustomer;

            } catch(error) {
                console.log(error);
            }
        },
        async updateCustomerOrLead(parameters) {
            this.responseUpdatedCustomer = [];
            try {
                //axios.defaults.headers.common['withCredentials'] = true;
                const data = await axiosServerInstance.post('api/cc/cc_tempests/update_customer_or_lead',{
                    parameters: encodeURIComponent(JSON.stringify(parameters)),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'withCredentials': true
                    }
                }, {
                    timeout: 1200000
                });
                //console.log( data.data.items.getTop10average);
                this.responseUpdatedCustomer = data.data.items;
                return this.responseUpdatedCustomer;

            } catch(error) {
                console.log(error);
            }
        },
		async sendDocuSignAgreement(parameters) {
            this.responseDocuSignAgreement = [];
            try {
                //axios.defaults.headers.common['withCredentials'] = true;
                const data = await axiosServerInstance.post('api/cc/cc_tempests/send_customer_agreement',{
                    parameters: encodeURIComponent(JSON.stringify(parameters)),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'withCredentials': true
                    }
                }, {
                    timeout: 1200000
                });
                //console.log( data.data.items.getTop10average);
                this.responseDocuSignAgreement = data.data.items;
                return this.responseDocuSignAgreement;

            } catch(error) {
                console.log(error);
            }
        },
    }
});
