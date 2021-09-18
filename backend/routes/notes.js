const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Route 1 : get the logged in user notes using GET : "/api/notes/fetch-all-notes". Login required
router.get("/fetch-all-notes", fetchUser, async (req, res) => {
	try {
		const notes = await Note.find({ user: req.user.id });
		res.json(notes);
	} catch (e) {
		console.error(e.message);
		res.status(500).send("Internal server error.");
	}
});

// Route 2 : add a new note using POST : "/api/notes/create-note". Login required
router.post(
	"/create-note",
	fetchUser,
	[
		body("title", "Enter a valid title").isLength({ min: 3 }),
		body("description", "Description must be atleast 5 characters ").isLength({
			min: 5,
		}),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			// create a new note and save it in db.
			const { title, description, tag } = req.body;
			const newNote = new Note({
				title,
				description,
				tag,
				user: req.user.id
			});
			const savedNote = await newNote.save();
			res.json(savedNote);
		} catch (e) {
			console.error(e.message);
			res.status(500).send("Internal server error.");
		}
	}
);

// Route 3  :update a existing note using PUT : "/api/notes/update-note". Login required
router.put("/update-note/:id", fetchUser, async (req, res) => {
	const { title, description, tag } = req.body;
	// create a NEW NOTE OBJECT
	const newNote = {};
	newNote.title = title && title;
	newNote.description = description && description ;
	newNote.tag = tag && tag ;
	// find the note to be updated and update it
	let note = await Note.findById(req.params.id);
	if(!note){
		return res.status(404).send("Not found");
	}
	if(note.user.toString() !== req.user.id){
		return res.status(401).send("Not allowed");
	}
	note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote } , { new : true });
	res.json({note});
});

// Route 4 :delete a existing note using DELETE : "/api/notes/delete-note". Login required
router.delete("/delete-note/:id", fetchUser, async (req, res) => {
	try {
		const note = await Note.findById(req.params.id)
		if(!note){
			return res.status(404).send("No note found");
		}
		console.log(typeof note.user);
		if(note.user.toString() !== req.user.id){
			return res.status(401).send("Not allowed");
		}
		note = await Note.findOneAndDelete(req.params.id);
		res.json(note);
	}catch(error){
		console.error(e.message);
		res.status(500).send("Internal server error.");
	}
});
// assertion : scattering of red color is least as compared to scattering of other colors 
// reasoning : intensity of scattering lght is inversely proportional to the wavelength and velocity
module.exports = router;
