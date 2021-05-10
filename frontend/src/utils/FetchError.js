export default class FetchError extends Error {
  constructor(status, ...props) {
    super(...props);
    this.name = 'FetchError';
    this.status = status;
  }
}
