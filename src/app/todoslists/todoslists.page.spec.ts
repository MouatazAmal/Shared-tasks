import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TodoslistsPage } from './todoslists.page';

describe('TodoslistsPage', () => {
  let component: TodoslistsPage;
  let fixture: ComponentFixture<TodoslistsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoslistsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoslistsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
