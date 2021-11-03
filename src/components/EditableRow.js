import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          id="name"
          className="name-edit-txt-fld"
          placeholder="Full name"
          value={editFormData.name}
          onChange={handleEditFormChange}>
        </input>
      </td>
      <td>
        <input type="email"
          id="email"
          className="email-edit-txt-fld"
          placeholder="E-mail address"
          value={editFormData.email}
          onChange={handleEditFormChange}>
          </input>
      </td>
      <td>
        <input type="text" id="phone"
          className="phone-edit-txt-fld"
          placeholder="Phone number"
          value={editFormData.phone}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button className="btn-cancel" type="button" 
          onClick={handleCancelClick}>Cancel</button>
        <button className="btn-save" type="submit">Save</button>
      </td>
    </tr>
  );
};

export default EditableRow;