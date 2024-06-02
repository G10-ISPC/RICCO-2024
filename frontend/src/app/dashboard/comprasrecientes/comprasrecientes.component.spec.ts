import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasrecientesComponent } from './comprasrecientes.component';

describe('ComprasrecientesComponent', () => {
  let component: ComprasrecientesComponent;
  let fixture: ComponentFixture<ComprasrecientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComprasrecientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComprasrecientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
