import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AddtodoslistPage } from './addtodoslist.page';


describe('AddtodoPage', () => {
  let component: AddtodoslistPage;
  let fixture: ComponentFixture<AddtodoslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtodoslistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddtodoslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
