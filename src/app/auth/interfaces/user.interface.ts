export interface User {
   email                  : string;
   fullName               : string;
   id                     : string;
   isActive               : boolean;
   roles                  : string[];
   verificationCode       : string;
   verificationCodeExpires: Date;
}
