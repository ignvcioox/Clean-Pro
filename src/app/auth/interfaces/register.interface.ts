export interface RegisterResponse {
   email         : string;
   expiresAtLocal: string;
   expiresAtUTC  : Date;
   message       : string;
   success       : boolean;
}