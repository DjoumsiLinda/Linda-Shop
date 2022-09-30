import { Adresse } from "./adresse";

export class User {
  firstname: string = "";
  lastname: string = "";
  email: string = "";
  password: string = "";
  iban: string = "";
  userAdresse: Adresse = new Adresse();
  lieferAdresse: Adresse = new Adresse();
}
