import React, { useState } from "react";
import { Recipies } from "./table/Table";
import "./RecipiesModal.css";

type Props = {
  onBackBtnClick: () => void;
  onSubmitClick: (data: Recipies) => void;
};

const AddRecipies = (props: Props) => {
  const [name, setName] = useState("");
  const [preparation, setPreparation] = useState("");
  const [error, setError] = useState("");

  const { onBackBtnClick, onSubmitClick } = props;

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onPreparationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPreparation(e.target.value);
  };

  const onSubmitBtnClick = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === "" || preparation.trim() === "") {
      setError("Please fill in all fields.");
      return;
    }

    const data: Recipies = {
      id: new Date().toJSON().toString(),
      name: name,
      preparation: preparation,
      favorite: false,
    };

    onSubmitClick(data);
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
              <br />
              <label>Preparation:</label>
            </div>
            <div>
              <textarea
                className="value"
                id="review-text"
                onChange={onPreparationChange}
                placeholder="Write a recipie"
              ></textarea>
            </div>

            <div className="error">{error}</div>

            <div>
              <input type="submit" value="Add Recipes" />
              <input type="button" value="Back" onClick={onBackBtnClick} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRecipies;
