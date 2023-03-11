import { Observable } from "rxjs";

export interface DropdownMenuItem {
  text: string | Observable<string>,
  icon: string | Observable<string>,
  action: () => void;
}