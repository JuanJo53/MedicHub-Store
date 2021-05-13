import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { TokenService } from "src/app/core/authentication/token.service";
import { PharmOrderService } from "src/app/core/http/pharm-admin/pharmOrder.service";
import { OrderProductsComponent } from "src/app/modules/client/components/dialogs/order-products/order-products.component";
import { SuccesDialogComponent } from "src/app/modules/components/dialogs/succes-dialog/succes-dialog.component";
import { WarningDialogComponent } from "src/app/modules/components/dialogs/warning-dialog/warning-dialog.component";
import { Order } from "src/app/shared/models/order";

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
  size = 18;
  order = "id";
  asc = true;
  actualPage = 0;

  displayedColumns: string[] = [
    "id_sale",
    "User",
    "Date",
    "Cost",
    "Quantity",
    "Products",
    "State",
  ];

  id: number;
  typeOrder: any;
  filter: any;
  filterType: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private orderService: PharmOrderService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.id = parseInt(this.tokenService.getSubsidiaryId());
    try {
      if (this.id) {
        this.typeOrder = "2";
        this.fecthOrders(this.length);
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

  fecthOrders(page: number): void {
    this.orderService
      .getSubsidiaryOrders(
        this.id,
        page,
        this.size,
        parseInt(this.typeOrder),
        this.filter,
        this.filterType
      )
      .subscribe((orders) => {
        if (orders.length > 0) {
          this.orders = orders;
          this.length = orders[0].size;
        } else {
          this.orders = [];
        }
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
      });
  }

  refreshOrders(event) {
    this.actualPage = event.pageIndex;
    this.fecthOrders(event.pageIndex + 1);
  }
  productsView(products: any) {
    this.dialog.open(OrderProductsComponent, {
      width: "2050px",
      data: {
        products: products,
      },
    });
  }
  changeStatus(id: number) {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: "500px",
      data: {
        message: "¿Esta seguro que desea confirmar el pedido?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.orderService.updateOrder(id).subscribe((response) => {
          console.log("Response " + response);
          this.displaySuccesDialog(
            "¡Se registraron los cambios del pedido exitosamente!"
          );
          this.fecthOrders(1);
        });
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
}
