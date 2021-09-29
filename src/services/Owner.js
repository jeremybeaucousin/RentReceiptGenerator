export function getOwners(callbackResult, callbackError) {
    fetch(process.env.REACT_APP_RENT_RECEIPT_API_URL + "/owners")
        .then(res => res.json())
        .then(
            (result) => {
                callbackResult(result);
            },

            (error) => {
                console.error(error);
                callbackError(error);
            }
        )
}

export function saveOrUpdateOwner(owner, callbackResult, callbackError) {
    if (owner) {
        let method;
        let route;
        if (owner.ID) {
            method = 'PUT';
            route = `/${owner.ID}`;

        } else {
            method = 'POST';
            route = '';
        }
        fetch(`${process.env.REACT_APP_RENT_RECEIPT_API_URL}owners/${route}`, {
            method: method,
            body: JSON.stringify(owner)
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

export function deleteOwner(owner, callbackResult, callbackError) {
    if (owner) {
        fetch(`${process.env.REACT_APP_RENT_RECEIPT_API_URL}owners/${owner.ID}`, {
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