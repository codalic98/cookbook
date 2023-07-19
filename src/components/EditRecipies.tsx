import React, { useState } from "react";
import { Recipies } from "./table/Table";
import "./RecipiesModal.css";
type Props = {
  data: Recipies;
  onBackBtnClick: () => void;
  onUpdateClick: (data: Recipies) => void;
};

const EditRecipies = (props: Props) => {
  const { data, onBackBtnClick, onUpdateClick } = props;

  const [name, setName] = useState(data.name);
  const [preparation, setPreparation] = useState(data.preparation);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onPreparationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPreparation(e.target.value);
  };

  const onSubmitBtnClick = (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: Recipies = {
      id: data.id,
      name: name,
      preparation: preparation,
      favorite: data.favorite,
    };
    onUpdateClick(updateData);
    onBackBtnClick();
  };

  return (
    <>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <form onSubmit={onSubmitBtnClick}>
            <label>Name:</label>
            <div>
              <input
                type="text"
                className="value"
                value={name}
                onChange={onNameChange}
              />
            </div>
            <label>Preparation:</label>
            <div>
              <textarea
                className="value"
                id="review-text"
                value={preparation}
                onChange={onPreparationChange}
              ></textarea>
            </div>

            <div>
              <input type="submit" value="Update Recipe" />
              <input type="button" value="Back" onClick={onBackBtnClick} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditRecipies;
