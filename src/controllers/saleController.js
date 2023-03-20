/* eslint-disable prettier/prettier, prefer-destructuring, require-jsdoc */
import SaleServices from "../services/saleService";

class SaleController {
    static async getSales(req, res){
        try {            
            const Sellerid = req.user.id;
            const getSales = await SaleServices.getSellerSales(Sellerid);
            return res.status(200).json({
                status:200,
                message: getSales
            })
            
        } catch (error) {
            /* istanbul ignore next */
            return res.status(500).json({message: 'Server Error'})
        }
    }

    static async updateSaleStatus(req, res){
        try {     
            const UpdatedSale = await SaleServices.updateSaleStatus(req);
            return res.status(200).json({
                status: 200,
                Sale: UpdatedSale
            }) 
        } catch (error) {
            /* istanbul ignore next */
            return res.status(500).json({message: 'Server Error'})
        }   
    }
}

export default SaleController