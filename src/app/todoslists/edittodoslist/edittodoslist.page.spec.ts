import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EdittodoslistPage } from './edittodoslist.page';


describe('EdittodoslistPage', () => {
  let component: EdittodoslistPage;
  let fixture: ComponentFixture<EdittodoslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittodoslistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EdittodoslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
