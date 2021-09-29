import { getSessionCookie } from '../model/Session';

export function getTenants(propertyId, callbackResult, callbackError) {
    const owner = getSessionCookie();
    fetch(`${process.env.REACT_APP_RENT_RECEIPT_API_URL}owners/${owner.ID}/properties/${propertyId}/tenants`)
        .then(
            (result) => {
                result.json()
                    .then((data) => {
                        callbackResult(data);
                    })

            },

            (error) => {
                console.error(error);
                callbackError(error);
            }
        )
}

export function saveOrUpdateTenant(propertyId, tenant, callbackResult, callbackError) {
    if (tenant) {
        const owner = getSessionCookie();
        let method;
        let route;
        if (tenant.ID) {
            method = 'PUT';
            route = `/${tenant.ID}`;

        } else {
            method = 'POST';
            route = '';
        }
        fetch(`${process.env.REACT_APP_RENT_RECEIPT_API_URL}owners/${owner.ID}/properties/${propertyId}/tenants${route}`, {
            method: method,
            body: JSON.stringify(tenant)
        })
            .then(
                (result) => {
                    console.log(result);
                    result.json()
                        .then((data) => {
                            callbackResult(data);
                        })
                },

                (error) => {
                    console.error(error);
                    callbackError(error);
                }
            );
    }
}

export function deleteTenant(propertyId, tenant, callbackResult, callbackError) {
    if (tenant) {
        const owner = getSessionCookie();
        fetch(`${process.env.REACT_APP_RENT_RECEIPT_API_URL}owners/${owner.ID}/properties/${propertyId}/tenants/${tenant.ID}`, {
            method: 'DELETE'
        })
            .then(
                (result) => {
                    result.json()
                        .then((data) => {
                            callbackResult(data);
                        })
                },

                (error) => {
                    console.error(error);
                }
            )
    }
}