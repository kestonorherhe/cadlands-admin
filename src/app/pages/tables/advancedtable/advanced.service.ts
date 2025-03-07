import { Injectable, PipeTransform } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { debounceTime, delay, switchMap, tap } from "rxjs/operators";
import { SearchResult } from "./advanced.model";
import { SortDirection } from "./advanced-sortable.directive";
import { HttpClient } from "@angular/common/http";

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}

const compare = (v1: string, v2: string) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

/**
 * Sort the table data
 * @param tabless Table field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */
function sort(tables: any[], column: string, direction: string): any[] {
  if (direction === "" || column === "") {
    return tables;
  } else {
    return [...tables].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === "asc" ? res : -res;
    });
  }
}

/**
 * Table Data Match with Search input
 * @param tables Table field value fetch
 * @param term Search the value
 */
function matches(tables: any, term: string, pipe: PipeTransform) {
  return (
    tables.api_key.toLowerCase().includes(term.toLowerCase()) ||
    tables.category_name.toLowerCase().includes(term.toLowerCase()) ||
    tables.date.toLowerCase().includes(term.toLowerCase())
    // ||
    // tables.phone.toLowerCase().includes(term.toLowerCase()) ||
    // tables.email.toLowerCase().includes(term.toLowerCase())
  );
}

// function matches(tables: any, term: string, pipe: PipeTransform) {
//   // console.log("term ::", term);
//   const keys = Object.keys(tables);
//   // console.log(
//   //   "keys ::",
//   //   keys.some((key) => tables[key].toLowerCase().includes(term.toLowerCase()))
//   // );
//   return keys.some((key) =>
//     tables[key].toLowerCase().includes(term.toLowerCase())
//   );
// }

@Injectable({
  providedIn: "root",
})
export class AdvancedService {
  clientData: any = [];
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tables$ = new BehaviorSubject<any[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: "",
    sortColumn: "",
    sortDirection: "",
    startIndex: 0,
    endIndex: 9,
    totalRecords: 0,
  };

  private _loadingLogs$ = new BehaviorSubject<boolean>(true);
  private _searchLogs$ = new Subject<void>();
  private _tablesLogs$ = new BehaviorSubject<any[]>([]);
  private _totalLogs$ = new BehaviorSubject<number>(0);
  private _stateLogs: State = {
    page: 1,
    pageSize: 10,
    searchTerm: "",
    sortColumn: "",
    sortDirection: "",
    startIndex: 0,
    endIndex: 9,
    totalRecords: 0,
  };

  constructor(private pipe: DecimalPipe, private http: HttpClient) {}

  searchTable(data: any) {
    console.log("this is the data ::", data);
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search(data)),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._tables$.next(result.tables);
        this._total$.next(result.total);
      });
    this._search$.next();
  }

  searchLogs(data: any) {
    console.log("this is the data log ::", data);
    this._tablesLogs$.next(data)
    this._totalLogs$.next(data.length)
    // this._searchLogs$
    //   .pipe(
    //     tap(() => this._loadingLogs$.next(true)),
    //     debounceTime(200),
    //     switchMap(() => this._searchLogs(data)),
    //     delay(200),
    //     tap(() => this._loadingLogs$.next(false))
    //   )
    //   .subscribe((result) => {
    //     console.log("this is the log result ::", result);
    //     this._tablesLogs$.next(result.tables);
    //     this._totalLogs$.next(result.total);
    //   });

    this._searchLogs$.next();
  }

  private _searchLogs(data): Observable<SearchResult> {
    // console.log("this is the sort data ::", data)
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._stateLogs;

    // 1. sort
    let tables = sort(data, sortColumn, sortDirection);

    // 2. filter
    tables = tables.filter((table) => matches(table, searchTerm, this.pipe));
    const total = tables.length;

    // 3. paginate
    this.totalRecordsLogs = tables.length;
    this._stateLogs.startIndex = (page - 1) * this.pageSizeLogs + 1;
    this._stateLogs.endIndex =
      (page - 1) * this.pageSizeLogs + this.pageSizeLogs;
    if (this.endIndexLogs > this.totalRecordsLogs) {
      this.endIndexLogs = this.totalRecordsLogs;
    }
    tables = tables.slice(
      this._stateLogs.startIndex - 1,
      this._stateLogs.endIndex
    );
    return of({ tables, total });
  }

  /**
   * Returns the value
   */
  // /**
  get tables$() {
    return this._tables$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  get startIndex() {
    return this._state.startIndex;
  }
  get endIndex() {
    return this._state.endIndex;
  }
  get totalRecords() {
    return this._state.totalRecords;
  }

  /**
   * Returns Log value
   */
  // /**
  get tablesLogs$() {
    return this._tablesLogs$.asObservable();
  }
  get totalLogs$() {
    return this._totalLogs$.asObservable();
  }
  get loadingLogs$() {
    return this._loadingLogs$.asObservable();
  }
  get pageLogs() {
    return this._stateLogs.page;
  }
  get pageSizeLogs() {
    return this._stateLogs.pageSize;
  }
  get searchTermLogs() {
    return this._stateLogs.searchTerm;
  }

  get startIndexLogs() {
    return this._stateLogs.startIndex;
  }
  get endIndexLogs() {
    return this._stateLogs.endIndex;
  }
  get totalRecordsLogs() {
    return this._stateLogs.totalRecords;
  }

  /**
   * set the value
   */
  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set startIndex(startIndex: number) {
    this._set({ startIndex });
  }
  set endIndex(endIndex: number) {
    this._set({ endIndex });
  }
  set totalRecords(totalRecords: number) {
    this._set({ totalRecords });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  /**
   * set the Logs value
   */
  set pageLogs(page: number) {
    this._setLogs({ page });
  }
  set pageSizeLogs(pageSize: number) {
    this._setLogs({ pageSize });
  }
  set startIndexLogs(startIndex: number) {
    this._setLogs({ startIndex });
  }
  set endIndexLogs(endIndex: number) {
    this._setLogs({ endIndex });
  }
  set totalRecordsLogs(totalRecords: number) {
    this._setLogs({ totalRecords });
  }
  set searchTermLogs(searchTerm: string) {
    this._setLogs({ searchTerm });
  }
  set sortColumnLogs(sortColumn: string) {
    this._setLogs({ sortColumn });
  }
  set sortDirectionLogs(sortDirection: SortDirection) {
    this._setLogs({ sortDirection });
  }

  private _setLogs(patch: Partial<State>) {
    Object.assign(this._stateLogs, patch);
    this._searchLogs$.next();
  }

  /**
   * Search Method
   */
  private _search(data): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._state;

    // 1. sort
    let tables = sort(data, sortColumn, sortDirection);

    // 2. filter
    tables = tables.filter((table) => matches(table, searchTerm, this.pipe));
    const total = tables.length;

    // 3. paginate
    this.totalRecords = tables.length;
    this._state.startIndex = (page - 1) * this.pageSize + 1;
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    tables = tables.slice(this._state.startIndex - 1, this._state.endIndex);
    return of({ tables, total });
  }

}
