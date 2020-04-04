import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EdititemPage } from './edititem.page';

describe('EdititemPage', () => {
  let component: EdititemPage;
  let fixture: ComponentFixture<EdititemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdititemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EdititemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
