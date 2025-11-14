import { User } from '@auth/interfaces/user.interface';

export interface AuthResponse {
  token: string;
  user: User;
}
