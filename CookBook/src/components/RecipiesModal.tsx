import "./RecipiesModal.css";
import { Recipies } from "./table/Table";
type Props = {
  onClose: () => void;
  data: Recipies;
};
const RecipiesModal = (props: Props) => {
  const { onClose, data } = props;
  return (
    <>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <div>
            <h3>Recipies</h3>
            <div>
              <div>
                <label>Name: {data.name}</label>
              </div>
              <div>
                <label>Preparation: {data.preparation}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipiesModal;
