import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  Renderer2,
  ComponentFactoryResolver
} from '@angular/core';
import {AuthHttpService} from "../../../shared/service/auth-http.service";
import {Subject, Subscription} from "rxjs";
import {AuthDirective} from "../../../shared/auth.directive";
import {CreateComponentService} from "../../../shared/service/createComponent.service";
import {mergeMap, takeUntil} from "rxjs/operators";
import {FavoritesService} from "../../../shared/service/favorites.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  isAuth: boolean = false;
  isOpen: boolean = false;
  private userSub: Subscription;
  private favSub: Subscription;
  count: number;
  expertList: [] = [];


  @ViewChild("overlay") overlay: ElementRef;
  @ViewChild("navbar") navbar: ElementRef;
  @ViewChild(AuthDirective, {static: true})
  componentHost: AuthDirective;
  private destroySubject = new Subject();

  constructor(private renderer: Renderer2,
              private authService: AuthHttpService,
              private FactoryResolver: ComponentFactoryResolver,
              private createComponentService: CreateComponentService,
              private favoritesService: FavoritesService) {
  }

  ngOnInit(): void {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.navbar.nativeElement.contains(e.target) || e.target === this.overlay.nativeElement) {
        this.isOpen = false;
      }
    });

    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user;
    });

    this.favSub = this.favoritesService.getCountFavorites.subscribe((number) => {
      this.count = number;
    });
    let favoriteExperts = JSON.parse(localStorage.getItem('favoritesData') || '');
    this.count = favoriteExperts ? favoriteExperts.length : 0;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  toggleComponents() {
    const viewContainerRef = this.componentHost.viewContainerRef;

    this.createComponentService.isLoggedIn$
      .pipe(
        takeUntil(this.destroySubject),
        mergeMap(isLoggedIn =>
          this.createComponentService.loadComponent(viewContainerRef, isLoggedIn)
        )
      )
      .subscribe();
  }

  openLogin() {
    this.createComponentService.createLogin();
    this.toggleComponents();
  }

  openSignUp() {
    this.createComponentService.createSignUp();
    this.toggleComponents();
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
    this.favSub.unsubscribe();
  }
}
