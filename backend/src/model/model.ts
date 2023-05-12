export class ChatBlock {
  id: number;
  request: ChatBlockParams;
  response: ChatBlockParams;
  workflowRequest: WorkflowParams;
  workflowResponse: WorkflowParams;

  constructor(
    id: number,
    request: ChatBlockParams,
    response: ChatBlockParams,
    workflowRequest: WorkflowParams,
    workflowResponse: WorkflowParams
  ) {
    this.id = id;
    this.request = request;
    this.response = response;
    this.workflowRequest = workflowRequest;
    this.workflowResponse = workflowResponse;
  }
}

export class ChatBlockParams {
  type: "USER" | "ASSISTANT";
  message: string;
  createdAt: number;
  usageId?: string;
  isPositive?: boolean;
  sources?: ReadonlyArray<Source>;

  constructor(
    type: "USER" | "ASSISTANT",
    message: string,
    createdAt: number,
    usageId?: string,
    isPositive?: boolean,
    sources?: ReadonlyArray<Source>
  ) {
    this.type = type;
    this.message = message;
    this.createdAt = createdAt;
    this.usageId = usageId;
    this.isPositive = isPositive;
    this.sources = sources;
  }
}

export class WorkflowParams {
  type: "WORKFLOW";
  createdAt: number;
  question?: string;

  constructor(type: "WORKFLOW", createdAt: number, question?: string) {
    this.type = type;
    this.createdAt = createdAt;
    this.question = question;
  }
}

export class Source {
  title?: string;
  url?: string;

  constructor(title?: string, url?: string) {
    this.title = title;
    this.url = url;
  }
}
