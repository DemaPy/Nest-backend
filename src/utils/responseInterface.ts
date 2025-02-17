import { HttpStatus } from "@nestjs/common";

export function responseObject({ data, status }: { data: any, status?: HttpStatus }) {
  return {
    status: status ?? HttpStatus.OK,
    data,
  };
}
