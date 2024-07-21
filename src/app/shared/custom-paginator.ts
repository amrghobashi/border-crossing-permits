import { MatPaginatorIntl } from "@angular/material/paginator";


export function customPaginator() {
    const customPaginator = new MatPaginatorIntl();
    customPaginator.itemsPerPageLabel = 'number of rows in single page';
    return customPaginator;
}