//@desc Get all the contacts
//@route GET /api/contacts
//@access public

const getContacts = (req,res)=>{
    res.status(200).json({message:"get all contacts"});
}

//@desc create contact
//@route POST /api/contacts
//@access public
const createContact = (req,res)=>{
    res.status(201).json({message:"Created new contact"});
}

//@desc get individual contact
//@route POST /api/contacts/:id
//@access public
const getContact = (req,res)=>{
    res.status(200).json({message:`contact details for ${req.params.id}`});
}

//@desc update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = (req,res)=>{
    console.log("the request body is: ",req.body);
    const {name,email,phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    res.status(200).json({message:`Updated contact for ${req.params.id}`});
}

//@desc delete contact
//@route PUT /api/contacts/:id
//@access public
const deleteContact = (req,res)=>{
    res.status(200).json({message:`deleted contact for ${req.params.id}`});
}

module.exports = {getContacts,createContact,getContact,updateContact,deleteContact};