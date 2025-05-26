import { CanActivateFn } from '@angular/router';

export const usersChallengesGuard: CanActivateFn = (route, state) => {
  const isLogin=sessionStorage.getItem('token');
  if(!isLogin){
    alert('Only logged in managers are allowed')
return false;
  }
  return true;
};
