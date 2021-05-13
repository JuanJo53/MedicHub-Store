import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { SaleService } from "src/app/core/http/pharm-admin/sale.service";
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, BaseChartDirective, Label, MultiDataSet } from "ng2-charts";
import { TokenService } from "src/app/core/authentication/token.service";
import { PharmOrderService } from "src/app/core/http/pharm-admin/pharmOrder.service";
import { OrderProductsComponent } from "src/app/modules/client/components/dialogs/order-products/order-products.component";
import { Order } from "src/app/shared/models/order";

@Component({
  selector: "app-pharm-dashboard",
  templateUrl: "./pharm-dashboard.component.html",
  styleUrls: ["./pharm-dashboard.component.scss"],
})
export class PharmDashboardComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "top",
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };
  public pieChartLabels: Label[] = [
    ["Download", "Sales"],
    ["In", "Store", "Sales"],
    ["In", "Store", "Sales"],
    ["In", "Store", "Sales"],
    ["In", "Store", "Sales"],
    ["In", "Store", "Sales"],
    ["In", "Store", "Sales"],
    ["In", "Store", "Sales"],
    ["In", "Store", "Sales"],
    ["In", "Store", "Sales"],
    "Mail Sales",
  ];
  public pieChartData: number[] = [
    300, 500, 100, 500, 500, 200, 600, 10, 80, 60, 30,
  ];
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;

  //line|bar
  public salesChartData: ChartDataSets[];
  public salesChartLabels: Label[];
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: "y-axis-0",
          position: "left",
        },
      ],
    },
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: "March",
          borderColor: "orange",
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: "orange",
            content: "LineAnno",
          },
        },
      ],
    },
  };

  public lineChartLegend = true;

  subsiId: number;

  dateRange: FormGroup;
  startDate: string;
  endDate: string;

  salesData: number[];
  salesDataResponse: any[];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  //Table
  /*orders: Order[] = [];

  isLoadingResults = true;
  isRateLimitReached = false;

  length = 1;
  size = 18;
  order = "id";
  asc = true;
  actualPage = 0;

  displayedColumns: string[] = [
    "id_sale",
    "Name",
    "Cost",
    "Quantity",
  ];

  id: number;
  typeOrder: any;
  filter: any;
  filterType: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;*/

  constructor(
    private datePipe: DatePipe,
    private tokenService: TokenService,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    try {
      this.subsiId = parseInt(this.tokenService.getSubsidiaryId());
      if (this.subsiId) {
        this.fetchSalesData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  fetchSalesData() {
    this.salesDataResponse = [];
    this.salesData = [];
    this.salesChartLabels = [];
    this.saleService.getSaleGraph(this.subsiId).subscribe((data) => {
      this.salesDataResponse = data;
      console.log(this.salesDataResponse);
      this.salesDataResponse.forEach((element) => {
        this.salesData.push(element.count);
        this.salesChartLabels.push(
          this.datePipe.transform(element.date, "dd-MM-yyyy")
        );
      });
      this.salesChartData = [
        { data: this.salesData, label: "Ventas" },
        { data: this.salesData, label: "Pedidos" },
      ];
    });
  }

  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  //table

  /*public tabledatasource(): void {
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
        this.orders = orders;
        this.length = orders[0].size;
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
  }*/
}
