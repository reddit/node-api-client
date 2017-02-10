export default class Record {
  constructor(type, uuid, paginationId=uuid) {
    this.type = type;
    this.uuid = uuid;
    this.paginationId = paginationId;
  }
}

export class DepthRecord extends Record {
  constructor(type, uuid, paginationId=uuid, depth) {
    super(type, uuid, paginationId);
    this.depth = depth;
  }
}