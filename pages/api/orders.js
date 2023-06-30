import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Order } from "@/models/Order";

export default async function handle(req, res) {

    const { method } = req;
    await mongooseConnect();
    await isAdminRequest(req, res);

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Order.findOne({_id: req.query.id}));
        } else {
            res.json(await Order.find());
        }
    }

    // if (method === 'PUT') {
    //     const { _id, title, description, price, category, properties } = req.body;
    //     console.log(properties)
    //     await Product.updateOne({ _id }, { title, description, price, category, properties });
    //     res.json(true);
    // }

    // if (method === 'DELETE') {
    //     if (req.query?.id) {
    //         await res.json(await Product.deleteOne({_id: req.query.id}));
    //         res.json(true);
    //     }
    // }


};