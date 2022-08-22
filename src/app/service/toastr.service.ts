import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) { }
  showMessage(message: string, level: string) {
    switch (level) {
      case "SUCCESS":
        this.toastr.success(message);
        break;
      case "WARN":
        this.toastr.warning(message);
        break;
    }
  }

}
