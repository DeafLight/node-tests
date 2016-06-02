declare module "socketio-auth" {
    interface SocketIoAuthOptions {
        authenticate: (socket: any, data: Object, callback: () => void) => () => void,
        postAuthenticate?: (socket: any, data: Object) => void,
        timeout?: number
    }

    function socketIOAuth(io: SocketIO.Server, options: any): any;
    export = socketIOAuth;
}