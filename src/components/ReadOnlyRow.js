import React from "react";
import { FaTrash, FaPen } from 'react-icons/fa';

const ReadOnlyRow = ({ participant, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td width="195">{participant.name}</td>
      <td width="265px">{participant.email}</td>
      <td width="195px">{participant.phone}</td>
      <td className="icon-center-row">
        <FaPen className="btn-edit" 
          onClick={(event) => handleEditClick(event, participant)}/>
        <FaTrash className="btn-delete"
          onClick={() => handleDeleteClick(participant.id)}/>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;