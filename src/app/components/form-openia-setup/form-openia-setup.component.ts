import { Component, inject } from '@angular/core';
import { KeysService } from '../../services/keys.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OpeniaService } from '../../services/openia.service';

@Component({
  selector: 'app-form-openia-setup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-openia-setup.component.html'
})
export class FormOpeniaSetupComponent {

  private keysService: KeysService = inject(KeysService);
  private openIaService = inject(OpeniaService);
  private fb = inject(FormBuilder);

  public setupForm: FormGroup = this.fb.group({
    apiKey: ['', [Validators.required, Validators.minLength(20)]]
  });

  onSubmit() {
    if (this.setupForm.valid) {
      const apiKey = this.setupForm.get('apiKey')?.value;
      this.keysService.setApiKey('openia', apiKey);
      this.openIaService.connect();
    }
  }

}
