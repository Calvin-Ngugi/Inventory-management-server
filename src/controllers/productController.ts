import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

//FETCH PRODUCTS
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const search = req.query.search?.toString();
        const products = await prisma.products.findMany({
            where: {
                name: {
                    contains: search
                },
            },
        });
        res.json(products);
    } catch (err) {
        res.json(500).json({ message: "Error retrieving products " + err });
    }
};

//CREATE PRODUCT
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId, name, price, rating, stockQuantity } = req.body;
        const product = await prisma.products.create({
            data: {
                productId,
                name,
                price,
                rating,
                stockQuantity,
            }
        })
        res.status(201).json(product)
    } catch (err) {
        res.json(500).json({ message: "Error creating products " + err });
    }
}