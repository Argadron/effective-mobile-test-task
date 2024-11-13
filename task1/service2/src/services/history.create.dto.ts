export enum LogTypes {
    PRODUCT_CREATED,
    PRODUCT_GETTED,
    REMAIN_CREATED,
    REMAIN_DECREMENTED,
    REMAIN_INCREMENTED
}

export class HistoryCreateDto {
    readonly shopId: number;
    readonly action: keyof typeof LogTypes;
    readonly plu: number;
}