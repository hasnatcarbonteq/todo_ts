import PaginationOptions from "@domain/Utils/PaginationOptions";

class FetchAllTodoDTO {
  private readonly paginationOptions: PaginationOptions;

  constructor(request: any) {
    const { page, perPage } = request.query;
    this.paginationOptions = new PaginationOptions(page, perPage);
  }

  getPaginationOptions(): PaginationOptions {
    return this.paginationOptions;
  }

  
}

export default FetchAllTodoDTO;
