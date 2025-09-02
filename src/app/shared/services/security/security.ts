import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Security {
 
  async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

 
  async comparePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
    const hash = await this.hashPassword(inputPassword);
    return hash === hashedPassword;
  }  
}
