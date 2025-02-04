export function responseObject({ data }: { data: any }) {
  return {
    status: 200,
    data,
  };
}
