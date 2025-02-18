import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeysService {

  prefix = 'api-key-';

  setApiKey(api: string, value: string): void {
    window.localStorage.setItem(this.prefix + api, value);
  }

  getApiKey(api: string): string | null {
    return window.localStorage.getItem(this.prefix + api);
  }
}