
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactSchema');

//@desc Get all the contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(
    async(req,res)=>{
        const contact = await Contact.find({user_id:req.user.id});
        res.status(200).json(contact);
    }
);

//@desc create contact
//@route POST /api/contacts
//@access private
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
            phone,
            user_id:req.user.id
        });
        res.status(201).json(contact);
    }
);

//@desc get individual contact
//@route POST /api/contacts/:id
//@access private
const getContact = asyncHandler(
    async(req,res)=>{
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(400)
            throw new Error("contact not found");
        }
        res.status(200).json(contact);
    }
);

//@desc update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(
    async (req,res)=>{
        console.log("the request body is: ",req.body);
        const {name,email,phone} = req.body;
        const contact = await Contact.findById(req.params.id);
        if(!contact){
            res.status(400);
            throw new Error("Contact not found");
        }

        // authorizing user login before updating contact
        if (contact.user_id.toString() !== req.user.id ) {
            res.status(403);
            throw new Error("User don't have permission to update other user contact");
        }
  
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(200).json(updatedContact);
    }
);

//@desc delete contact
//@route PUT /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(400);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id ) {
        res.status(403);
        throw new Error("User don't have permission to delete other user contact");
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});

module.exports = {getContacts,createContact,getContact,updateContact,deleteContact};