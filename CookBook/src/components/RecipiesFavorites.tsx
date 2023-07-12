import { useState } from "react";
import { FaEdit, FaHeart, FaHeartBroken, FaTrash } from "react-icons/fa";
import "./recipies.css";
import { Recipies } from "./table/Table";
import RecipiesModal from "./RecipiesModal";

type Props = {
  list: Recipies[];
  onDeleteClick: (data: Recipies) => void;
  onEdit: (data: Recipies) => void;
  onFavoriteToggle: (data: Recipies) => void;
};

const RecipiesFavorites = (props: Props) => {
  const { onFavoriteToggle, list, onDeleteClick, onEdit } = props;
  const [showModal, setShowModal] = useState(false);
  const [dataToShow, setdataToShow] = useState<Recipies | null>(null);

  const viewRecipies = (data: Recipies) => {
    setdataToShow(data);
    setShowModal(true);
  };

  const handleDeleteClick = (data: Recipies) => {
    onDeleteClick(data);
  };

  const handleFavoriteClick = (data: Recipies) => {
    onFavoriteToggle(data);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="cards">
      {list.length > 0 ? (
        list.map((cook) => (
          <div className="card" key={cook.id}>
            <div className="card-header" onClick={() => viewRecipies(cook)}>
              <h3>{cook.name}</h3>
            </div>
            <div className="card-footer">
              <button onClick={() => onEdit(cook)}>
                <FaEdit />
              </button>
              <button onClick={() => handleFavoriteClick(cook)}>
                {cook.favorite ? <FaHeartBroken /> : <FaHeart />}
              </button>
              <button onClick={() => handleDeleteClick(cook)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No favorite recipes found</p>
      )}

      {showModal && dataToShow !== null && (
        <RecipiesModal onClose={onCloseModal} data={dataToShow} />
      )}
    </div>
  );
};

export default RecipiesFavorites;
