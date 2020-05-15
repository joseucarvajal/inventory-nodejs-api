import { errorMessage, successMessage, status  } from "../helpers/http-status-helper";

export const calculate = async (request, response) => {

    const { n1, n2, op } = request.body;

    if (n1 < 0) {
        errorMessage.error = 'Error n1 cannot be lesser than 0';
        return response.status(status.error).send(errorMessage);
    }

    const sum = n1 + n2;
    successMessage.successMessage = `Sum between ${n1} and ${n2} is: ${sum}`;
    successMessage.data = sum;
    return response.status(status.success).send(successMessage) ;
}