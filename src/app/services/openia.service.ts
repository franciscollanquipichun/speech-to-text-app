import { inject, Injectable } from '@angular/core';
import OpenAI from "openai";
import { KeysService } from './keys.service';

@Injectable({
  providedIn: 'root'
})
export class OpeniaService {

  private keysService: KeysService = inject(KeysService);
  private openiaClient: any = null;

  constructor() {
    this.connect();
  }

  connect(): void {
    const apiKey = this.keysService.getApiKey('openia');
    if(!apiKey) {
      console.error('No se ha configurado la API Key de OpenAI');
      return;
    }
    this.openiaClient = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  /**
   * Tranforma archivo de audio a texto
   * @param file
   * @returns Promise<any>
   */
  speechToText(file: any): Promise<any> {
    return this.openiaClient.audio.transcriptions.create({
      file,
      model: "whisper-1",
    })
  }

}
