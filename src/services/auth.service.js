import emitterControls from "@/assets/js/emitterControls";
const KEYS_TO_VALIDATE = [
  'googleToken','mainUserId'
];
const authCheckerEmitter = emitterControls('auth-checker')

export function subscribeAuthValidation(callback){

  authCheckerEmitter.subscribe((event)=>{
    callback(event);
  });
  setInterval(()=>{
    if(!validLocalStorageCredentials()){
      authCheckerEmitter.emit();
    }
  },1000*7);
}
export function UnsubscribeAuthValidation(){
  authCheckerEmitter.unsubscribe();
}

export function validLocalStorageCredentials(){
  return KEYS_TO_VALIDATE.filter((key)=>!!localStorage.getItem(key)).length === KEYS_TO_VALIDATE.length;
}

