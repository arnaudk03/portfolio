import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-contact',
  imports: [TranslatePipe, ReactiveFormsModule, SectionTitleComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dataService = inject(PortfolioDataService);

  sending = false;
  feedback: 'success' | 'error' | null = null;
  readonly qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(environment.portfolioUrl)}`;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending = true;
    this.feedback = null;

    this.dataService.sendContact(this.form.getRawValue()).subscribe({
      next: () => {
        this.feedback = 'success';
        this.form.reset();
        this.sending = false;
      },
      error: () => {
        this.feedback = 'error';
        this.sending = false;
      },
    });
  }
}
