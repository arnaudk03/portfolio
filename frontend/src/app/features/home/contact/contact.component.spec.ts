import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ContactComponent } from './contact.component';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { provideTranslateService } from '@ngx-translate/core';
import { of, Subject, throwError } from 'rxjs';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let dataServiceSpy: jasmine.SpyObj<PortfolioDataService>;

  beforeEach(async () => {
    dataServiceSpy = jasmine.createSpyObj<PortfolioDataService>('PortfolioDataService', [
      'sendContact',
    ]);

    await TestBed.configureTestingModule({
      imports: [ContactComponent, ReactiveFormsModule],
      providers: [
        { provide: PortfolioDataService, useValue: dataServiceSpy },
        provideTranslateService({ lang: 'fr', fallbackLang: 'fr' }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // -------------------------------------------------------------------------
  // Création du composant
  // -------------------------------------------------------------------------

  describe('création', () => {
    it('devrait être créé', () => {
      expect(component).toBeTruthy();
    });

    it('le formulaire doit avoir les 4 contrôles requis', () => {
      expect(component.form.contains('name')).toBeTrue();
      expect(component.form.contains('email')).toBeTrue();
      expect(component.form.contains('subject')).toBeTrue();
      expect(component.form.contains('message')).toBeTrue();
    });

    it("le formulaire doit être invalide à l'état initial", () => {
      expect(component.form.invalid).toBeTrue();
    });

    it('sending doit être false initialement', () => {
      expect(component.sending).toBeFalse();
    });

    it('feedback doit être null initialement', () => {
      expect(component.feedback).toBeNull();
    });
  });

  // -------------------------------------------------------------------------
  // Validation des champs
  // -------------------------------------------------------------------------

  describe('validation des champs', () => {
    it('name invalide si trop court', () => {
      component.form.controls.name.setValue('A');
      expect(component.form.controls.name.invalid).toBeTrue();
    });

    it('name valide avec au moins 2 caractères', () => {
      component.form.controls.name.setValue('Ar');
      expect(component.form.controls.name.valid).toBeTrue();
    });

    it('email invalide si mal formé', () => {
      component.form.controls.email.setValue('pas-un-email');
      expect(component.form.controls.email.invalid).toBeTrue();
    });

    it('email valide si bien formé', () => {
      component.form.controls.email.setValue('test@example.com');
      expect(component.form.controls.email.valid).toBeTrue();
    });

    it('subject invalide si trop court', () => {
      component.form.controls.subject.setValue('AB');
      expect(component.form.controls.subject.invalid).toBeTrue();
    });

    it('message invalide si moins de 10 chars', () => {
      component.form.controls.message.setValue('court');
      expect(component.form.controls.message.invalid).toBeTrue();
    });
  });

  // -------------------------------------------------------------------------
  // submit() — formulaire invalide
  // -------------------------------------------------------------------------

  describe('submit() avec formulaire invalide', () => {
    it('ne doit pas appeler dataService.sendContact()', () => {
      component.submit();
      expect(dataServiceSpy.sendContact).not.toHaveBeenCalled();
    });

    it('doit marquer tous les contrôles comme touchés', () => {
      component.submit();
      expect(component.form.touched).toBeTrue();
    });
  });

  // -------------------------------------------------------------------------
  // submit() — formulaire valide
  // -------------------------------------------------------------------------

  describe('submit() avec formulaire valide', () => {
    const fillForm = (comp: ContactComponent) => {
      comp.form.controls.name.setValue('Arnaud Kiema');
      comp.form.controls.email.setValue('arnaud@example.com');
      comp.form.controls.subject.setValue('Sujet de test valide');
      comp.form.controls.message.setValue('Un message suffisamment long pour passer la validation.');
    };

    it('succès : feedback doit être "success"', fakeAsync(() => {
      dataServiceSpy.sendContact.and.returnValue(of({ message: 'ok' }));
      fillForm(component);
      component.submit();
      tick();

      expect(component.feedback).toBe('success');
      expect(component.sending).toBeFalse();
    }));

    it('succès : le formulaire doit être réinitialisé', fakeAsync(() => {
      dataServiceSpy.sendContact.and.returnValue(of({ message: 'ok' }));
      fillForm(component);
      component.submit();
      tick();

      expect(component.form.controls.name.value).toBe('');
    }));

    it('erreur : feedback doit être "error"', fakeAsync(() => {
      dataServiceSpy.sendContact.and.returnValue(throwError(() => new Error('Network error')));
      fillForm(component);
      component.submit();
      tick();

      expect(component.feedback).toBe('error');
      expect(component.sending).toBeFalse();
    }));

    it("pendant l'envoi : sending doit être true avant la réponse", () => {
      const neverResolving = new Subject<{ message: string }>();
      dataServiceSpy.sendContact.and.returnValue(neverResolving.asObservable());
      fillForm(component);
      component.submit();

      expect(component.sending).toBeTrue();
    });

    it('doit appeler dataService.sendContact() avec les bonnes données', fakeAsync(() => {
      dataServiceSpy.sendContact.and.returnValue(of({ message: 'ok' }));
      fillForm(component);
      component.submit();
      tick();

      expect(dataServiceSpy.sendContact).toHaveBeenCalledWith({
        name: 'Arnaud Kiema',
        email: 'arnaud@example.com',
        subject: 'Sujet de test valide',
        message: 'Un message suffisamment long pour passer la validation.',
      });
    }));
  });
});
