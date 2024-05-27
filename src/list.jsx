import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

function TodoList() {
  const [form, setform] = useState(false);
  const [listData, setListData] = useState({
    contact: [],
  });
  const [editIndex, setEditIndex] = useState(null);
  const [data, setdata] = useState({
    name: "",
    email: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const deleteItem = (index) => {
    setListData({
      contact: listData.contact.filter((_, i) => i !== index),
    });
  };

  const editData = (ind) => {
    setEditIndex(ind);
    setform(true);
    setdata(listData.contact[ind]);
  };

  const inpdata = (e) => {
    const { value, name } = e.target;
    setdata({ ...data, [name]: value });
  };

  const submitContact = (e) => {
    e.preventDefault();
    const contactExists = listData.contact.some(
      (contact, index) => contact.email === data.email && index !== editIndex
    );
    if (contactExists) {
      alert("Email Already Exists");
    } else {
      if (data.name && data.email) {
        if (editIndex !== null) {
          let updatedData = [...listData.contact];
          updatedData[editIndex] = data;
          setListData({ ...listData, contact: updatedData });
          setEditIndex(null);
        } else {
          setListData({
            ...listData,
            contact: [...listData.contact, data],
          });
        }
        setdata({ name: "", email: "" });
        setform(false);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = listData.contact.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <div className="bg-dark fs-1 text-white text-center m-3">
          Firebase Contact
        </div>
      </div>
      <div className="text-center">
        <input
          type="search"
          placeholder="Search Here"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div
          className="btn btn-outline-dark ms-3 fs-1"
          data-bs-toggle="collapse"
          data-bs-target=".hideform"
          aria-expanded="false"
          onClick={() => setform(!form)}
        >
          +
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className={`collapse hideform ${form ? "show" : ""}`}>
          <form
            onSubmit={submitContact}
            className="p-3 bg-danger d-flex flex-column align-items-center justify-content-center gap-2"
          >
            <input
              onChange={inpdata}
              type="text"
              name="name"
              value={data.name}
              required
              placeholder="Enter your name"
            />
            <input
              onChange={inpdata}
              type="email"
              name="email"
              value={data.email}
              placeholder="Enter your email"
              required
            />
            <button className="btn btn-outline-warning" type="submit">
              {editIndex !== null ? "Update Contact" : "Add Contact"}
            </button>
          </form>
        </div>
      </div>
      <div className="text-center">
        {filteredContacts.map((val, index) => (
          <div key={index} className="mt-3 row border border-1 d-flex justify-content-around flex-row">
            <div className="col-8">
              <p className="m-0">{val.name}</p>
              <p>{val.email}</p>
            </div>
            <div className="col-4 d-flex flex-row" style={{ height: "45px" }}>
              <div
                className="mt-2 btn btn-outline-dark"
                onClick={() => deleteItem(index)}
              >
                Delete
              </div>
              <div className="mt-2 ms-2 btn btn-outline-dark" onClick={() => editData(index)}>Edit</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TodoList;
