declare module 'SyntheticsLogger' {
  namespace API {
    function info(...args: any[]): any;
    function debug(...args: any[]): any;
    function error(...args: any[]): any;
    function warn(...args: any[]): any;
  }

  export default API;
}
