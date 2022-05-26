import PaginationOptions from './PaginationOptions';

class PaginationData<T> {
  paginationOptions: PaginationOptions;
  count: number;
  items: Array<T>;

  /**
   *
   * @param {PaginationOptions} paginationOptions
   * @param count
   */
  constructor(paginationOptions: PaginationOptions, count: number, items: Array<T>) {
    this.paginationOptions = paginationOptions;
    this.count = count;
    this.items = items;
  }

  totalPages(): number {
    return Math.ceil(this.count / this.paginationOptions.limit());
  }

  hasNext(): boolean {
    return this.paginationOptions.getCurrentPage() < this.totalPages();
  }

  nextPage(): number {
    return this.paginationOptions.getCurrentPage() + 1;
  }

  hasPrev(): boolean {
    return this.paginationOptions.getCurrentPage() > 1;
  }

  prevPage(): number {
    return this.paginationOptions.getCurrentPage() - 1;
  }

  getPaginatedData() {
    const paginationInfo = {
      totalItems: this.count,
      totalPages: this.totalPages(),
      currentPage: this.paginationOptions.getCurrentPage(),
      perPage: this.paginationOptions.limit(),
      nextPage: 0,
      prevPage: 0,
    };

    if (this.hasNext()) {
      paginationInfo.nextPage = this.nextPage();
    }

    if (this.hasPrev()) {
      paginationInfo.prevPage = this.prevPage();
    }

    return {
      status: 'success',
      paginationInfo,
      data: this.items,
    };
  }
}

export default PaginationData;