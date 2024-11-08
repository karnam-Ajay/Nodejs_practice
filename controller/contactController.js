
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactSchema');
//@desc Get all the contacts
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler(
    async(req,res)=>{
        const contact = await Contact.find();
        res.status(200).json(contact);
    }
);

//@desc create contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(
    async(req,res)=>{
        console.log("the request body is: ",req.body);
        const {name,email,phone} = req.body;
        if (!name || !email || !phone) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        const contact = await Contact.create({
            name,
            email,
            phone
        });
        res.status(201).json(contact);
    }
);

//@desc get individual contact
//@route POST /api/contacts/:id
//@access public
const getContact = asyncHandler(
    async(req,res)=>{
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            throw new Error("contact not found");
        }
        res.status(200).json(contact);
    }
);

//@desc update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(
    async (req,res)=>{
        console.log("the request body is: ",req.body);
        const {name,email,phone} = req.body;
        if (!name || !email || !phone) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        res.status(200).json({message:`Updated contact for ${req.params.id}`});
    }
);

//@desc delete contact
//@route PUT /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async(req,res)=>{
    res.status(200).json({message:`deleted contact for ${req.params.id}`});
});

module.exports = {getContacts,createContact,getContact,updateContact,deleteContact};