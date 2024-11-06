import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoSkillsComponent } from './grafico-skills.component';

describe('GraficoSkillsComponent', () => {
  let component: GraficoSkillsComponent;
  let fixture: ComponentFixture<GraficoSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoSkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
