import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import NoteItem from "../components/NoteItem";
import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";

const Notes = ({ notes }) => {
  const [search, setSearch] = useState(false);
  const ref = useRef(null);
  const [text, setText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const handleSearchChange = (e) => {
    setFilteredNotes(
      notes.filter((note) => {
        return note.title.toLowerCase().match(text.toLowerCase());
      })
    );
  };

  useEffect(handleSearchChange, [text]);

  const handleSearch = () => {
    setSearch((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setSearch(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref]);

  return (
    <section ref={ref}>
      <header className="notes__header">
        {!search && <h2>My Notes</h2>}
        {search && (
          <input
            type="text"
            autoFocus
            placeholder="Keyword..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleSearchChange();
            }}
          />
        )}
        <button onClick={handleSearch} className="btn">
          {search ? <MdClose /> : <CiSearch />}
        </button>
      </header>
      <div className="notes__container">
        {filteredNotes.length == 0 && <p className="empty__notes">No notes found.</p>}

        {filteredNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
      <Link to="/create-note" className="btn add__btn">
        <BsPlusLg />
      </Link>
    </section>
  );
};

export default Notes;
