import { inject } from 'vue';
let emitter = undefined;
export default (channelName) => {
  let functionEvent = undefined;

  if (typeof emitter === 'undefined') emitter = inject('emitter');

  const emit = (event) => emitter.emit(channelName, event);
  const subscribe = (callBack) => {
    functionEvent = callBack;
    emitter.on(channelName, functionEvent);
  };
  const unsubscribe = () => {
    if (typeof functionEvent === 'function') {
      emitter.off(channelName, functionEvent);
      functionEvent = undefined;
    }
  };
  const promise = () =>
    new Promise((resolve, reject) => {
      emitter.on(channelName, (event) => resolve(event));
    });

  return {
    emit,
    subscribe,
    unsubscribe,
    promise,
  };
};
