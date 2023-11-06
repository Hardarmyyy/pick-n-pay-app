const Category = require('../models/CategoryModel')
const mongoose = require('mongoose');
const {format} = require('date-fns')

// create category
const addCategory = async (req, res) => {
        const {userId} = req.params
        const {categoryName} = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) return res.json({
            error: true, 
            message: 'Invalid id'
        })

        if (!categoryName) return res.status(404).json({ 
            error: true, 
            message: "All fields are required!" })
        
        //check category duplicate
        const existingCategory = await Category.findOne({ categoryName: categoryName})

        if (existingCategory) return res.send({ 
            error: true, 
            message: "Category name exists already"
        })

        const newCategory = new Category({categoryName: categoryName});
        await newCategory.save();

        res.status(200).json({
            success: true, 
            message: "Category created successfully", 
            newCategory: newCategory
        })
    
    } catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
};

//get all categories
const allCategories = async (req, res) => {

    try {
        const allCategory = await Category.find({}).sort({createdAt: -1}).lean();

        const allProductCategories = await Promise.all(allCategory.map( async (c) => {
            const createdTime = format(c.createdAt, 'yyyy-MM-dd hh:mm:ss a') // formatting the created datetime
            const updatedTime = format(c.updatedAt, 'yyyy-MM-dd hh:mm:ss a') // formatting the updated datetime
            return {...c, createdAt: createdTime, updatedAt: updatedTime}
        }))

        if (!allProductCategories.length) return res.json({
            error: true, 
            message: 'There are no categories to show', 
            categories: allProductCategories
        })

        res.status(200).json({ 
            success: true, 
            message: 'Categories fetched successfully', 
            categories: allProductCategories
        })

    }
    catch (err) {
        res.status(500).json({error: 'Internal server error', message: err.message})
    }
}

//edit category
const updateCategory = async (req, res) => {
        const {id} = req.params
        const {categoryName} = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.json({
            error: true, 
            message: 'Invalid id'
        })

        if (!categoryName) return res.status(404).json({ 
            error: true, 
            message: "All fields are required!"
        })
        
        const existingCategory = await Category.findById({ _id: id })

        if (!existingCategory) return res.json({ 
            error: true, 
            message: "category doesn't exist!" 
        })

        //check for category name duplicate
        const registeredCategoryName = await Category.findOne({ categoryName: categoryName })

        if (registeredCategoryName && registeredCategoryName?._id.toString() !== existingCategory._id.toString()) return res.json({
            error: true, 
            message: "Category name exists already" 
        })

        existingCategory.categoryName = categoryName
        await existingCategory.save()
        
        return res.status(200).json({
            success: true, 
            message: `${existingCategory.categoryName} has been updated successfully`, 
            editedCategory: existingCategory 
        })
	} 
    catch (err) {
		res.status(500).json({error: 'Internal server error', message: err.message})
	}
}

//delete a category
const deleteCategory = async (req, res) => {
        const {id} = req.params

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.json({
            error: true, 
            message: 'Invalid id'
        })
        
        const category = await Category.findOneAndDelete({ _id: id })
        if (!category) return res.json({ 
            error: true, 
            message: "category doesn't exist!" 
        })
        
        return res.status(200).json({
            success: true, 
            message: `${category.categoryName} has been deleted successfully`, 
            deletedCategory: category 
        })
        
	} 
    catch (err) {
		res.status(500).json({error: 'Internal server error', message: err.message})
	}
}

module.exports = {
    addCategory,
    allCategories,
    updateCategory,
    deleteCategory
}
