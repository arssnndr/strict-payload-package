export interface HasPrice {
    method: string,
    body: string | object
}

export class StrictPayloads {
    static hasPrice(request: HasPrice): boolean {
        const methods = ['POST', 'PUT', 'PATCH', 'DELETE'];
        const requestObj = typeof request === "string" ? JSON.parse(request) : request;

        if (!methods.includes(requestObj.method)) return false;

        try {
            const body = typeof requestObj.body === "string" ? JSON.parse(requestObj.body) : requestObj.body;

            const checkPrice = (obj: object): boolean => {
                if (obj !== null && typeof obj === 'object') {
                    if (Object.keys(obj).some(key => key.toLowerCase().includes('price'))) return true;
                    if (Object.keys(obj).some(key => key.toLowerCase().includes('fee'))) return true;
                    if (Array.isArray(obj)) return obj.some(item => checkPrice(item));

                    return Object.values(obj).some(value => checkPrice(value));
                }
                return false;
            };

            return checkPrice(body);
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    }
}