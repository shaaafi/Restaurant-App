import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsPage } from './all-products.page';

describe('AllProductsPage', () => {
  let component: AllProductsPage;
  let fixture: ComponentFixture<AllProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProductsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
