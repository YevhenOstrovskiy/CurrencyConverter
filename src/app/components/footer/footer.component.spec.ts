import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render footer with correct text', () => {
    const footerElement: HTMLElement = fixture.nativeElement.querySelector('.app-footer .footer-content span');
    expect(footerElement.textContent).toContain('© 2024 USENSE Currency Converter. All rights reserved.');
  });

  it('should render three footer links with correct href values', () => {
    const footerLinks = fixture.debugElement.queryAll(By.css('.footer-links a'));
    expect(footerLinks.length).toBe(3);
    expect(footerLinks[0].nativeElement.getAttribute('href')).toBe('/privacy-policy');
    expect(footerLinks[1].nativeElement.getAttribute('href')).toBe('/terms-of-service');
    expect(footerLinks[2].nativeElement.getAttribute('href')).toBe('/contact');
  });

  it('should render three footer links with correct text content', () => {
    const footerLinks = fixture.debugElement.queryAll(By.css('.footer-links a'));
    expect(footerLinks.length).toBe(3);
    expect(footerLinks[0].nativeElement.textContent).toContain('Privacy Policy');
    expect(footerLinks[1].nativeElement.textContent).toContain('Terms of Service');
    expect(footerLinks[2].nativeElement.textContent).toContain('Contact Us');
  });
});
