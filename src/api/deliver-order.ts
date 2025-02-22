import { api } from "@/lib/axios";

export interface DeliverOrderParams {
    orderId: string;
}

export async function deliveryOrder({ orderId }: DeliverOrderParams) {
    await api.patch(`/orders/${orderId}/deliver`);
}