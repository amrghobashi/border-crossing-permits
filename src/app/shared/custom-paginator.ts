import { MatPaginatorIntl } from "@angular/material/paginator";


export function customPaginator() {
    const customPaginator = new MatPaginatorIntl();
    customPaginator.itemsPerPageLabel = 'عدد التسجيلات في الصفحة الواحدة';
    return customPaginator;
}