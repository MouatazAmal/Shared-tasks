import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SharingtodoslistComponent } from './sharingtodoslist.component';

describe('SharingtodoslistComponent', () => {
  let component: SharingtodoslistComponent;
  let fixture: ComponentFixture<SharingtodoslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharingtodoslistComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SharingtodoslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
