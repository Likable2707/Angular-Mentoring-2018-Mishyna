import {Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {IUser, User} from '../models/user.model';
import {AuthService} from '../auth.service';
import {Store, select} from '@ngrx/store';
import {IAppState} from '../../store/states/index';
import {Logout} from '../../store/actions/auth.actions';
import {selectAllAuthInfo} from '../../store/selectors/auth.selectors';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HeaderComponent implements OnInit {
  public user: IUser = new User();
  public authInfo$ = this.store.pipe(select(selectAllAuthInfo));

  constructor(private authSvc: AuthService,
              private ref: ChangeDetectorRef,
              private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.subscribeOnAuthInfo();
  }

  public isAuth() {
    return this.authSvc.isAuth();
  }

  public logout() {
    this.store.dispatch(new Logout());
  }

  private subscribeOnAuthInfo() {
    this.authInfo$.subscribe((data: any) => {
      this.user = new User();
      if (data && data.isAuthenticated && data.user) {
        this.user = data.user;
        this.ref.markForCheck();
      }
    });
  }
}
