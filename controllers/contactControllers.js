//@desc get all contacts
//@route GET /api/contacts
//@access private
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
//async error handler of express allows for handling asychronous errors without having to write try catch blocks

//@desc get all contacts
//@route GET /api
//@access private
const getContacts= asyncHandler(async(req, res)=>{
    const contact = await Contact.find({user_id: req.params.id});
    res.status(200).json(contact);
});

//@desc get a contact with id
//@route GET /api/contacts
//@access private
const getContactId= asyncHandler(async(req, res)=>{
    const contact = await Contact.find({user_id: req.params.id});
    console.log('findById returned', contact);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
    //res.status(200).json({"message": `Get contact of id ${req.params.id}`});
});

//@desc create a contact with an id
//@route POST /api/contacts
//@access private
const createContactId = asyncHandler(async(req, res)=>{
    console.log('HII');
    
    const {name, email, number} = req.body;
    if(!name || !email || !number){
        res.status(400);
        throw new Error("All fields are mandatory!!!!");
    }
    console.log('About to call Contact.create');
    const create = await Contact.create(
        { name, 
            email, 
            number,
        user_id: req.user.id });
    console.log('Contact.create returned', create);
    res.status(201).json({ create });
});

//@desc update a contact with an id
//@route PUT /api/contacts
//@access private
const updateContactId= asyncHandler(async(req, res)=>{
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Conatct not found");
    }
    if(contact.user_id.toString()!== req.user.id){
        res.status(403).json({message: "User don't have permission to update other user's contact"});
        throw new Error("User don't have permission to update other user's contact");
    }
    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact)
    
    //res.status(200).json({"message": `Update contact of id ${req.params.id}`});
});

//@desc delete a contact with an id
//@route DELETE /api/contacts
//@access private
const deleteContactId= asyncHandler(async(req, res)=>{
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Conatct not found");
    }
    if(contact.user_id.toString()!== req.user.id){
        res.status(403).json({message: "User don't have permission to delete other user's contact"});
        throw new Error("User don't have permission to delete other user's contact");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `Deleted contact ${req.params.id}` });
});

module.exports= {getContacts, getContactId, createContactId, updateContactId, deleteContactId};