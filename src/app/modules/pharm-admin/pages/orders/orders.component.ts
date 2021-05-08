import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { TokenService } from "src/app/core/authentication/token.service";
import { OrderService } from "src/app/core/http/pharm-admin/order.service";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { Order } from "src/app/shared/models/order";
import { OrderDetailComponent } from "../../components/order-detail/order-detail.component";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  isLoadingResults = true;
  isRateLimitReached = false;

  length = 1;
  size = 9;
  order = "id";
  asc = true;
  actualPage = 0;

  text: string;
  displayedColumns: string[] = [
    "id_sale",
    "Date",
    "Cost",
    "Products",
    "Status",
    "id_saleDetail",
  ];

  id: number;
  name: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.id = parseInt(this.tokenService.getSubsidiaryId());
    try {
      if (this.id) {
        this.fecthOrder(this.id, this.length);
        this.orderService.getTotalPharmOrders(this.id).subscribe((element) => {
          this.length = element;
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  dataSource = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fecthOrder(id: number, page: number): void {
    this.orderService
      .getSubsidiaryOrders(
        id,
        page,
        this.size,
        this.order,
        this.asc,
        0,
        "price"
      )
      .subscribe((products) => {
        this.orders = products;
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.sort = this.sort;
        console.log(this.orders);
        this.isLoadingResults = false;
      });
  }

  refreshOrders(event) {
    this.actualPage = event.pageIndex;
    this.fecthOrder(this.id, event.pageIndex + 1);
  }
  productsView(clientId: number) {
    const dialogRef = this.dialog.open(OrderDetailComponent, {
      width: "500px",
      data: {
        clientId: clientId,
      },
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(result);
    //   if (result) {
    //     this.displaySuccesDialog(
    //       "¡Los datos del cliente se actualizaron exitosamente!"
    //     );
    //     this.(this.actualPage + 1);
    //   }
    // });
  }
  orderDetails(id: number): void {
    const dialogRef = this.dialog.open(OrderDetailComponent, {
      width: "500px",
      data: {
        message:
          "¿Esta seguro que desea eliminar la cuente de este administrador?",
      },
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.clientService.deleteClient(id).subscribe((rta) => {
    //       console.log("Resultado " + rta);
    //       this.text = result;
    //       this.displaySuccesDialog("¡Se elimino al cliente exitosamente!");
    //       this.ngOnInit();
    //     });
    //   }
    // });
  }
  displaySuccesDialog(text: string) {
    this.dialog.open(SuccesDialogComponent, {
      width: "500px",
      data: {
        message: text,
      },
    });
  }
}
