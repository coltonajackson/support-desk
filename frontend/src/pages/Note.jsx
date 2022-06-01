import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getNote } from '../features/notes/noteSlice';
import { getUserByNote } from '../features/users/userSlice';

function Note() {
  const [user, setUser] = useState(null);
  const { note, isLoading, isError, message } = useSelector((state) => state.notes);
  const { 
    user: noteUser,
    isError: isNoteUserError,
    message: messageNoteUser
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { ticketId, noteId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getNote({ noteId, ticketId }));
    // eslint-disable-next-line
  }, [ticketId, noteId]);

  useEffect(() => {
    if (isNoteUserError) {
      toast.error(messageNoteUser);
    }
    dispatch(getUserByNote(note));
    // eslint-disable-next-line
  }, [note]);

  // console.log(note);
  // console.log(noteUser);

  return (
    <div>
      {/* {note.map((n) => (
        <div key={n._id}>
          <p>{n.text}</p>
          <p>{n.user}</p>
          <p>{n.ticket}</p>
        </div>
      ))} */}
    </div>
  )
}

export default Note;