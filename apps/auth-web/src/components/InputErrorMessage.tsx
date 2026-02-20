export function InputError({ errMessage }: { errMessage: string }) {
  return <p className="text-red-500/80 text-sm">{errMessage}</p>;
}
