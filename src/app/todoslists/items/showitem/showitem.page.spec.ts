import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowitemPage } from './showitem.page';

describe('ShowitemPage', () => {
  let component: ShowitemPage;
  let fixture: ComponentFixture<ShowitemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowitemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowitemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
