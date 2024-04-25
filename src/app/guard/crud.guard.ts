import { CanActivateFn } from '@angular/router';

export const crudGuard: CanActivateFn = (route, state) => {

  let typeUser = window.localStorage.getItem('typeUser')

  if (typeUser) {
    if (typeUser == 'admin') {
      return true;
    }
  }
  return false
};