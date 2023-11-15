import axios from "axios";
import {useConfigStore} from "@/stores/config.js";

const configStore = useConfigStore();

export function fetchLastLeadByPhoneNumber(phoneNumber) {
  return axios.post(`${configStore.fetchServerConfig()}api/cc/call_center_customers/get_last_lead_by_phone_number`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'withCredentials': true
    },
      phoneNumber: phoneNumber, 
    }, {
      timeout: 1200000
    });
}