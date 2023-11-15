import { ENV } from "@/stores/config";
import { io } from "socket.io-client";

const ioFake = {
  on(event, callback) {},
  emit(event, data) {},
  off(event) {},
};

let _instance = null;

const socket = (function () {
  if (_instance) return _instance;
  if (!ENV.SHOW_MESSENGER) return (_instance = ioFake);
  return _instance = io(ENV.WEBSOCKET_URL);
})();

export { socket };
