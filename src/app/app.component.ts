import { Component, inject, signal } from '@angular/core';
import { OpeniaService } from './services/openia.service';
import { CommonModule } from '@angular/common';
import { FormOpeniaSetupComponent } from "./components/form-openia-setup/form-openia-setup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormOpeniaSetupComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private openIaService = inject(OpeniaService);

  private selectedFile: File|null = null;
  public error = signal<string|null>(null);
  public transcription = signal<string|null>(null);

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const mimeTypes = ['audio/mp3', 'audio/mpeg'];
    if (file && mimeTypes.includes(file.type)) {
      this.selectedFile = file;
    } else {
      this.error.set('Por favor, selecciona un archivo MP3 válido. Tú archivo es de tipo: ' + file?.type);
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.selectedFile) this.transcribeAudio(this.selectedFile);
  }

  async transcribeAudio(file: any) {
    try{
      const transcription = await this.openIaService.speechToText(file);
      this.transcription.set(transcription);
      this.error.set(null);
    }catch(error) {
      this.error.set('No se pudo transcribir el audio: ' + JSON.stringify(error));
    }
  }
}
