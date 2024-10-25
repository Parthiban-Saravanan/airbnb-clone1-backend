import properties from "../models/properties.js";

export const AddProperties = async (req, res, next) => {
    try {
        const { title, desc, img, rating, location, price } = req.body;
        const newProperty = new properties({
            title,
            desc,
            img,
            rating,
            location,
            price,
        });
        const createdProperty = await newProperty.save(); // Use newProperty instead of Property
        return res.status(201).json({ message: "Property created successfully", createdProperty });
    } catch (err) {
        next(err); // Call next with the error to handle it
    }
};

export const GetProperties = async (req, res, next) => {
    try {
        let { search } = req.query;
        const filter = {};

        if (search) {
            filter.$or = [
                { title: { $regex: new RegExp(search, "i") } },
                { desc: { $regex: new RegExp(search, "i") } },
                { location: { $regex: new RegExp(search, "i") } },
            ];
        }
        const propertiesList = await properties.find(filter, {
            title: 1,
            desc: 1,
            img: 1,
            rating: 1,
            location: 1,
            price: 1,
        });
        return res.status(200).json(propertiesList);
    } catch (err) {
        next(err);
    }
};

export const GetPropertiesDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const property = await properties.findById(id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        return res.status(200).json(property);
    } catch (err) {
        next(err);
    }
};