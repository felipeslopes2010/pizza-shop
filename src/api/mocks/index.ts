import { env } from "@/env";
import { setupWorker } from "msw/browser";
import { signInMock } from "./sign-in-mock";
import { registerRestaurantMock } from "./register-restaurant-mock";
import { getDayOrdersAmountMock } from "./get-day-orders-amount-mock";
import { getMonthOrdersAmountMock } from "./get-month-orders-amount-mock";
import { getMonthCanceledOrdersAmountMock } from "./get-month-canceled-orders-amount-mock";
import { getMonthRevenuetMock } from "./get-month-revenue-mock";
import { getDailyRevenueInPeriodMock } from "./get-daily-revenue-in-period-mock";
import { getPopularProductsMock } from "./get-popular-products-mock";
import { getProfileMock } from "./get-profile-mock";
import { getManagedRestaurantMock } from "./get-managed-restaurant-mock";
import { updateProfileMock } from "./update-profile-mock";

export const worker = setupWorker(
    signInMock,
    registerRestaurantMock,
    getDayOrdersAmountMock,
    getMonthOrdersAmountMock,
    getMonthCanceledOrdersAmountMock,
    getMonthRevenuetMock,
    getDailyRevenueInPeriodMock,
    getPopularProductsMock,
    getProfileMock,
    getManagedRestaurantMock,
    updateProfileMock,
);

export async function enableMSW() {
    if(env.MODE !== "test") {
        return;
    }

    await worker.start();
}