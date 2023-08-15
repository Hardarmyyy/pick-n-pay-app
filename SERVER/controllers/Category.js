const Category = require('../models/CategoryModel')
const mongoose = require('mongoose');

// create a category
exports.createCategory = async (req, res, next) => {
    try {
        const {name} = req.body;
        const existingCategory = await Category.findOne({ name: name});
        if (existingCategory) { 
            return res.status(409).send({ error: "Category is existing before now"})
        };

        const newCategory = new Category({name: name});
        await newCategory.save();
        res.status(201).json(newCategory)
    
    } catch (error) {
        res.status(400).json({ error: 'Failed to create the category.' });
    }
};

//get all categories
exports.allCategory = async (req, res, next) => {
    try {
        const category = await Category.find({}).sort({date_added: -1})
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).send({error: error.message});
    }
}

//delete a category
exports.deleteCategory = async (req, res, next) => {
	try {
        // check and validate if the _id is a mongoDB id;
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "category ID is invalid!" })
        }
        const category = await Category.findOneAndDelete({ _id: id })
        if (!category) {
            return res.status(400).json({ error: "category doesn't exist!" })
        }
        else {
            return res.status(200).json({removedCategory: category })
        }
	} 
    catch {
		res.status(404).json({ error: "category doesn't exist!" })
	}
}
