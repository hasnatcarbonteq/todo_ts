class FetchAllTodoDTO {
  private readonly id: string;
  constructor(request: any) {
    const { id } = request.decoded;
    this.id = id;
  }

  getUserId(): string {
    return this.id;
  }
}

export default FetchAllTodoDTO;
