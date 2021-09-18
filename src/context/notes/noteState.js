import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6144c596486a443634915c04",
      user: "613a21135bdde09a4cc1ee49",
      title: "My Note",
      description: "this the note description of the  note",
      tag: "note",
      date: "1631896982982",
      __v: 0,
    },
    {
      _id: "6144c5a2486a443634915c06",
      user: "613a21135bdde09a4cc1ee49",
      title: "My second Note",
      description: "this the note description of the second  note",
      tag: "second note",
      date: "1631896994155",
      __v: 0,
    },
    {
      _id: "6144c5a2486a443634915c06",
      user: "613a21135bdde09a4cc1ee49",
      title: "My second Note",
      description: "this the note description of the second  note",
      tag: "second note",
      date: "1631896994155",
      __v: 0,
    },
    {
      _id: "6144c5a2486a443634915c06",
      user: "613a21135bdde09a4cc1ee49",
      title: "My second Note",
      description: "this the note description of the second  note",
      tag: "second note",
      date: "1631896994155",
      __v: 0,
    },
    {
      _id: "6144c5a2486a443634915c06",
      user: "613a21135bdde09a4cc1ee49",
      title: "My third Note",
      description: "this the note description of the second  note",
      tag: "second note",
      date: "1631896994155",
      __v: 0,
    },
    {
      _id: "6144c5a2486a443634915c06",
      user: "613a21135bdde09a4cc1ee49",
      title: "My second Note",
      description: "this the note description of the second  note",
      tag: "second note",
      date: "1631896994155",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
