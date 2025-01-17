import { TokenService } from "src/app/core/authentication/token.service";
import { ClientService } from "src/app/core/http/admin/client.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Client } from "src/app/shared/models/client";
import { MatDialog } from "@angular/material/dialog";
import { DatePipe } from "@angular/common";
import { MAT_DATE_FORMATS } from "@angular/material";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { ChangePasswordComponent } from "../../components/dialogs/change-password/change-password.component";
import { FileService } from "src/app/core/services/file.service";
import { ErrorDialogComponent } from "src/app/modules/components/dialogs/error-dialog/error-dialog.component";
import { DomSanitizer } from "@angular/platform-browser";
import { EventEmitterService } from "src/app/core/services/event-emitter.service";

export const MY_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "YYYY",
  },
};
@Component({
  selector: "app-client-profile-page",
  templateUrl: "./client-profile-page.component.html",
  styleUrls: ["./client-profile-page.component.scss"],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class ClientProfilePageComponent implements OnInit, OnDestroy {
  client: Client;
  image: any;

  text: string;
  id: number;
  form: FormGroup;
  editEnabled = false;

  constructor(
    private fromBuilder: FormBuilder,
    private clientService: ClientService,
    private tokenService: TokenService,
    private fileService: FileService,
    public datepipe: DatePipe,
    private sanitizer: DomSanitizer,
    private eventEmitterService: EventEmitterService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log("init");
    try {
      this.id = parseInt(this.tokenService.getUserId());
      if (this.id) {
        this.getDetails(this.id);
      }
      this.eventEmitterService.clientSubs = this.eventEmitterService.clientPhotoEvent.subscribe(
        (name: string) => {
          this.getDetails(this.id);
          console.log(name);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
  ngOnDestroy() {
    console.log("destroyed");
    // this.eventEmitterService.clientPhotoEvent.unsubscribe();
  }
  cancel() {
    this.editEnabled = false;
  }
  getDetails(id: number) {
    this.clientService.getClientDetail(id).subscribe((client) => {
      this.client = client;
      this.fetchUserPhoto();
    });
  }
  fetchUserPhoto() {
    this.fileService.getUserPhoto(this.client.picture).subscribe((data) => {
      let objectURL = URL.createObjectURL(data);
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
  editClient(): void {
    this.editEnabled = true;
    this.form = this.fromBuilder.group({
      clientId: [this.id, [Validators.required]],
      firstName: [
        this.client.firstName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      firstSurname: [
        this.client.firstSurname,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      secondSurname: [
        this.client.secondSurname,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      ci: [
        this.client.ci,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(6),
        ],
      ],
      phone: [
        this.client.phone,
        [
          Validators.required,
          Validators.maxLength(18),
          Validators.minLength(12),
        ],
      ],
      email: [
        this.client.email,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
          Validators.minLength(6),
        ],
      ],
      userName: [
        this.client.userName,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(6),
        ],
      ],
      birthdate: [this.client.birthdate, [Validators.required]],
      number: [
        this.client.number,
        [Validators.required, Validators.maxLength(15)],
      ],
      street: [
        this.client.street,
        [
          Validators.required,
          Validators.maxLength(145),
          Validators.minLength(3),
        ],
      ],
      zone: [
        this.client.zone,
        [
          Validators.required,
          Validators.maxLength(80),
          Validators.minLength(3),
        ],
      ],
      city: [
        this.client.city,
        [
          Validators.required,
          Validators.maxLength(80),
          Validators.minLength(3),
        ],
      ],
      country: [
        this.client.country,
        [
          Validators.required,
          Validators.maxLength(80),
          Validators.minLength(3),
        ],
      ],
    });
  }
  saveClient(): void {
    if (this.form.valid) {
      const client = this.form.value;
      let date = this.datepipe.transform(
        this.form.get("birthdate").value.toString(),
        "yyyy-MM-dd"
      );
      client.birthdate = date;
      console.log(client);
      this.updateAdmin(client);
    } else {
      console.log("bad form");
    }
  }
  updateAdmin(client: Client): void {
    this.clientService.updateClient(client).subscribe((responseClient) => {
      console.log(responseClient);
      this.editEnabled = false;
      this.displaySuccesDialog("¡Sus datos se actualizaron exitosamente!");
      this.ngOnInit();
    });
  }
  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "OK") {
        this.displaySuccesDialog("¡Se cambio su contraseña exitosamente!");
      } else if (result == "BAD_REQUEST") {
        this.displayFailureDialog("¡Hubo un error al cambiar la contraseña!");
      }
    });
  }
  displaySuccesDialog(text: string) {
    this.dialog.open(SuccesDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
  }
  displayFailureDialog(text: string) {
    this.dialog.open(ErrorDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
  }
}
