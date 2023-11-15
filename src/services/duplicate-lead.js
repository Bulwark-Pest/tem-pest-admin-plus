import axios from "axios"
import {useConfigStore} from "@/stores/config.js";

const configStore = useConfigStore();

export function fetchDuplicateContact(customerId, salesmanId) {
  return axios.post(`${configStore.fetchServerConfig()}api/cc/call_center_customers/duplicate_lead`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'withCredentials': true
    },
    customerId: parseInt(customerId),
    salesmanId: parseInt(salesmanId),
    keyId: "2T4QfdNKQn4vP9qF5F",
    }, {
      timeout: 1200000
    });
}