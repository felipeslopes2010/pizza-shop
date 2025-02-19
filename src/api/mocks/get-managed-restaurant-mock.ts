import { http, HttpResponse } from "msw";
import { GetManagedRestaurantReponse } from "../get-managed-restaurant";

export const getManagedRestaurantMock = http.get<never, never, GetManagedRestaurantReponse>('/managed-restaurant', () => {
    return HttpResponse.json({
        id: "custom-restaurant-id",
        name: "Pizza Shop",
        description: "Custom restaurant description",
        managerId: "custom-user-id",
        createdAt: new Date(),
        updatedAt: null,
    })
})