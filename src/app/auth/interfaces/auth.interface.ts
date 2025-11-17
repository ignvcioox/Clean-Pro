import { User } from '@auth/interfaces/user.interface';

/**
* Respuesta de autenticación
* @description Interfaz que define la estructura de la respuesta de autenticación.
* @author Benjamín López
* @version 1.0.0
* @since 15/11/2025
*/
export interface AuthResponse {
  message: string;
  success: boolean;
  token  : string;
  user   : User;
}