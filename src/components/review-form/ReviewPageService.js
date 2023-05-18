import HttpHelper from "../../utils/HttpHelper"
import constants from "../../utils/constants"

export const saveReview = async(review, setApiError, productId) => {
    try{
        const response = await HttpHelper(constants.REVIEWS_ENDPOINT(productId), 'POST', review);
        return response.json();
    }catch{
        setApiError(true);
        return false;
    }
};

export const fetchPurchasesByUserEmail = async (userEmail, setApiError, setHasMadePurchase) => {
    await HttpHelper(constants.PURCHASE_BY_EMAIL_ENDPOINT(userEmail), 'GET')
    .then((response) => response.json())
    .then((data) => {
        //not sure this for loop is correct - does it need to loop through each product first. 
        for (product in data.products){
            if (product.product.id == productId){
                setHasMadePurchase(true)
            }
        }
    })
    .catch(() => setApiError(true));
}