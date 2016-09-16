export default class Record {
  constructor(type, uuid, paginationId=uuid) {
    this.type = type;
    this.uuid = uuid;
    this.paginationId = paginationId;
  }
}
