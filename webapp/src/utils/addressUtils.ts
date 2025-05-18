export function shortenAddress(address: string) {
  if (typeof address !== 'string' || address.length < 10) {
    return address;
  }
  return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}