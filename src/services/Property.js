import { getSessionCookie } from '../model/Session';

export function getProperties(callbackResult, callbackError) {
    const owner = getSessionCookie();
    fetch(`${process.env.REACT_APP_RENT_RECEIPT_API_URL}owners/${owner.ID}/properties`)
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

export function saveOrUpdateProperty(property, callbackResult, callbackError) {
    if(property) {
        const owner = getSessionCookie();
        let method;
        let route;
        if (property.ID) {
            method = 'PUT';
            route = `/${property.ID}`;

        } else {
            method = 'POST';
            route = '';
        }

        fetch(`${process.env.REACT_APP_RENT_RECEIPT_API_URL}owners/${owner.ID}/properties${route}`, {
            method: method,
            body: JSON.stringify(property)
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
                    callbackError(error);
                }
            );
    }
}

export function deleteProperty(property, callbackResult, callbackError) {
    if(property) {
        const owner = getSessionCookie();
        fetch(`${process.env.REACT_APP_RENT_RECEIPT_API_URL}owners/${owner.ID}/properties/${property.ID}`, {
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
                    callbackError(error);
                }
            )
    }
}