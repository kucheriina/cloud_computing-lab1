type Status = number;
type Message = string | undefined;
type OperationStatus = number; // todo: mb enum?
type ResponseData = any | null; // todo: ?
type ErrorField = string | undefined;

export interface QueryError {
  data: {
    operationStatus: OperationStatus;
    responseData: ResponseData;
    message?: Message;
    // todo: только в сервисе авторизации.
    //  в каждом сервисе разного типа ошибки с бэка. привести к одному
    error?: ErrorField;
    title?: string;
  };
  status: Status;
}

interface QueryErrorHelper {
  (status: Status, data: QueryError["data"]): QueryError;
}

const queryError: QueryErrorHelper = (status, data) => {
  return {
    status,
    data: {
      ...data,
      operationStatus: data.operationStatus ?? 0,
      responseData: data.responseData ?? undefined,
      message: data.message ?? undefined,
      error: data.error ?? undefined,
    },
  };
};

export default queryError;
