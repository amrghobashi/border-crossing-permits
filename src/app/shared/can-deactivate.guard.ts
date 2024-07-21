import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ComponentCanDeactivate } from './component-can-deactivate';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean {
    if(!component.canDeactivate()){
        if (confirm("عملية إستخراج الملفات لم تكتمل! هل تريد مغادرة الصفحة.")) {
          // if (confirm("عملية إستخراج الملفات لم تكتمل! من فضلك أكمل إستخراج الملفات وقم بتأكيد الإستخراج قبل مغادرة الصفحة.")) {
            return true;
        } else {
            return false;
        }
    }
    return true;
  }
}