import {ENV} from "@/stores/config";

const isTestServer = ENV?.TEST_ENV ?? false;
const isOffline = ENV?.LOCAL_ENV ?? false;
const allowNewComments = ENV?.DISPLAY_NEW_COMMENTS ?? false;
const originalConsoleLog = console.log;

console.log = function() {
  if (isTestServer) {
    try{
      var error = new Error();
      if(!allowNewComments) throw error;
      var stack = error.stack.split('\n')[2].split('@');
      var origin = stack[0].split('*');
      if(origin.length > 1) origin.shift();
      origin = origin.join(' -> ');
      var subOrigin = (stack[1] ?? '').split('?')[0];
      var file = subOrigin.split('/').pop();
      var args = Array.prototype.slice.call(arguments);
      const preArgs = `%c${file} -> %c${origin} %c${ typeof args[0] === 'object'? '\n' : '\n\n' }`;
      originalConsoleLog.apply(console, [preArgs, 'color: yellow;','color: lightgreen;', 'color: unset;'].concat(args.slice()));

    }catch(e){
      var args = Array.prototype.slice.call(arguments);
      originalConsoleLog.apply(console, args);
    }
  }
};
function updateTestTabTitle(){
  const docTitle = document.title;
  if(isTestServer){
    const prefix = isOffline? 'Offline': 'Test';
    document.title = `[${prefix}] ${docTitle}`;
  }else if(isOffline){
    document.title = `[Offline] ${docTitle}`;
  }

}
function initTestWindow(){
  updateTestTabTitle();
  const favIcon = document.querySelector("link[rel*='icon']");
  favIcon.href = '/assets/media/favicons/faviconTest.png';
}

function initDevTools(){
  if(isTestServer || isOffline){
    initTestWindow();
  }
  window.updateTestTabTitle = updateTestTabTitle;
}

initDevTools();
