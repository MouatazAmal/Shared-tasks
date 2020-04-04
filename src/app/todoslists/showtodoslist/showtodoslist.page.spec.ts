import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ShowtodoslistPage } from './showtodoslist.page';

describe('ShowtodoslistPage', () => {
  let component: ShowtodoslistPage;
  let fixture: ComponentFixture<ShowtodoslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowtodoslistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowtodoslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
